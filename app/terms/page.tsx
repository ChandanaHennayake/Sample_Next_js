import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | UnitNov",
  description:
    "Review the terms and conditions governing the use of UnitNov's free online calculators, converters, and utilities.",
  alternates: {
    canonical: "https://unitnov.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Agreement
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Effective date: January 2026
        </p>
      </div>

      <div className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8 md:p-12 space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>UnitNov</strong> (https://unitnov.com), you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you disagree with any part of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Permitted Use & Free Access</h2>
          <p>
            UnitNov grants you a personal, non-exclusive, non-transferable, and revocable license to access and use our calculators,
            converters, and tools for personal, academic, and business calculation purposes without charge.
          </p>
          <p className="mt-2 text-slate-400">
            You agree not to disrupt, overload, or attempt unauthorized access to the service or utilize scrapers/automated bots that harm the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. No Professional Advice Disclaimer</h2>
          <p>
            The calculations, outputs, and informational content provided on UnitNov are for educational, informational, and general estimation purposes only.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
            <li><strong>Financial Tools:</strong> Loan, mortgage, and compound interest calculations do not represent official financing offers or certified tax advice.</li>
            <li><strong>Health Tools:</strong> BMI and body measurements are not clinical diagnoses and must not substitute for professional medical counsel.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Intellectual Property</h2>
          <p>
            All website design, trademarks, software code, UI components, and published articles on UnitNov are the property of UnitNov and protected by copyright and intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
          <p>
            In no event shall UnitNov, its operators, or contributors be liable for any damages (including, without limitation, damages for loss of profit or business interruption) arising out of the use or inability to use the tools on UnitNov.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Governing Law & Updates</h2>
          <p>
            These terms may be updated from time to time to reflect operational, legal, or regulatory changes. Continued use of the website following any modifications constitutes acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
