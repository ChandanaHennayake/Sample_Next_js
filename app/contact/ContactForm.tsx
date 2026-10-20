"use client";

import { useState, FormEvent } from "react";

// TODO: make sure this inbox exists (or swap in a form backend such as Formspree / a Route Handler).
export const CONTACT_EMAIL = "support@unitnov.com";

const subjectLabels: Record<string, string> = {
  feedback: "General feedback",
  "tool-request": "Tool request",
  bug: "Bug report",
  partnership: "Partnership inquiry",
  privacy: "Privacy question",
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // No backend yet: hand the message to the visitor's email client, pre-filled.
    const mailSubject = `[UnitNov] ${subjectLabels[subject] ?? "Message"} from ${name}`;
    const body = `${message}\n\n---\nName: ${name}\nReply-to: ${email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#151926] border border-emerald-500/30 rounded-2xl p-8 text-center palette-pop">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl mx-auto mb-4 text-emerald-400">
          ✉
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Almost done — check your email app</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          We opened a pre-filled email to <strong>{CONTACT_EMAIL}</strong>. Press <strong>Send</strong> there to deliver it.
          If nothing opened, email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:underline">{CONTACT_EMAIL}</a>.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setMessage("");
          }}
          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/10"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8 space-y-5"
    >
      <h3 className="text-xl font-bold text-white mb-1">Send a Message</h3>
      <p className="text-xs text-slate-400 mb-4">
        Fill out the form below and we will get back to you promptly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Your Name
          </label>
          <input
            id="contactName"
            type="text"
            required
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1F2436] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Your Email
          </label>
          <input
            id="contactEmail"
            type="email"
            required
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1F2436] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contactSubject" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          Inquiry Type
        </label>
        <select
          id="contactSubject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-[#1F2436] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        >
          <option value="feedback">General Feedback / Compliment</option>
          <option value="tool-request">New Calculator or Tool Request</option>
          <option value="bug">Bug Report / Math Discrepancy</option>
          <option value="partnership">Partnership & Advertising Inquiry</option>
          <option value="privacy">Privacy & Data Question</option>
        </select>
      </div>

      <div>
        <label htmlFor="contactMessage" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          Message
        </label>
        <textarea
          id="contactMessage"
          required
          rows={5}
          placeholder="How can we assist you today? Please share as many details as possible..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-[#1F2436] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Sending..." : "Submit Message"}
      </button>
    </form>
  );
}
