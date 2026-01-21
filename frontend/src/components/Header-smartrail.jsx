import { useRef, useState, useEffect } from "react";



function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
  if (menuOpen) {
    window.history.pushState({ menu: true }, "");
  }

  const handlePopState = () => {
    setMenuOpen(false);
  };

  window.addEventListener("popstate", handlePopState);
  return () => window.removeEventListener("popstate", handlePopState);
}, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-[1000] h-[70px] w-full px-8 flex items-center justify-between
        bg-[#dce3feda] backdrop-blur-md border-b border-[#e0dada]">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
  src="/blue-train.png"
  alt="Train"
  className="
    h-[58px]
    animate-slide-in-left
    transform-gpu
    -translate-x-2
    md:translate-x-0
  "
/>

          <a href="/home">
            <h1 className="text-[28px] font-extrabold italic tracking-wide text-[#1e3a5f] font-[Sora]">
              SmartRail
            </h1>
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* Desktop links */}
          <a href="/about" className="hidden md:inline-block navBtn">About us</a>
          <a href="/pnr-status" className="hidden md:inline-block navBtn">PNR Status</a>
          <a href="/notifications" className="hidden md:inline-block navBtn">Notifications</a>
          <a href="/sign-in" className="hidden md:inline-block navBtn">Login</a>

          {/* HAMBURGER */}
          <div
            ref={buttonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-between w-[26px] h-[18px] cursor-pointer"

          >
            <span className={`h-[3px] w-full rounded bg-[#0f2f55] transition 
              ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`h-[3px] w-full rounded bg-[#0f2f55] transition 
              ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-[3px] w-full rounded bg-[#0f2f55] transition 
              ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </div>
        </div>
      </header>

      {/* DROPDOWN */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed top-[70px] right-4 z-[2000]
            w-[calc(100%-32px)] md:w-[220px]
            bg-white/95 backdrop-blur-lg
            border border-[#0f2f5540]
            rounded-xl shadow-xl
            p-4 flex flex-col gap-2"
        >
          <a href="/sign-in" className="dropdownItem">Login</a>
          <a href="/history" className="dropdownItem">Booking History</a>
          <a className="dropdownItem">Switch Theme</a>
          <a href="/support" className="dropdownItem">Support</a>
        </div>
      )}
    </>
  );
}

export default Header;
