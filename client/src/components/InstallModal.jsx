import {
  X,
  Smartphone,
  Download,
  Zap,
  Wifi,
  ChevronRight,
} from "lucide-react";

export default function InstallModal({
  open,
  onClose,
  onInstall,
  onGuide,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-yellow-500/20 bg-slate-900 shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-300 hover:text-white transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-8 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl">

            <Smartphone
              size={48}
              className="text-amber-500"
            />

          </div>

          <h2 className="mt-5 text-3xl font-extrabold text-black">
            A³ Texture Finishes
          </h2>

          <p className="mt-2 text-black/80">
            Premium Interior & Exterior App
          </p>

        </div>

        {/* Body */}
        <div className="space-y-6 p-7">

          <div>

            <h3 className="text-xl font-bold text-white">
              Install the App
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Install A³ Texture Finishes for faster access,
              premium browsing experience and offline support.
            </p>

          </div>

          {/* Benefits */}

          <div className="space-y-4">

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/50 p-3">

              <Zap className="text-yellow-400" />

              <div>

                <h4 className="font-semibold text-white">
                  Fast Access
                </h4>

                <p className="text-xs text-slate-400">
                  Open directly from your Home Screen.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/50 p-3">

              <Download className="text-yellow-400" />

              <div>

                <h4 className="font-semibold text-white">
                  Easy Downloads
                </h4>

                <p className="text-xs text-slate-400">
                  Browse texture collections quickly.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/50 p-3">

              <Wifi className="text-yellow-400" />

              <div>

                <h4 className="font-semibold text-white">
                  Offline Support
                </h4>

                <p className="text-xs text-slate-400">
                  Continue browsing when available offline.
                </p>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <button
            onClick={onInstall}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 font-bold text-black transition hover:scale-[1.02]"
          >
            <Download size={20} />
            Install Now
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-slate-700 py-4 font-semibold text-white transition hover:bg-slate-800"
          >
            Later
          </button>

          <button
            onClick={onGuide}
            className="flex w-full items-center justify-center gap-1 text-sm text-yellow-400 transition hover:text-yellow-300"
          >
            How to Install
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}