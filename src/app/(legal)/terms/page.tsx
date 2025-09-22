import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studies | Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="px-3 py-6 sm:p-4 flex items-center justify-center">
      <div className="w-full space-y-8">
        <div className="pt-12">
          <h1 className="text-lg sm:text-4xl font-bold mb-0 sm:mb-8">
            Terms of Service
          </h1>
          <p>
            <i>
              Last modified: {new Date("August 10, 2025").toLocaleDateString()}
            </i>
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <section>
            <p className="text-muted-foreground">
              These Terms of Service (this &quot;
              <b>
                <i>Agreement</i>
              </b>
              &quot;) are a binding contract between you (&quot;
              <b>
                <i>Customer</i>
              </b>
              &quot;, &quot;
              <b>
                <i>you</i>
              </b>
              &quot; or &quot;
              <b>
                <i>your</i>
              </b>
              &quot;) and StudentHub, Inc., a Delaware corporation with offices
              located at 970 Toa Payoh North #07-04, Singapore 318992 (&quot;
              <b>
                <i>StudentHub</i>
              </b>
              &quot;, &quot;
              <b>
                <i>we</i>
              </b>
              &quot; or &quot;
              <b>
                <i>us</i>
              </b>
              &quot;). This Agreement governs your access to and use of the
              Cloud Services. StudentHub and Customer may be referred to herein
              collectively as the &quot;
              <b>
                <i>Parties</i>
              </b>
              &quot; or individually as a &quot;
              <b>
                <i>Party</i>
              </b>
              &quot;.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing or using our platform, you agree to these Terms of
              Service and all applicable laws.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold mb-2">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
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
            <h2 className="sm:text-xl font-semibold mb-2">
              3. Prohibited Activities
            </h2>
            <p className="text-muted-foreground">
              You may not engage in hacking, reverse engineering, spamming, or
              any activity that harms the platform or its users.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold mb-2">
              4. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              We are not liable for any indirect, incidental, or consequential
              damages arising from your use of the platform.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold mb-2">
              5. Changes to Terms
            </h2>
            <p className="text-muted-foreground">
              We may update these Terms at any time. Continued use of the
              platform constitutes acceptance of the new terms.
            </p>
          </section>
          <section>
            <h2 className="sm:text-xl font-semibold mb-2">6. Contact Us</h2>
            <p className="text-muted-foreground">
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
