/**
 * ContactPage  — /contact
 *
 * Layout matches reference:
 *  Left  : eyebrow pill · "LET'S CONNECT" headline · paragraph · contact links
 *  Right : "START A CONVERSATION" form card
 *         First name / Last name · Email / Phone · Inquiry type / Subject · Message · Send
 *
 * GSAP: staggered entrance on mount (no ScrollTrigger needed — page-level animation).
 * Submission: Firestore (storage) + EmailJS (owner notification email).
 */
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import emailjs from '@emailjs/browser';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { CursorTrail } from './components/CursorTrail';
import { BubbleCanvas } from './components/BubbleCanvas';

// ── EmailJS credentials (loaded from .env) ───────────────────────────────────
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactPage() {
  const pageRef     = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);
  const waveRef     = useRef(null);   // 👋 emoji
  const successRef  = useRef(null);   // success banner

  const [form, setForm]     = useState({
    firstName: '', lastName: '', email: '', phone: '',
    inquiry: '', subject: '', message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [errors,  setErrors]  = useState({});

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Initialise EmailJS once on mount
    if (EJS_KEY) emailjs.init({ publicKey: EJS_KEY });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(leftRef.current,
        { x: -60, opacity: 0 },
        { x: 0,   opacity: 1, duration: 0.75 },
        0
      );
      tl.fromTo(rightRef.current,
        { x: 60, opacity: 0 },
        { x: 0,  opacity: 1, duration: 0.75 },
        0.1
      );
      tl.fromTo(
        leftRef.current.querySelectorAll('.cp-anim'),
        { y: 30, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.55, stagger: 0.1 },
        0.2
      );

      // ── Waving hand — continuous loop ───────────────────────────────
      gsap.set(waveRef.current, { transformOrigin: '70% 70%' });
      const waveTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      waveTl
        .to(waveRef.current, { rotation:  20, duration: 0.15, ease: 'power1.inOut' })
        .to(waveRef.current, { rotation: -15, duration: 0.15, ease: 'power1.inOut' })
        .to(waveRef.current, { rotation:  20, duration: 0.15, ease: 'power1.inOut' })
        .to(waveRef.current, { rotation: -10, duration: 0.15, ease: 'power1.inOut' })
        .to(waveRef.current, { rotation:  10, duration: 0.12, ease: 'power1.inOut' })
        .to(waveRef.current, { rotation:   0, duration: 0.18, ease: 'power2.out' });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // ── Animate success banner in/out ────────────────────────────────────
  useEffect(() => {
    if (!successRef.current) return;
    if (sent) {
      gsap.fromTo(successRef.current,
        { y: 24, opacity: 0, scale: 0.95 },
        { y: 0,  opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)' }
      );
    } else {
      gsap.to(successRef.current,
        { y: 12, opacity: 0, scale: 0.95, duration: 0.35, ease: 'power3.in' }
      );
    }
  }, [sent]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field as soon as user starts typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const { firstName, email, message } = form;

  const newErrors = {
    firstName: !firstName.trim(),
    email: !email.trim(),
    message: !message.trim(),
  };
if (newErrors.firstName || newErrors.email || newErrors.message) {
  setErrors(newErrors);

  ["firstName", "email", "message"].forEach((field) => {
    if (!newErrors[field]) return;

    const el = document.querySelector(`[name="${field}"]`);
    if (!el) return;

    gsap.timeline()
      .to(el, { x: 8, duration: 0.07 })
      .to(el, { x: -8, duration: 0.07 })
      .to(el, { x: 6, duration: 0.06 })
      .to(el, { x: -6, duration: 0.06 })
      .to(el, { x: 0, duration: 0.08 });
  });

  return;
}

  try {
    setSending(true);

    // ── 1. Save to Firestore (source of truth) ───────────────────────────
    await addDoc(collection(db, "messages"), {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      inquiry: form.inquiry,
      subject: form.subject,
      message: form.message,
      createdAt: serverTimestamp(),
    });

    // ── 2. Send email notification via EmailJS ───────────────────────────
    if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
      emailjs
        .send(EJS_SERVICE, EJS_TEMPLATE, {
          from_name:  `${form.firstName} ${form.lastName}`.trim(),
          from_email: form.email,
          phone:      form.phone   || 'Not provided',
          inquiry:    form.inquiry || 'Not specified',
          subject:    form.subject || 'No subject',
          message:    form.message,
          reply_to:   form.email,
        })
        .catch((ejsErr) => {
          // Don't block UX — log silently if email fails
          console.warn('EmailJS notification failed:', ejsErr);
        });
    }

    setSent(true);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      inquiry: "",
      subject: "",
      message: "",
    });

    setTimeout(() => setSent(false), 4000);

  } catch (error) {
    console.error("Firestore Error:", error);
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    alert(error.message || "Something went wrong. Please try again.");
  } finally {
    setSending(false);
  }
};

  return (
    <div ref={pageRef} className="cp-page">

      {/* Cursor trail — only active on this page */}
      <CursorTrail />

      {/* Rising bubbles — clipped to page, behind all content */}
      <BubbleCanvas />

      {/* ── Back arrow ── */}
      <Link to="/" className="cp-back" aria-label="Back to home">
        ← Back
      </Link>

      <div className="cp-inner">

        {/* ══ LEFT ══ */}
        <div ref={leftRef} className="cp-left">

          <span className="cp-eyebrow cp-anim">
            <span className="cp-eyebrow-dot" aria-hidden="true" />
            Open to Opportunities
          </span>

          <h1 className="cp-headline cp-anim">LET'S CONNECT</h1>

          <p className="cp-subtext cp-anim">
            Whatever brings you here — a project, a role, a collaboration, or just
            a hello — I'd love to hear it. Drop a message below and I'll get back
            to you, usually within 24 hours.
          </p>

          {/* Contact links */}
          <div className="cp-links cp-anim">
            <div className="cp-link-group">
              <span className="cp-link-label">EMAIL</span>
              <a href="mailto:tarunagnihotri534@gmail.com" className="cp-link-val">
                tarunagnihotri534@gmail.com
              </a>
            </div>
            <div className="cp-link-group">
              <span className="cp-link-label">GITHUB</span>
              <a href="https://github.com/tarunagnihotri534" target="_blank" rel="noreferrer" className="cp-link-val">
                @tarunagnihotri534
              </a>
            </div>
            <div className="cp-link-group">
              <span className="cp-link-label">LINKEDIN</span>
              <a href="https://www.linkedin.com/in/tarun-agnihotri69/" target="_blank" rel="noreferrer" className="cp-link-val">
                tarun-agnihotri69
              </a>
            </div>
          </div>

        </div>

        {/* ══ RIGHT — form card ══ */}
        <div ref={rightRef} className="cp-right">
          <div className="cp-card">

            <h2 className="cp-card-title">
              START A CONVERSATION
              <span ref={waveRef} className="cp-wave-emoji" aria-hidden="true">👋</span>
            </h2>
            <p className="cp-card-sub">
              Project, role, collaboration, or just a hello — all welcome.
            </p>

            <form className="cp-form" onSubmit={handleSubmit} noValidate>

              {/* Row 1 — names */}
              <div className="cp-row">
                <div className="cp-field">
                  <input
                    className={`cp-input${errors.firstName ? ' cp-input--error' : ''}`}
                    type="text" name="firstName" placeholder="Your first name"
                    value={form.firstName} onChange={handleChange} required
                    autoComplete="given-name"
                  />
                  <label className="cp-label">FIRST NAME</label>
                  {errors.firstName && <span className="cp-field-error">Please fill out this field</span>}
                </div>
                <div className="cp-field">
                  <input
                    className="cp-input"
                    type="text" name="lastName" placeholder="Your last name"
                    value={form.lastName} onChange={handleChange}
                    autoComplete="family-name"
                  />
                  <label className="cp-label">LAST NAME</label>
                </div>
              </div>

              {/* Row 2 — email + phone */}
              <div className="cp-row">
                <div className="cp-field">
                  <input
                    className={`cp-input${errors.email ? ' cp-input--error' : ''}`}
                    type="email" name="email" placeholder="your@email.com"
                    value={form.email} onChange={handleChange} required
                    autoComplete="email"
                  />
                  <label className="cp-label">EMAIL ADDRESS</label>
                  {errors.email && <span className="cp-field-error">Please fill out this field</span>}
                </div>
                <div className="cp-field">
                  <input
                    className="cp-input"
                    type="tel" name="phone" placeholder="+91 9369803059"
                    value={form.phone} onChange={handleChange}
                    autoComplete="tel"
                  />
                  <label className="cp-label">PHONE (OPTIONAL)</label>
                </div>
              </div>

              {/* Row 3 — inquiry type + subject */}
              <div className="cp-row">
                <div className="cp-field">
                  <select
                    className="cp-input cp-select"
                    name="inquiry" value={form.inquiry} onChange={handleChange}
                  >
                    <option value="" disabled>What's this about?</option>
                    <option value="Project">Project</option>
                    <option value="Job Role">Job Role</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Just saying hi">Just saying hi</option>
                  </select>
                  <label className="cp-label">INQUIRY TYPE</label>
                </div>
                <div className="cp-field">
                  <input
                    className="cp-input"
                    type="text" name="subject" placeholder="Brief subject"
                    value={form.subject} onChange={handleChange}
                  />
                  <label className="cp-label">SUBJECT (OPTIONAL)</label>
                </div>
              </div>

              {/* Message */}
              <div className="cp-field cp-field--full">
                <textarea
                  className={`cp-input cp-textarea${errors.message ? ' cp-input--error' : ''}`}
                  name="message"
                  placeholder="Tell me what's on your mind — context, timeline, links, anything helps."
                  value={form.message} onChange={handleChange} required
                  rows={5}
                />
                <label className="cp-label">MESSAGE</label>
                {errors.message && <span className="cp-field-error">Please fill out this field</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cp-submit"
                disabled={sending}
              >
                {sending ? 'Sending…' : 'SEND MESSAGE'}
              </button>

              {/* Success banner — slides in after send */}
              <div ref={successRef} className="cp-success" aria-live="polite" style={{ opacity: 0 }}>
                <span className="cp-success-icon">✓</span>
                <span>Thanks! Your message has been sent. I'll get back to you within 24 hours.</span>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
