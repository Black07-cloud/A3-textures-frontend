import { X, Smartphone, ArrowRight, Globe } from "lucide-react";

export default function InstallGuide({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

      <div className="w-full max-w-md rounded-3xl bg-[#111111] border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)] overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 p-6 text-center">

          <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center">

            <Smartphone
              size={42}
              className="text-amber-500"
            />

          </div>

          <h2 className="mt-4 text-2xl font-bold text-black">
            Install Guide
          </h2>

        </div>

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white"
        >
          <X size={24} />
        </button>

        {/* Body */}

        <div className="p-6">

          <div className="space-y-5">

            <div className="flex gap-4">

              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-black">
                1
              </div>

              <div>

                <h3 className="text-white font-semibold">
                  Open Chrome Menu
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Tap the
                  <Globe className="inline w-4 h-4 mx-1" />
                  Chrome menu (⋮)
                </p>

              </div>

            </div>

            <ArrowRight className="mx-auto text-amber-500" />

            <div className="flex gap-4">

              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-black">
                2
              </div>

              <div>

                <h3 className="text-white font-semibold">
                  Add to Home Screen
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Select
                  <span className="text-white">
                    {" "}
                    Add to Home Screen
                  </span>
                </p>

              </div>

            </div>

            <ArrowRight className="mx-auto text-amber-500" />

            <div className="flex gap-4">

              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-black">
                3
              </div>

              <div>

                <h3 className="text-white font-semibold">
                  Confirm
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Tap
                  <span className="text-white">
                    {" "}
                    Install
                  </span>
                  {" "}or{" "}
                  <span className="text-white">
                    Create Shortcut
                  </span>
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 font-bold text-black"
          >
            Got it
          </button>

        </div>

      </div>

    </div>
  );
}