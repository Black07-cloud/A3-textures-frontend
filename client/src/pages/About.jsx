

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-extrabold text-center">
          About A³ Texture Finishes
        </h1>

        <p className="text-slate-400 text-center mt-5 text-lg">
          Premium Interior & Exterior Texture Solutions
        </p>

        <div className="mt-14 bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <h2 className="text-3xl font-bold mb-4">
            Our Story
          </h2>

          <p className="text-slate-300 leading-8">
            A³ Texture Finishes specializes in premium decorative wall
            textures, luxury interior finishes, exterior coatings,
            designer wall effects and customized texture solutions.

            We believe every wall deserves a premium finish that
            transforms ordinary spaces into elegant environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-slate-900 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-5">
              Our Mission
            </h3>

            <p className="text-slate-300 leading-8">
              To deliver premium quality texture finishes with
              creativity, durability and customer satisfaction.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-5">
              Why Choose Us
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li>✔ Premium Materials</li>
              <li>✔ Professional Installation</li>
              <li>✔ Affordable Pricing</li>
              <li>✔ Modern Designs</li>
              <li>✔ Customer Satisfaction</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}