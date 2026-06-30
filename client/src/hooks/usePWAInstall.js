import { useEffect, useState } from "react";

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  const [isInstalled, setIsInstalled] = useState(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();

      console.log("✅ beforeinstallprompt fired");

      setDeferredPrompt(e);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      console.log("🎉 App Installed");

      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ User accepted install");
    } else {
      console.log("❌ User dismissed install");
    }

    setDeferredPrompt(null);
    setCanInstall(false);

    return outcome === "accepted";
  };

  return {
    install,
    canInstall,
    isInstalled,
  };
}