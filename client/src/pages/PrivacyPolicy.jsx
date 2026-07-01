export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold">
          Privacy Policy
        </h1>

        <p className="text-slate-400 mt-3">
          Last Updated: July 2026
        </p>

        <div className="space-y-10 mt-10">

          <section>
            <h2 className="text-2xl font-bold mb-3">
              Information We Collect
            </h2>

            <p className="text-slate-300">
              We may collect your name, reviews,
              contact information and information
              submitted through this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">
              How We Use Information
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Improve our services</li>
              <li>Display customer reviews</li>
              <li>Respond to inquiries</li>
              <li>Maintain website security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">
              Data Security
            </h2>

            <p className="text-slate-300">
              We use secure technologies to protect
              your personal information.
            </p>
          </section>

        </div>

      </div>

    </div>
  );
}