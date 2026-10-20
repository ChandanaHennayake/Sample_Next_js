import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UnitNov",
  description:
    "Read the UnitNov Privacy Policy to understand how we protect your personal data, our cookie usage, and our commitment to client-side data privacy.",
  alternates: {
    canonical: "https://unitnov.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Legal & Compliance
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Last updated: January 2026 • Effective immediately
        </p>
      </div>

      <div className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8 md:p-12 space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>UnitNov</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), accessible from{" "}
            <a href="https://unitnov.com" className="text-indigo-400 hover:underline">
              https://unitnov.com
            </a>
            . We are committed to protecting your privacy and ensuring you have a secure online experience.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. 100% Client-Side Processing Guarantee</h2>
          <p>
            Our calculators and utilities (including financial calculators, age calculators, percentage tools, and converters)
            perform computations <strong>entirely inside your web browser using client-side JavaScript</strong>.
          </p>
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 my-3 text-indigo-200 text-sm">
            🛡️ <strong>Zero Data Transmission:</strong> The personal numbers, loan balances, birth years, and weights you enter into our calculators are never sent to or stored on our servers.
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Information We Collect Automatically</h2>
          <p>When you visit UnitNov, our systems automatically collect certain non-personally identifiable information:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
            <li><strong>Browser & Device Information:</strong> Browser type, operating system, device screen resolution, and preferred language.</li>
            <li><strong>Log Data:</strong> IP address, referring URL, pages visited, time spent per page, and general geographic location (country/city level).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Cookies & Web Beacons</h2>
          <p>
            UnitNov uses cookies and similar tracking technologies to enhance user navigation and analyze aggregate site performance.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
            <li><strong>Google Analytics:</strong> We use Google Analytics (measurement ID G-QJYN3G8M00) to understand how visitors engage with our tools. Google Analytics uses first-party cookies to track visitor interactions.</li>
            <li><strong>Google AdSense & DoubleClick Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
            <li><strong>Managing Cookies:</strong> You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google Ads Settings</a> or through your browser settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Links & Affiliates</h2>
          <p>
            UnitNov may contain links to external websites, including financial services, loan marketplaces, or partner utilities.
            We have no control over the privacy practices or content of these external sites and advise you to review their respective privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Your Data Rights (GDPR & CCPA)</h2>
          <p>Depending on your location, you may possess rights regarding your data:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
            <li>The right to request access to and receive copies of any personal data we hold.</li>
            <li>The right to request deletion of any collected log information.</li>
            <li>The right to opt-out of cookie tracking and analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Contact Information</h2>
          <p>
            If you have questions or inquiries regarding this Privacy Policy, please contact our privacy compliance team via our{" "}
            <a href="/contact" className="text-indigo-400 hover:underline">
              Contact Page
            </a>{" "}
            or email us at <strong>privacy@unitnov.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
