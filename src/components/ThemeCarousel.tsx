"use client";

import { useState, useEffect, useCallback } from "react";

const themes = [
  { src: "/themes/modular.png", name: "Astro Modular", url: "https://astro-modular.netlify.app/" },
  { src: "/themes/axis.png", name: "Axis", url: "https://astro-axis.netlify.app" },
  { src: "/themes/chiri.png", name: "Chiri", url: "https://astro-chiri.netlify.app/" },
  { src: "/themes/fuwari.png", name: "Fuwari", url: "https://fuwari.vercel.app/" },
  { src: "/themes/custom.png", name: "davidvkimball.com", url: "https://davidvkimball.com" },
];

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
  </svg>
);

export function ThemeCarousel() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [zoomVisible, setZoomVisible] = useState(false);

  useEffect(() => {
    if (paused || zoomed !== null) return;
    const interval = setInterval(() => {
      setLeaving(current);
      setCurrent((c) => (c + 1) % themes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [current, paused, zoomed]);

  useEffect(() => {
    if (leaving === -1) return;
    const timeout = setTimeout(() => setLeaving(-1), 700);
    return () => clearTimeout(timeout);
  }, [leaving]);

  const openZoom = useCallback((index: number) => {
    setZoomed(index);
    requestAnimationFrame(() => setZoomVisible(true));
  }, []);

  const closeZoom = useCallback(() => {
    setZoomVisible(false);
    setTimeout(() => setZoomed(null), 300);
  }, []);

  useEffect(() => {
    if (zoomed === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [zoomed, closeZoom]);

  return (
    <div className="theme-showcase">
      <div
        className="cards-stack"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {themes.map((theme, i) => {
          const isActive = i === current;
          const isLeaving = i === leaving;
          const isBehind =
            i === (current + 1) % themes.length ||
            i === (current + 2) % themes.length;
          const behindIndex = isBehind
            ? i === (current + 1) % themes.length
              ? 1
              : 2
            : 0;

          let className = "card";
          if (isActive) className += " card-active";
          else if (isLeaving) className += " card-leaving";
          else if (isBehind) className += ` card-behind card-behind-${behindIndex}`;
          else className += " card-hidden";

          return (
            <div
              key={theme.name}
              className={className}
              onClick={() => isActive && openZoom(i)}
            >
              <img src={theme.src} alt={theme.name} draggable={false} />
              {isActive && theme.url && (
                <a
                  href={theme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-external-link"
                  title={`Visit ${theme.name}`}
                  aria-label={`Visit ${theme.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalIcon />
                </a>
              )}
              <div className="card-name">
                <span>{theme.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox overlay */}
      {zoomed !== null && (
        <div
          className={`lightbox ${zoomVisible ? "lightbox-visible" : ""}`}
          onClick={closeZoom}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={themes[zoomed].src}
              alt={themes[zoomed].name}
              draggable={false}
              onClick={closeZoom}
            />
            <div className="lightbox-label">
              <span>{themes[zoomed].name}</span>
              {themes[zoomed].url && (
                <a
                  href={themes[zoomed].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-external-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalIcon />
                  <span>Visit site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .theme-showcase {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 1rem 0 3rem;
        }

        .cards-stack {
          position: relative;
          width: 420px;
          max-width: 90vw;
          aspect-ratio: 1275 / 806;
        }

        .card {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.10),
            0 1px 4px rgba(0, 0, 0, 0.06);
          transition:
            opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .card-active {
          cursor: zoom-in;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .card-external-link {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          color: white;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease, background 0.2s ease;
          z-index: 5;
        }

        .card-active:hover .card-external-link {
          opacity: 1;
        }

        @media (hover: none) {
          .card-active .card-external-link {
            opacity: 0.8;
          }
        }

        .card-external-link:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        .card-name {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 14px;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%);
          color: white;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-active {
          z-index: 3;
          opacity: 1;
          transform: translateY(0) scale(1);
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.14),
            0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .card-leaving {
          z-index: 4;
          opacity: 0;
          transform: translateY(-12px) scale(1.01);
        }

        .card-behind-1 {
          z-index: 2;
          opacity: 0.5;
          transform: translateY(10px) scale(0.96);
          box-shadow:
            0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .card-behind-2 {
          z-index: 1;
          opacity: 0.25;
          transform: translateY(18px) scale(0.92);
          box-shadow: none;
        }

        .card-hidden {
          z-index: 0;
          opacity: 0;
          transform: translateY(24px) scale(0.90);
          pointer-events: none;
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0);
          backdrop-filter: blur(0px);
          cursor: zoom-out;
          transition:
            background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lightbox-visible {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          transform: scale(0.92);
          opacity: 0;
          transition:
            transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: zoom-out;
        }

        .lightbox-visible .lightbox-content {
          transform: scale(1);
          opacity: 1;
        }

        .lightbox-content img {
          display: block;
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
        }

        .lightbox-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px 18px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          color: white;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lightbox-external-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: white;
          opacity: 0.7;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .lightbox-external-link:hover {
          opacity: 1;
        }

        @media (min-width: 640px) {
          .cards-stack {
            width: 520px;
          }

          .card-name {
            padding: 10px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
