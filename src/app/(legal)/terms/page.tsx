import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studies | Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-indigo-100">Last updated: August 10, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing or using our platform, you agree to these Terms of
              Service and all applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </li>
              <li>
                You agree not to misuse or attempt to disrupt the platform.
              </li>
              <li>All activity under your account is your responsibility.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Prohibited Activities
            </h2>
            <p className="text-gray-600">
              You may not engage in hacking, reverse engineering, spamming, or
              any activity that harms the platform or its users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              We are not liable for any indirect, incidental, or consequential
              damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Changes to Terms
            </h2>
            <p className="text-gray-600">
              We may update these Terms at any time. Continued use of the
              platform constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Contact Us
            </h2>
            <p className="text-gray-600">
              For questions, contact{" "}
              <a
                href="mailto:support@example.com"
                className="text-indigo-600 hover:underline"
              >
                support@example.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
