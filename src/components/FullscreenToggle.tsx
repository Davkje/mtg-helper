"use client";

import { useState, useEffect } from "react";
import { RiFullscreenLine, RiFullscreenExitLine } from "@remixicon/react";

export default function FullscreenToggle() {
	const [supported, setSupported] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		setSupported("requestFullscreen" in document.documentElement);

		const handler = () => setIsFullscreen(!!document.fullscreenElement);
		document.addEventListener("fullscreenchange", handler);
		return () => document.removeEventListener("fullscreenchange", handler);
	}, []);

	const toggle = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().catch(() => {});
		} else {
			document.exitFullscreen().catch(() => {});
		}
	};

	if (!supported) return null;

	return (
		<div className="flex items-center justify-between py-4">
			<p className="text-lg font-bold text-zinc-300">Fullscreen</p>
			<button
				onClick={toggle}
				className="flex items-center justify-center gap-2 max-w-36 grow py-2 rounded-lg bg-zinc-800 text-zinc-200 text-md font-bold hover:bg-zinc-700 active:scale-95 transition-all"
			>
				{isFullscreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
				<span>{isFullscreen ? "Exit" : "Enter"}</span>
			</button>
		</div>
	);
}
