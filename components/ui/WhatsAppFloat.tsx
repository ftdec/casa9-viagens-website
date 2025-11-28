"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const whatsappNumber = "5511985842595";
  const message = "Olá! Gostaria de conhecer mais sobre a Casa 9 Viagens e criar memórias inesquecíveis.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      {/* Elegant Tooltip */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 z-[60] pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-md text-neutral-text px-5 py-3 rounded-2xl text-sm font-medium shadow-2xl whitespace-nowrap border border-champagne-200">
              <span className="font-serif italic">Vamos conversar?</span>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white/95 border-r border-b border-champagne-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Message Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[380px] max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-champagne-300/30">
              {/* Elegant Header */}
              <div className="bg-gradient-to-br from-[#25D366] to-[#1ebe5d] px-6 py-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="flex-1">
                  <h4 className="!text-black font-serif text-lg font-medium">
                    Casa 9 Viagens
                  </h4>
                  <p className="!text-black/80 text-xs font-light tracking-wide">
                    Consultoria de viagens boutique
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="!text-black/80 hover:!text-black hover:bg-black/10 rounded-full p-2 transition-all"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Body */}
              <div className="p-6 bg-gradient-to-b from-champagne-50 via-white to-sand-50">
                <div className="bg-white rounded-2xl rounded-tl-sm p-5 shadow-sm border border-champagne-200/50 mb-5">
                  <p className="text-neutral-text text-sm leading-relaxed font-light">
                    <span className="font-serif italic text-base">Olá!</span>
                    <br />
                    <br />
                    Que tal transformar sua próxima viagem em uma
                    <span className="font-serif italic"> experiência inesquecível</span>?
                    <br />
                    <br />
                    Estou aqui para criar algo único para você.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#128c40] !text-black font-medium py-3.5 px-6 rounded-2xl transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-serif">Iniciar Conversa</span>
                </a>

                <p className="text-xs text-neutral-text-lighter text-center mt-3 italic">
                  Resposta em minutos durante horário comercial
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Float Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#128c40] text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Abrir WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Elegant Pulse Animation */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-15 animation-delay-200" />
          </>
        )}
      </motion.button>
    </>
  );
}
