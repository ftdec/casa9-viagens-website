"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import {
  Mail,
  Phone,
  Clock,
  Send,
  Heart,
  CheckCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  destination?: string;
  message: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function PlanejeSuaViagem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        });
        reset();
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message || "Erro ao enviar mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Tente novamente.",
      });
    }
  };

  const steps = [
    {
      number: "1",
      title: "Conte seus sonhos",
      description:
        "Compartilhe suas expectativas, desejos e o que faz seu coração vibrar",
    },
    {
      number: "2",
      title: "Criamos sua jornada",
      description:
        "Desenvolvemos um roteiro personalizado alinhado aos 5 pilares da saúde integral",
    },
    {
      number: "3",
      title: "Vivencie a transformação",
      description:
        "Embarque na experiência e retorne com a alma nutrida e memórias inesquecíveis",
    },
  ];

  return (
    <>
      {/* Hero Full-Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=90"
            alt="Planejando viagem dos sonhos"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-text/70 via-neutral-text/50 to-neutral-text/80" />
        </div>

        {/* Content */}
        <div className="container-max relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Comece sua jornada transformadora
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
              Planeje sua{" "}
              <span className="italic font-light">viagem</span>
              <br />
              <span className="text-accent-terracotta">dos sonhos</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Cada detalhe pensado com{" "}
              <span className="font-serif italic">propósito</span>, cada momento
              criado para transformar.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-b from-neutral-lighter to-sand-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div
              className="lg:col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <h2 className="text-3xl font-serif font-bold text-neutral-text mb-8">
                Formas de Contato
              </h2>

              <motion.div variants={fadeInUp} className="mb-6">
                <div className="bg-white rounded-2xl p-6 flex gap-4 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-text mb-2">
                      WhatsApp
                    </h3>
                    <a
                      href="https://wa.me/5511985842595"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ocean-500 hover:text-ocean-600 transition-colors"
                    >
                      +55 (11) 98584-2595
                    </a>
                    <p className="text-xs text-neutral-text-lighter mt-1">
                      Resposta rápida
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-6">
                <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-ocean-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-neutral-text mb-2">Email</h3>
                      <a
                        href="mailto:bia.casa9viagens@casa9viagens.com.br"
                        className="text-ocean-500 hover:text-ocean-600 transition-colors text-xs break-words"
                      >
                        bia.casa9viagens@casa9viagens.com.br
                      </a>
                      <p className="text-xs text-neutral-text-lighter mt-1">
                        Resposta em 24h
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-neutral-text">Horários</h3>
                  </div>
                  <ul className="space-y-2 text-neutral-text-light text-sm">
                    <li className="flex justify-between">
                      <span className="font-medium">Seg - Sex:</span>
                      <span>9h - 18h</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sábado:</span>
                      <span>10h - 14h</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Domingo:</span>
                      <span className="text-neutral-text-lighter">Fechado</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-text mb-3">
                  Planeje sua viagem conosco
                </h2>
                <p className="text-neutral-text-light mb-8">
                  Conte-nos sobre seus sonhos de viagem e vamos criar juntos uma
                  experiência transformadora.
                </p>

                {/* Status Message */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {submitStatus.type === "success" && (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      )}
                      <p>{submitStatus.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-text mb-2">
                        Nome completo *
                      </label>
                      <input
                        {...register("name", {
                          required: "Nome é obrigatório",
                        })}
                        type="text"
                        className="w-full px-4 py-3 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all"
                        placeholder="Seu nome"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-text mb-2">
                        Email *
                      </label>
                      <input
                        {...register("email", {
                          required: "Email é obrigatório",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email inválido",
                          },
                        })}
                        type="email"
                        className="w-full px-4 py-3 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all"
                        placeholder="seu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-2">
                      Telefone / WhatsApp
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-3 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-2">
                      Seu destino dos sonhos
                    </label>
                    <input
                      {...register("destination")}
                      type="text"
                      className="w-full px-4 py-3 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all"
                      placeholder="Para onde você sonha em ir?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-2">
                      Sua mensagem *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Mensagem é obrigatória",
                      })}
                      rows={5}
                      className="w-full px-4 py-3 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none transition-all"
                      placeholder="Conte-nos sobre seus sonhos de viagem... O que faz seu coração vibrar?"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-ocean-500 hover:bg-ocean-600 disabled:bg-ocean-300 !text-black rounded-xl font-medium text-lg transition-all hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3 shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>

                  <p className="text-sm text-neutral-text-light text-center">
                    Responderemos em até 24 horas úteis
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding bg-white">
        <div className="container-sm">
          <motion.div
            className="text-center mb-16 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-text mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-neutral-text-light">
              Do sonho à realidade em 3 passos simples
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="bg-sand-50 hover:bg-sand-100 rounded-2xl p-8 transition-colors duration-300 flex gap-6 items-start">
                  <div className="w-16 h-16 bg-ocean-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-neutral-text mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-text-light leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1920&q=90"
            alt="Aventura esperando"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/90 via-ocean-500/85 to-ocean-600/90" />
        </div>

        <div className="container-sm relative z-10 text-center text-white py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-accent-terracotta" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Pronta para começar sua jornada?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Cada viagem que criamos é única. Vamos conversar e descobrir
              juntos qual experiência transformadora está esperando por você.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
