import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studies | Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="px-3 py-6 sm:p-4 flex items-center justify-center">
      <div className="w-full space-y-8">
        <div className="pt-12">
          <h1 className="text-lg sm:text-4xl font-bold mb-0 sm:mb-8">
            Privacy Policy
          </h1>
          <p className="mb-5">
            <i>
              Last modified: {new Date("August 10, 2025").toLocaleDateString()}
            </i>
          </p>
          <p>
            Previous version:{" "}
            <Link href="#" className="text-primary underline">
              {new Date("March 14, 2025").toLocaleDateString()}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <section>
            <p className="text-muted-foreground">
              Thank you for your interest in Student Hub (&quot;
              <b>
                <i>StudentHub</i>
              </b>
              ,&quot; &quot;
              <b>
                <i>we</i>
              </b>
              ,&quot; &quot;
              <b>
                <i>our</i>
              </b>
              ,&quot; or &quot;
              <b>
                <i>us</i>
              </b>
              &quot;). Student Hub provides a set of digital tools and services
              designed to help students organize, collaborate, and manage their
              academic lives. This Privacy Notice explains how information about
              you whether it directly identifies you, or can be used to make you
              identifiable (&quot;
              <b>
                <i>personal information</i>
              </b>
              &quot;) is collected, used, and disclosed by Student Hub in
              connection with our website at{" "}
              <Link
                href="https://studenthub.com"
                className="text-primary underline"
              >
                studenthub.com
              </Link>{" "}
              (the &quot;
              <b>
                <i>Site</i>
              </b>
              &quot;) and our services offered in connection with the Site
              (collectively with the Site, the &quot;
              <b>
                <i>Service</i>
              </b>
              &quot;).
            </p>
          </section>
          <section>
            <h2
              id="privacy-notice-apply"
              className="sm:text-xl font-semibold mb-6 scroll-mt-25"
            >
              What Does This Privacy Notice Apply To?{" "}
              <Link
                href="#privacy-notice-apply"
                className="text-primary hover:underline"
              >
                #
              </Link>
            </h2>
            <div className="flex flex-col gap-6">
              <p className="text-muted-foreground">
                This Privacy Notice explains how we use your personal
                information when you use the Service, either as an individual
                user or when you access the Service through an account provided
                by an educational institution or organization. We are the data
                controller of your personal information when we use it as
                described in this Privacy Notice, meaning that we determine and
                are responsible for how your personal information is processed.
              </p>
              <p className="text-muted-foreground">
                Our Service allows users, including schools and organizations,
                to submit, manage, or otherwise use content relating to others,
                such as students, educators, or collaborators (“
                <b>
                  <i>User Data</i>
                </b>
                ”). We use such User Data primarily as a processor, meaning we
                process such User Data on behalf of and under the instructions
                of the relevant institution or account owner, in accordance with
                our data processing terms. This Privacy Notice does not apply to
                such processing; if you believe your personal information has
                been included in any User Data, we recommend you review the
                Privacy Notice of the respective institution or account owner.
              </p>
              <p className="text-muted-foreground">
                This Privacy Notice sets out how we use personal information. It
                does not cover our use of information that is not considered
                &quot;
                <b>
                  <i>personal information</i>
                </b>
                &quot; or similar terms under applicable law. This means that it
                does not cover our use of aggregated or anonymized information.
              </p>
              <p className="text-muted-foreground">
                Where applicable law permits, it also does not cover
                deidentified information, meaning information that is maintained
                in a form that is not reasonably capable of being associated
                with or linked to an individual (please note that this exception
                would not apply to personal information collected from you if
                you are in the UK, EEA, or Switzerland).
              </p>
              <p className="text-muted-foreground">
                We may also provide you with additional privacy notices or
                disclosures where the scope of the inquiry, request, or personal
                information we require falls outside the scope of this Privacy
                Notice. In such cases, the additional Privacy Notice or
                disclosures will set out how we may process the information you
                provide at that time. Please note that this Privacy Notice does
                not cover or apply to our processing of information about our
                employees, contractors, or applicants for positions at Student
                Hub.
              </p>
            </div>
          </section>
          <section>
            <h2
              id="region-specific-disclosures"
              className="sm:text-xl font-semibold mb-8 scroll-mt-25"
            >
              Region-specific Disclosures{" "}
              <Link
                href="#region-specific-disclosures"
                className="text-primary hover:underline"
              >
                #
              </Link>
            </h2>
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-2 list-disc px-4">
                <li className="text-muted-foreground">
                  <b>California - Your California Privacy Rights:</b> If you are
                  a California resident, California Civil Code Section 1798.83
                  permits you to request information regarding the disclosure of
                  personal information to third parties for their direct
                  marketing purposes during the immediately preceding calendar
                  year. We may use tracking tools to measure the performance of
                  our advertising campaigns and help deliver personalized ads.
                  You can manage your preferences in the{" "}
                  <Link href="#" className="text-primary underline">
                    Privacy Settings
                  </Link>
                  .
                </li>
                <li className="text-muted-foreground">
                  <b>Nevada:</b> Chapter 603A of the Nevada Revised Statutes
                  permits a Nevada resident to opt out of future sales of
                  certain covered information that a website operator has
                  collected or will collect about the resident. Note we do not
                  sell your personal information within the meaning of Chapter
                  603A. However, if you would still like to submit such a
                  request, please contact us at{" "}
                  <Link href="#" className="text-primary underline">
                    privacy@studenthub.com
                  </Link>
                  .
                </li>
                <li className="text-muted-foreground">
                  <b>European Economic Area, United Kingdom or Switzerland:</b>{" "}
                  If you are located in the European Economic Area (&quot;
                  <b>
                    <i>EEA</i>
                  </b>
                  &quot;), United Kingdom or Switzerland, or otherwise engage
                  with StudentHub’s European operations, please see the{" "}
                  <Link href="#" className="text-primary underline">
                    Privacy Disclosures for the European Economic Area, United
                    Kingdom and Switzerland
                  </Link>{" "}
                  for additional European-specific privacy disclosures,
                  including the lawful bases we rely on to process your personal
                  information, how we use cookies when you access our Sites from
                  the EEA, UK or Switzerland and your rights in respect of your
                  personal information.
                </li>
              </ul>
              <p className="text-muted-foreground">
                <b>Note for International Visitors:</b> Personal information may
                be transferred to, stored and processed in a country other than
                the one in which it was collected. For example, the Sites are
                primarily hosted in and provided from the United States. Please
                note the country to which personal data is transferred may not
                provide the same level of protection for personal information as
                the country from which it was transferred.
              </p>
              <p className="text-muted-foreground">
                Click on the links below to jump to each section:
              </p>
              <ol className="flex flex-col gap-2 px-4 list-decimal">
                <li>
                  <Link
                    href="#information-collect-use"
                    className="text-primary underline"
                  >
                    Information we collect and our use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    How we share personal information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    Control over your information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    How we use cookies and other tracking technology to collect
                    information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    Data retention and security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    Links to third-party websites and services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    Children&apos;s privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    Changes to this privacy notice
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary underline">
                    Contact us
                  </Link>
                </li>
              </ol>
              <p>
                <Link href="#" className="text-primary hover:underline">
                  Privacy disclosures for the European Economic Area, United
                  Kingdom and Switzerland
                </Link>
              </p>
            </div>
          </section>
          <section>
            <h2
              id="information-collect-use"
              className="sm:text-xl font-semibold mb-8 scroll-mt-25"
            >
              1. Information we collect and our use{" "}
              <Link
                href="#information-collect-use"
                className="text-primary underline"
              >
                #
              </Link>
            </h2>
            <div className="flex flex-col gap-6 mb-8">
              <p>
                We collect personal information in connection with your visits
                to and use of the Service. This collection includes information
                that you provide in connection with the Service, information
                from third parties, and information that is collected
                automatically such as through the use of cookies and other
                technologies.
              </p>
            </div>
            <h3
              id="information-provided"
              className="sm:text-lg font-semibold mb-8 scroll-mt-25"
            >
              Information That You Provide{" "}
              <Link
                href="#information-provided"
                className="text-primary underline"
              >
                #
              </Link>
            </h3>
            <div className="flex flex-col gap-6 mb-8">
              <p>
                We collect personal information that you submit directly to us.
                The categories of information we collect can include:
              </p>
              <ul className="flex flex-col gap-2 px-4 list-disc">
                <li>
                  <b>
                    <i>Registration information.</i>
                  </b>{" "}
                  We collect personal and/or business information that you
                  provide when you register for an account on the Site. This
                  information may include your name, email address, and GitHub
                  username. We use this information to administer your account,
                  provide you with the relevant services and information,
                  communicate with you regarding your account, the Site and for
                  customer support purposes.
                </li>
                <li>
                  <b>
                    <i>Payment information.</i>
                  </b>{" "}
                  If you make a purchase or payment on the Site, such as for a
                  subscription, we collect transactional information provided in
                  connection with your purchase or payment. Please note that we
                  use third party payment processors, including Stripe, to
                  process payments made to us. As such, we do not retain any
                  personally identifiable financial information such as credit
                  card numbers. Rather, all such information is provided
                  directly by you to our third-party processor. The payment
                  processor’s use of your personal information is governed by
                  their privacy notice. To view Stripe’s privacy notice, please
                  visit:{" "}
                  <Link
                    target="_blank"
                    href="https://stripe.com/privacy"
                    className="text-primary underline"
                  >
                    https://stripe.com/privacy
                  </Link>
                  .
                </li>
                <li>
                  <b>
                    <i>Communications.</i>
                  </b>{" "}
                  If you communicate with us through any paper or electronic
                  form, we may collect your name, email address, mailing
                  address, phone number, or any other personal information you
                  choose to provide to us. We use this information to
                  investigate and respond to your inquiries, and to communicate
                  with you, to enhance the services we offer to our users and to
                  manage and grow our organization. If you register for our
                  newsletters or updates, we may communicate with you by email.
                  To unsubscribe from promotional messages, please follow the
                  instructions within our messages and review the{" "}
                  <Link href="#" className="text-primary underline">
                    Control Over Your Information section
                  </Link>{" "}
                  below. If you become a contributor, we may also collect your
                  GitHub name and feature you on our website.
                </li>
                <li>
                  <b>
                    <i>Inquiries and Feedback.</i>
                  </b>{" "}
                  If you contact us, we will collect the information that you
                  provide us, such as your contact information and the contents
                  of your communication with us.
                </li>
              </ul>
              <p>
                You are free to choose which personal information you want to
                provide to us or whether you want to provide us with personal
                information at all. However, some information, such as your
                name, address, payment transaction information, and information
                on your requested Services may be necessary for the performance
                of our contractual obligations.
              </p>
              <p>
                After registration, you may create, upload or transmit files,
                documents, videos, images, data or information as part of your
                use of the Service (collectively, “
                <b>
                  <i>User Content</i>
                </b>
                ”). This includes any inputs you provide to our AI-powered
                support tools and outputs generated in response to your inputs.
                User Content and any information contained in the User Content,
                including personal information you may have included, is stored
                and collected as part of the Service. You have full control of
                the information included in the User Content.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
