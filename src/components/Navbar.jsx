import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Detect which dashboard is active
  const path = location.pathname;
  let userType = "landing";
  if (path.startsWith("/patient")) userType = "patient";
  else if (path.startsWith("/research")) userType = "researcher";

  // Navigation links
  const navLinks = {
    landing: [
      { id: "about", label: "About", to: "/about" },
      { id: "contact", label: "Contact", to: "/contact" },
    ],
    patient: [
      { id: "overview", label: "Overview" },
      { id: "experts", label: "Experts" },
      { id: "trials", label: "Clinical Trials" },
      { id: "publications", label: "Publications" },
      { id: "forums", label: "Forums" },
      { id: "favorites", label: "Favorites" },
    ],
    researcher: [
      { id: "overview", label: "Overview" },
      { id: "papers", label: "Papers" },
      { id: "grants", label: "Grants" },
      { id: "collaborations", label: "Collaborations" },
      { id: "favorites", label: "Favorites" },
    ],
  };

  const links = navLinks[userType];

  // Scroll tracking (for dashboards)
  useEffect(() => {
    if (userType === "landing") return;
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) current = section.id;
      });
      setActiveSection(current || "overview");
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [userType]);

  // For Landing: highlight based on route
  useEffect(() => {
    if (userType === "landing") {
      const currentPage = path.includes("contact")
        ? "contact"
        : path.includes("about")
        ? "about"
        : "";
      setActiveSection(currentPage);
    }
  }, [path, userType]);

  // Smooth scroll (for dashboard pages)
  const scrollToSection = (id) => {
    if (!id) return;
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    } else {
      const targetPath = userType === "researcher" ? "/research" : "/patient";
      navigate(targetPath);
      setTimeout(() => {
        const sec = document.getElementById(id);
        sec?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        background:
          "linear-gradient(120deg, rgba(230,245,255,0.85), rgba(240,250,255,0.8))",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(180,210,255,0.3)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        fontFamily: "'Poppins', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "98%",
          margin: "0 auto",
          padding: "0.6rem 1rem",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        {/* === Left: Logo === */}
        <div style={{ justifySelf: "start" }}>
          <Link
            to="/"
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "#3572EF",
              textDecoration: "none",
              letterSpacing: "0.5px",
            }}
          >
            CuraLink
          </Link>
        </div>

        {/* === Center: Login/Register (Landing only) === */}
        {userType === "landing" && (
          <div style={{ justifySelf: "center" }}>
            <Link
              to="/authpage"
              style={{
                padding: "0.5rem 1rem",
                background: "linear-gradient(135deg, #4ea1ff, #3572EF)",
                color: "white",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 3px 12px rgba(100,160,255,0.25)",
                textDecoration: "none",
              }}
            >
              Login / Register
            </Link>
          </div>
        )}

        {/* === Right: Navigation Buttons === */}
        <div
          style={{
            justifySelf: "end",
            display: "flex",
            gap: "0.3rem",
            backgroundColor: "rgba(255,255,255,0.6)",
            padding: "0.4rem 0.5rem",
            borderRadius: "30px",
            border: "3px solid rgba(180,210,255,0.5)",
          }}
        >
          {links.map(({ id, to, label }) => (
            <motion.button
              key={id}
              onClick={() =>
                userType === "landing" ? navigate(to) : scrollToSection(id)
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color:
                  activeSection === id
                    ? "white"
                    : "rgba(20,40,80,0.85)",
                background:
                  activeSection === id
                    ? "linear-gradient(135deg, #4ea1ff, #3572EF)"
                    : "transparent",
                padding: "0.3rem 0.7rem",
                borderRadius: "30px",
                border: "none",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow:
                  activeSection === id
                    ? "0 3px 10px rgba(100,160,255,0.3)"
                    : "none",
              }}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* === Mobile Menu === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background:
                "linear-gradient(120deg, rgba(230,245,255,0.95), rgba(240,250,255,0.9))",
              padding: "0.5rem 0",
              gap: "0.3rem",
            }}
          >
            {links.map(({ id, label, to }) => (
              <button
                key={id}
                onClick={() => {
                  userType === "landing" ? navigate(to) : scrollToSection(id);
                  setMenuOpen(false);
                }}
                style={{
                  color:
                    activeSection === id
                      ? "#3572EF"
                      : "rgba(20,40,80,0.9)",
                  fontWeight: 500,
                  textDecoration: "none",
                  fontSize: "1rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
