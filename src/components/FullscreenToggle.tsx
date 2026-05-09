"use client";

import { useState, useEffect } from "react";
import { RiFullscreenLine, RiFullscreenExitLine, RiShareLine } from "@remixicon/react";

type Mode = "fullscreen" | "ios-guide" | "hidden";

function detectMode(): Mode {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (isStandalone) return "hidden";
  if ("requestFullscreen" in document.documentElement) return "fullscreen";
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return "ios-guide";
  return "hidden";
}

// This component is always loaded client-only (ssr: false in MenuSheet).
// detectMode() runs in useState lazy init — safe because window is guaranteed present.
export default function FullscreenToggle() {
  const [mode] = useState<Mode>(detectMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Subscribe to fullscreen changes via a callback — the React Compiler-approved pattern
  useEffect(() => {
    if (mode !== "fullscreen") return;
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [mode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (mode === "hidden") return null;

  return (
    <>
      <div className="flex items-center justify-between py-4 border-b border-zinc-800">
        <p className="text-lg font-bold text-zinc-300">Fullscreen</p>

        {mode === "fullscreen" ? (
          <button
            onClick={toggleFullscreen}
            className="flex items-center justify-center gap-2 max-w-36 grow py-2 rounded-lg bg-zinc-800 text-zinc-200 text-md font-bold hover:bg-zinc-700 active:scale-95 transition-all"
          >
            {isFullscreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
            <span>{isFullscreen ? "Exit" : "Enter"}</span>
          </button>
        ) : (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center justify-center gap-2 max-w-36 grow py-2 rounded-lg bg-zinc-800 text-zinc-200 text-md font-bold hover:bg-zinc-700 active:scale-95 transition-all"
          >
            <RiShareLine />
            <span>How to</span>
          </button>
        )}
      </div>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="bg-zinc-900 rounded-t-2xl p-6 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-zinc-100 mb-1">Add to Home Screen</h3>
            <p className="text-md text-zinc-500 mb-5">
              Install the app for a true fullscreen experience on iPhone.
            </p>
            <ol className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold text-lg leading-tight">1</span>
                <span className="text-zinc-300">
                  Tap the <strong className="text-zinc-100">Share</strong> button{" "}
                  <RiShareLine className="inline mb-0.5" /> in your browser toolbar
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold text-lg leading-tight">2</span>
                <span className="text-zinc-300">
                  Scroll down and tap{" "}
                  <strong className="text-zinc-100">Add to Home Screen</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold text-lg leading-tight">3</span>
                <span className="text-zinc-300">
                  Open from your home screen — the browser UI disappears
                </span>
              </li>
            </ol>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-3 rounded-lg bg-green-600 text-white text-md font-bold hover:bg-green-500 active:scale-95 transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
