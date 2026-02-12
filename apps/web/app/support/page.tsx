import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support | Sanctus Health & Performance',
  description: 'Get help with Sanctus. Contact us for support, bug reports, or feedback.',
};

export default function SupportPage() {
  return (
    <main className="page-transition">
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">HELP</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4 leading-tight">
            Support
          </h1>
          <p className="text-[#6B6B6B] text-lg leading-relaxed">
            We&apos;re here to help you get the most out of Sanctus.
          </p>
        </div>
      </section>

      {/* Contact Card */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#F5F3EF] rounded-2xl p-8 md:p-12 border border-[#E8DFC4]">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Get in Touch</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              If you have a question, found a bug, or want to share feedback, reach out directly. We read and respond to every message.
            </p>

            <a
              href="mailto:harrison@sanctusprayer.com"
              className="inline-flex items-center gap-2 bg-[#B8960C] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#A3850B] transition-colors"
            >
              Email Us
            </a>
            <p className="text-[#6B6B6B] text-sm mt-3">
              harrison@sanctusprayer.com
            </p>
          </div>

          {/* Common Topics */}
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-serif text-[#1A1A1A]">Common Topics</h2>

            <div className="border-b border-[#E8DFC4] pb-6">
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Account &amp; Login</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Having trouble signing in or creating an account? Reach out and we&apos;ll help you get back on track.
              </p>
            </div>

            <div className="border-b border-[#E8DFC4] pb-6">
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Bug Reports</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                If something isn&apos;t working as expected, let us know. Please include your device model and iOS version so we can investigate.
              </p>
            </div>

            <div className="border-b border-[#E8DFC4] pb-6">
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Feature Requests</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Have an idea for how Sanctus could be better? We&apos;d love to hear it. Your feedback shapes the future of the product.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Account Deletion</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                To request deletion of your account and all associated data, email us at{' '}
                <a href="mailto:harrison@sanctusprayer.com" className="text-[#B8960C] hover:underline">
                  harrison@sanctusprayer.com
                </a>{' '}
                and we&apos;ll process your request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
