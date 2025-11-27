"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/sobre", label: "Quem Somos" },
    { href: "/servicos", label: "Serviços" },
    { href: "/experiencias", label: "Experiências" },
    { href: "/planeje-sua-viagem", label: "Planeje sua Viagem" },
    { href: "/depoimentos", label: "Depoimentos" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={closeMenu}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-16 h-16 md:w-20 md:h-20"
            >
              <Image
                src="/logo-casa9.png"
                alt="Casa 9 Viagens - Flor de Lótus"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg font-bold text-neutral-text group-hover:text-accent-gold transition-colors duration-300 whitespace-nowrap">
                Casa 9 Viagens
              </span>
              <span className="text-[10px] md:text-xs text-neutral-text-light tracking-wider uppercase group-hover:text-accent-gold/80 transition-colors duration-300 whitespace-nowrap">
                Viagens de Reconexão
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-neutral-text hover:text-accent-gold transition-colors duration-300 font-medium group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-accent-gold group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/contato"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-terracotta-400 to-terracotta-500 hover:from-terracotta-500 hover:to-terracotta-600 text-neutral-text rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md whitespace-nowrap"
            >
              <span className="font-serif">Vamos Conversar</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-champagne-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-terracotta-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-terracotta-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-champagne-200"
          >
            <nav className="container-max flex flex-col py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-neutral-text hover:text-accent-gold hover:bg-champagne-100 rounded-lg transition-all duration-300 font-medium"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  href="/contato"
                  className="block mt-4 px-6 py-3 bg-gradient-to-r from-terracotta-400 to-terracotta-500 hover:from-terracotta-500 hover:to-terracotta-600 text-neutral-text text-center rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
                  onClick={closeMenu}
                >
                  <span className="font-serif">Vamos Conversar</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
