import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studies | Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="px-3 py-6 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <h1 className="text-lg sm:text-3xl font-bold mb-0 sm:mb-2">
            Privacy Policy
          </h1>
          <p className="text-indigo-100">
            Last updated: {new Date("August 10, 2025").toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-6">
          <section>
            <h2 className="sm:text-xl font-semibold text-gray-800 dark:text-gray-50 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and safeguard your personal information when you
              use our platform.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold text-gray-800 dark:text-gray-50 mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
              <li>Account information such as name, email, and password.</li>
              <li>Usage data, including pages visited and features used.</li>
              <li>Device information like IP address and browser type.</li>
            </ul>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold text-gray-800 dark:text-gray-50 mb-2">
              3. How We Use Your Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use the information to provide and improve our services,
              personalize your experience, send updates, and ensure platform
              security.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold text-gray-800 dark:text-gray-50 mb-2">
              4. Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use encryption, secure servers, and access controls to protect
              your data from unauthorized access, alteration, or disclosure.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold text-gray-800 dark:text-gray-50 mb-2">
              5. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have questions, contact us at{" "}
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
