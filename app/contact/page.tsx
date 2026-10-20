import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | UnitNov",
  description:
    "Get in touch with the UnitNov team for tool requests, feedback, bug reports, or partnership opportunities.",
  alternates: {
    canonical: "https://unitnov.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Get in Touch
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight">
          Contact Us
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-2">
          Have an idea for a new calculator, found a bug, or want to partner with us? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Contact Info */}
        <div className="space-y-4">
          <div className="bg-[#151926] border border-white/[0.08] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl mb-3 text-indigo-400">
              ✉️
            </div>
            <h2 className="text-base font-semibold text-white">Email Us Directly</h2>
            <p className="text-xs text-slate-400 mt-1 mb-3">
              We respond to inquiries within 24–48 business hours.
            </p>
            <a
              href="mailto:support@unitnov.com"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 break-all"
            >
              support@unitnov.com
            </a>
          </div>

          <div className="bg-[#151926] border border-white/[0.08] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl mb-3 text-emerald-400">
              💡
            </div>
            <h2 className="text-base font-semibold text-white">Suggest a Tool</h2>
            <p className="text-xs text-slate-400 mt-1">
              Need a specialized calculator or converter not on our site yet? Send us your formula or request!
            </p>
          </div>

          <div className="bg-[#151926] border border-white/[0.08] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl mb-3 text-violet-400">
              🛡️
            </div>
            <h2 className="text-base font-semibold text-white">Privacy Inquiries</h2>
            <p className="text-xs text-slate-400 mt-1">
              Questions about our privacy policy or cookie settings? Contact our compliance desk.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Contact Form */}
        <div className="md:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
