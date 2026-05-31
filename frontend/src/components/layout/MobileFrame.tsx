"use client";

import { ReactNode } from "react";

function DesktopBackdrop() {
  return (
    <div className="desktop-backdrop" aria-hidden>
      <div className="desktop-backdrop__gradient" />
      <div className="desktop-backdrop__glow desktop-backdrop__glow--left" />
      <div className="desktop-backdrop__glow desktop-backdrop__glow--right" />
      <svg
        className="desktop-backdrop__mountains"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L0,320Z"
          fill="rgba(11,61,46,0.35)"
        />
        <path
          d="M0,288L80,272C160,256,320,224,480,213.3C640,203,800,213,960,218.7C1120,224,1280,224,1360,224L1440,224L1440,320L0,320Z"
          fill="rgba(46,125,50,0.25)"
        />
      </svg>
      <div className="desktop-backdrop__trees">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="desktop-backdrop__tree"
            style={{ left: `${5 + i * 8}%` }}
          />
        ))}
      </div>
      <div className="desktop-brand hidden lg:block">
        <p className="desktop-brand__tag">WEKEND WARRIORS</p>
        <h2 className="desktop-brand__title">
          Trưởng thành qua
          <br />
          <span>trải nghiệm thật</span>
        </h2>
        <p className="desktop-brand__desc">
          Chương trình 2 ngày 1 đêm · Thanh thiếu niên 11–18 tuổi
        </p>
      </div>
    </div>
  );
}

function PhoneNotch() {
  return (
    <div className="phone-notch" aria-hidden>
      <div className="phone-notch__island">
        <div className="phone-notch__camera" />
      </div>
    </div>
  );
}

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <DesktopBackdrop />
      <div className="phone-stage">
        <div className="phone-device">
          <PhoneNotch />
          <div className="phone-screen">{children}</div>
          <div className="phone-home-indicator" aria-hidden />
        </div>
      </div>
    </div>
  );
}
