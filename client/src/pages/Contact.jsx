export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mt-14">

          <div className="bg-slate-900 rounded-3xl p-8">
            <h2 className="text-2xl font-bold">
              Contact Details
            </h2>

            <div className="space-y-5 mt-6">

              <p>📞 +91 XXXXX XXXXX</p>

              <p>📧 support@a3textures.com</p>

              <p>📍 Tamil Nadu, India</p>

              <p>🕘 Mon - Sat : 9 AM - 7 PM</p>

            </div>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8">
            <h2 className="text-2xl font-bold">
              Business Hours
            </h2>

            <p className="mt-5 text-slate-300">
              We are available during business hours
              to assist you with texture solutions
              and project consultations.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}