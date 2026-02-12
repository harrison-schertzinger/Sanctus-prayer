import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sanctus Health & Performance',
  description: 'Privacy Policy for Sanctus — the wellness wearable and companion app for contemplative prayer.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="page-transition">
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">LEGAL</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[#6B6B6B]">Effective Date: February 8, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Sanctus Health &amp; Performance (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) built Sanctus (&ldquo;the Product&rdquo;), including the Sanctus wearable band and companion app, to help users establish a consistent contemplative prayer practice. This Privacy Policy explains how we collect, use, and protect your information.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-medium text-[#1A1A1A] mt-6 mb-2">Account Information</h3>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              When you create an account, we collect your email address and an encrypted password. We use Supabase for secure authentication and data storage.
            </p>

            <h3 className="text-lg font-medium text-[#1A1A1A] mt-6 mb-2">Prayer Session Data</h3>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We store your prayer session history, including the type of practice completed and session duration. This data is used to track your progress within the App.
            </p>

            <h3 className="text-lg font-medium text-[#1A1A1A] mt-6 mb-2">App Preferences</h3>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Your settings and preferences (such as preferred practice duration and notification preferences) are stored locally on your device using AsyncStorage.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">2. Information We Do Not Collect</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We do not collect or process any of the following:
            </p>
            <ul className="text-[#6B6B6B] leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>Health or medical data</li>
              <li>Location data</li>
              <li>Device identifiers for advertising or tracking</li>
              <li>Browsing history or usage analytics</li>
              <li>Contacts, photos, or other personal media</li>
            </ul>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              The App is not a medical or health application. No health data is collected, stored, or transmitted.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">3. How We Use Your Information</h2>
            <ul className="text-[#6B6B6B] leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>Provide and maintain the App</li>
              <li>Track your prayer practice progress and streak data</li>
              <li>Deliver optional local notification reminders (with your permission)</li>
            </ul>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">4. Third-Party Services</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              The App uses the following third-party service:
            </p>
            <ul className="text-[#6B6B6B] leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li><strong>Supabase</strong> &mdash; Authentication and database hosting. Your account and session data is stored on Supabase servers with Row-Level Security (RLS) policies, ensuring that users can only access their own data.</li>
            </ul>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We do not use any analytics, advertising, or tracking services. We do not share your data with any third parties for marketing or advertising purposes.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">5. Notifications</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              The App offers optional mindful reminders that are scheduled locally on your device. No push notification tokens or notification data are sent to our servers. You can enable or disable reminders at any time in the App&apos;s settings.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">6. Data Storage &amp; Security</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Your data is stored securely using Supabase, which provides encrypted data storage and secure authentication. Local preferences are stored on your device using encrypted storage. We implement Row-Level Security policies to ensure users can only access their own data.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">7. Your Rights</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="text-[#6B6B6B] leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your account and all associated data</li>
              <li>Opt out of local notifications at any time</li>
            </ul>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              To request account deletion or exercise any of these rights, contact us at{' '}
              <a href="mailto:harrison@sanctusprayer.com" className="text-[#B8960C] hover:underline">
                harrison@sanctusprayer.com
              </a>.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              The App is not directed to children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">9. Changes to This Policy</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>

            <h2 className="text-2xl font-serif text-[#1A1A1A] mt-12 mb-4">10. Contact</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              If you have questions about this Privacy Policy or your data, contact:
            </p>
            <div className="bg-[#F5F3EF] rounded-2xl p-6 border border-[#E8DFC4]">
              <p className="text-[#1A1A1A] font-medium">Harrison Schertzinger</p>
              <p className="text-[#6B6B6B]">Founder, Sanctus Health &amp; Performance</p>
              <a href="mailto:harrison@sanctusprayer.com" className="text-[#B8960C] hover:underline">
                harrison@sanctusprayer.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
