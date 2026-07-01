import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold text-white">
              A³ Texture Finishes
            </h2>

            <p className="mt-4 text-slate-400 leading-7">
              Premium Interior & Exterior Texture Finishes
              with modern designs and high-quality decorative
              wall textures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/about"
                className="text-slate-400 hover:text-yellow-400 transition"
              >
                About Us
              </Link>

              <Link
                to="/privacy-policy"
                className="text-slate-400 hover:text-yellow-400 transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-slate-400 hover:text-yellow-400 transition"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/contact"
                className="text-slate-400 hover:text-yellow-400 transition"
              >
                Contact Us
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-slate-400">

              <p>📍 Tamil Nadu, India</p>

              <p>📧 a3textures@gmail.com</p>

              <p>📱 +91 9994886016</p>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} A³ Texture Finishes.
            All Rights Reserved.
          </p>

          <p className="text-slate-500 text-sm mt-3 md:mt-0">
            Version 1.0
          </p>

        </div>

      </div>
    </footer>
  );
}