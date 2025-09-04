const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              At Businesses Beyond Borders, we collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Subscribe to our SMS notifications</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us through our website or forms</li>
              <li>Attend our events or participate in our programs</li>
              <li>Apply for volunteer opportunities</li>
              <li>Make donations or participate in fundraising activities</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This information may include your name, email address, phone number, postal address, and other contact information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Send you donor updates and impact stories</li>
              <li>Notify you about upcoming events and volunteer opportunities</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process donations and maintain donor records</li>
              <li>Improve our programs and services</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. SMS Communications
            </h2>
            <p className="text-gray-700 mb-4">
              When you opt in to receive SMS messages from us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You consent to receive automated and non-automated text messages about donor updates, impact stories, event reminders, and volunteer opportunities</li>
              <li>Message frequency varies but typically ranges from 1-4 messages per month</li>
              <li>Message and data rates may apply based on your carrier plan</li>
              <li>Your consent is not required as a condition of any purchase or donation</li>
              <li>You can opt out at any time by texting STOP, END, CANCEL, UNSUBSCRIBE, or QUIT</li>
              <li>For help, text HELP or contact us at jacken@businessesbeyondborders.com</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>With service providers who assist us in operating our programs and services</li>
              <li>When required by law or to protect our rights and safety</li>
              <li>With your explicit consent</li>
              <li>In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When you opt out of SMS communications, we will remove your phone number from our messaging lists within a reasonable timeframe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Your Rights
            </h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access and review the personal information we have about you</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal requirements)</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Withdraw consent for SMS communications by texting STOP</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibent text-gray-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 mb-4">
              Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Businesses Beyond Borders</strong><br />
                Email: jacken@businessesbeyondborders.com<br />
                Phone: (386) 517-1527<br />
                Website: https://businessesbeyondborders.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;