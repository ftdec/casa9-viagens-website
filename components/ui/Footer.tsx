"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram, Heart, CheckCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterConsent) {
      setNewsletterStatus({
        type: "error",
        message: "Você precisa aceitar os termos para continuar.",
      });
      return;
    }

    setIsSubmitting(true);
    setNewsletterStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletterEmail,
          consent: newsletterConsent,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNewsletterStatus({
          type: "success",
          message: "Cadastrado! Verifique seu e-mail para confirmar.",
        });
        setNewsletterEmail("");
        setNewsletterConsent(false);
      } else {
        setNewsletterStatus({
          type: "error",
          message: result.message || "Erro ao cadastrar. Tente novamente.",
        });
      }
    } catch (error) {
      setNewsletterStatus({
        type: "error",
        message: "Erro ao cadastrar. Verifique sua conexão.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-sand-50 to-sand-100 mt-32">
      {/* Main Footer */}
      <div className="container-max pt-20 pb-12">
        {/* Top Section - Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-sand-200">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
              <div className="relative w-80 h-40">
                <Image
                  src="/logo-casa9-transparent.png"
                  alt="Casa 9 Viagens - Flor de Lótus"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-neutral-text-light leading-relaxed mb-6 max-w-md">
              Transformamos roteiros em memórias inesquecíveis. Cada viagem é
              uma história única, pensada com cuidado e amor.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/casa9.viagens"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-sand-200 flex items-center justify-center text-neutral-text hover:text-ocean-500 hover:border-ocean-500 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@casa9viagens.com"
                className="w-10 h-10 rounded-full bg-white border border-sand-200 flex items-center justify-center text-neutral-text hover:text-ocean-500 hover:border-ocean-500 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-sand-200 flex items-center justify-center text-neutral-text hover:text-ocean-500 hover:border-ocean-500 transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-12">
            <h3 className="text-xl font-serif font-bold text-neutral-text mb-3">
              Inspire-se
            </h3>
            <p className="text-neutral-text-light mb-6">
              Receba histórias de viagem, dicas exclusivas e destinos
              inspiradores direto no seu email.
            </p>

            {newsletterStatus.type && (
              <div
                className={`mb-4 p-3 rounded-xl text-sm flex items-start gap-2 ${
                  newsletterStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {newsletterStatus.type === "success" && (
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                )}
                {newsletterStatus.message}
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-white border border-sand-200 rounded-xl text-neutral-text placeholder:text-neutral-text-lighter focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 transition-all"
                  aria-label="Email para newsletter"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-ocean-500 text-white rounded-xl font-medium hover:bg-ocean-600 disabled:bg-ocean-300 transition-all hover:scale-105 disabled:scale-100 whitespace-nowrap"
                >
                  {isSubmitting ? "..." : "Inscrever"}
                </button>
              </div>

              {/* LGPD Consent */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="newsletter-consent"
                  checked={newsletterConsent}
                  onChange={(e) => setNewsletterConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-sand-300 text-ocean-500 focus:ring-ocean-500"
                />
                <label
                  htmlFor="newsletter-consent"
                  className="text-xs text-neutral-text-light leading-relaxed"
                >
                  Concordo em receber comunicações da Casa 9 Viagens. Conforme a{" "}
                  <Link
                    href="/privacidade"
                    className="underline hover:text-ocean-500"
                  >
                    Política de Privacidade
                  </Link>
                  . Você pode cancelar a qualquer momento.
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Explorar */}
          <div>
            <h4 className="text-sm font-bold text-neutral-text uppercase tracking-wider mb-4">
              Explorar
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/experiencias"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Experiências
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiências */}
          <div>
            <h4 className="text-sm font-bold text-neutral-text uppercase tracking-wider mb-4">
              Experiências
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/planeje-sua-viagem"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Planeje sua Viagem
                </Link>
              </li>
              <li>
                <Link
                  href="/experiencias"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Todas Experiências
                </Link>
              </li>
            </ul>
          </div>

          {/* Conheça */}
          <div>
            <h4 className="text-sm font-bold text-neutral-text uppercase tracking-wider mb-4">
              Conheça
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/depoimentos"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre#processo"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre#valores"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Nossos Valores
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-sm font-bold text-neutral-text uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@casa9viagens.com"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-neutral-text-light hover:text-ocean-500 transition-colors text-sm"
                >
                  Formulário
                </Link>
              </li>
              <li className="text-xs text-neutral-text-lighter pt-2">
                Seg-Sex: 9h-18h
                <br />
                Sáb: 10h-14h
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-sand-200">
          {/* Poetic Quote */}
          <div className="text-center mb-8">
            <p className="text-2xl md:text-3xl font-serif italic text-neutral-text mb-2 leading-relaxed">
              "Aqui, viajar é colecionar boas memórias."
            </p>
            <div className="flex items-center justify-center gap-2 text-ocean-500 mt-4">
              <Image
                src="/logo-casa9-transparent.png"
                alt="Casa 9"
                width={30}
                height={30}
                className="object-contain"
              />
              <span className="text-sm text-neutral-text-light">
                Feito com dedicação
              </span>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-text-lighter">
            <p>
              © {currentYear} Casa 9 Viagens. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacidade"
                className="hover:text-ocean-500 transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="hover:text-ocean-500 transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="/excluir-dados"
                className="hover:text-ocean-500 transition-colors"
              >
                Excluir meus dados
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
