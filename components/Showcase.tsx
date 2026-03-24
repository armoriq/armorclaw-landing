"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const BUILDERS = [
  {
    title: "Builder Spotlight #1",
    description:
      "See how teams are using ArmorClaw to secure their OpenClaw agent deployments.",
    videoSrc: "/videos/spotlight-1.mp4",
    isReel: false,
  },
  {
    title: "Builder Spotlight #2",
    description:
      "Watch real-world use cases of intent assurance in production environments.",
    videoSrc: "/videos/spotlight-2.mp4",
    isReel: false,
  },
  {
    title: "Builder Spotlight #3",
    description:
      "Learn how ArmorClaw integrates into existing agent workflows.",
    videoSrc: "/videos/spotlight-3.mp4",
    isReel: true,
  },
];

function VideoCard({
  builder,
  onOpen,
}: {
  builder: (typeof BUILDERS)[number];
  onOpen: (builder: (typeof BUILDERS)[number]) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          setMuted(true);
          video.muted = true;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      className="showcase-card group flex flex-col w-full rounded-2xl border-2 border-line overflow-hidden hover:border-secondary/30 transition-all duration-200 cursor-pointer"
      onClick={() => onOpen(builder)}
    >
      <div className="relative aspect-video bg-gradient-to-br from-surface to-line overflow-hidden">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${builder.isReel ? "object-center" : ""}`}
          src={builder.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          style={builder.isReel ? { objectPosition: "center 70%" } : undefined}
        >
          Your browser does not support the video tag.
        </video>
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-200"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="p-6">
        <h3 className="mt-2 text-lg font-bold font-heading">
          {builder.title}
        </h3>
        <p className="mt-2 text-secondary text-sm leading-relaxed font-body">
          {builder.description}
        </p>
      </div>
    </div>
  );
}

function VideoModal({
  builder,
  onClose,
}: {
  builder: (typeof BUILDERS)[number];
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play().catch(() => {});
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative ${builder.isReel ? "h-[85vh] aspect-[9/16]" : "w-[90vw] max-w-4xl aspect-video"} rounded-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          src={builder.videoSrc}
          loop
          playsInline
          preload="auto"
          controls
        >
          Your browser does not support the video tag.
        </video>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-200"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-200"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Showcase() {
  const [activeVideo, setActiveVideo] = useState<
    (typeof BUILDERS)[number] | null
  >(null);

  const handleClose = useCallback(() => setActiveVideo(null), []);

  return (
    <>
      <section id="showcase" className="py-24 md:py-32 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="showcase-header text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
              Built on ArmorClaw
            </h2>
            <p className="mt-4 text-lg text-secondary font-body max-w-2xl mx-auto">
              See what teams are building with ArmorClaw and ArmorIQ. Securing
              autonomous agents at scale.
            </p>
          </div>

          <div className="showcase-cards mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {BUILDERS.map((builder, i) => (
              <VideoCard key={i} builder={builder} onOpen={setActiveVideo} />
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoModal builder={activeVideo} onClose={handleClose} />
      )}
    </>
  );
}
