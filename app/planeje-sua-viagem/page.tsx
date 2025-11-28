"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  Heart,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { heroImages, backgroundImages } from "@/lib/images";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  duration: "15" | "30";
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function PlanejeSuaViagemPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<BookingFormData>({
    defaultValues: {
      duration: "30",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const selectedDuration = watch("duration");

  const onSubmit = async (data: BookingFormData) => {
    try {
      setSubmitStatus({ type: null, message: "" });

      const response = await fetch("/api/bookings", {
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
            "Agendamento recebido! Em breve você receberá um e-mail de confirmação com o link da conversa.",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message || "Erro ao agendar. Por favor, tente novamente.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Erro ao agendar. Verifique sua conexão e tente novamente.",
      });
    }
  };

  const benefits = [
    {
      icon: Heart,
      title: "Conversa sem compromisso",
      description:
        "Apenas um bate-papo para nos conhecermos e entender seus sonhos.",
    },
    {
      icon: Sparkles,
      title: "Totalmente gratuito",
      description:
        "Essa conversa é um presente. Você não paga nada para explorar possibilidades.",
    },
    {
      icon: Video,
      title: "Online ou presencial",
      description:
        "Escolha o formato que funciona melhor para você. Flexibilidade total.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImages.planejeSuaViagem.url}
            alt={heroImages.planejeSuaViagem.alt}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
        </div>

        <div className="container-max relative z-10 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-ocean-600 rounded-full text-sm font-medium shadow-lg mb-6">
              <Calendar className="w-4 h-4" />
              Primeiro passo para sua transformação
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight"
                style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Vamos conversar
              <br />
              <span className="text-accent-terracotta italic">
                sobre seus sonhos?
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium"
               style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>
              Toda grande viagem começa com uma{" "}
              <span className="font-serif italic font-bold">conversa sincera</span>.
              <br />
              Agende 15 ou 30 minutos comigo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative section-padding overflow-hidden">
        {/* Background suave e acolhedor */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-sand-50/40 to-white" />
        </div>
        <div className="container-max relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-text mb-4">
              Por que agendar uma conversa?
            </h2>
            <p className="text-xl text-neutral-text-light max-w-2xl mx-auto">
              É simples, acolhedor e sem qualquer compromisso.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center h-full bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-br from-ocean-100 to-ocean-50 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:shadow-md transition-shadow">
                      <Icon className="w-8 h-8 !text-black" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-neutral-text mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-text-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="relative section-padding overflow-hidden">
        {/* Background alinhado com pilar Autoconhecimento */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImages.planejeForm.url}
            alt={backgroundImages.planejeForm.alt}
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/97 via-sand-50/96 to-white/97" />
        </div>
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-24"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-text mb-6">
                Agende sua conversa
              </h2>

              <p className="text-lg text-neutral-text-light mb-8 leading-relaxed">
                Escolha se prefere uma conversa rápida de 15 minutos ou um
                papo mais detalhado de 30 minutos. Não há certo ou errado —
                apenas o que faz sentido para você agora.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-ocean-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-text mb-1">
                      15 minutos - Conversa Inicial
                    </h3>
                    <p className="text-sm text-neutral-text-light">
                      Perfeito para tirar dúvidas rápidas e entender se faz
                      sentido para você.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-terracotta/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-text mb-1">
                      30 minutos - Conversa Detalhada
                    </h3>
                    <p className="text-sm text-neutral-text-light">
                      Tempo para explorar seus sonhos, expectativas e começar a
                      desenhar sua viagem.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-sand-200">
                <p className="text-sm text-neutral-text-light italic">
                  "Cada conversa é única. Não tenho script, não tenho fórmulas.
                  Só quero te ouvir e entender o que faz seu coração vibrar."
                </p>
                <p className="text-sm font-medium text-neutral-text mt-3">
                  — Fundadora da Casa 9 Viagens
                </p>
              </div>
            </motion.div>

            {/* Right: Form - Updated with contact page style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      className="w-full px-4 py-3 bg-sand-50/50 border border-sand-200 rounded-xl text-neutral-text placeholder:text-neutral-text-lighter focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 transition-all"
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
                      E-mail *
                    </label>
                    <input
                      {...register("email", {
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "E-mail inválido",
                        },
                      })}
                      type="email"
                      className="w-full px-4 py-3 bg-sand-50/50 border border-sand-200 rounded-xl text-neutral-text placeholder:text-neutral-text-lighter focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 transition-all"
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-2">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      {...register("phone", {
                        required: "Telefone é obrigatório",
                      })}
                      type="tel"
                      className="w-full px-4 py-3 bg-sand-50/50 border border-sand-200 rounded-xl text-neutral-text placeholder:text-neutral-text-lighter focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 transition-all"
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Duration Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-3">
                      Duração da conversa *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedDuration === "15"
                            ? "border-ocean-500 bg-ocean-50"
                            : "border-sand-200 bg-white hover:border-sand-300"
                        }`}
                      >
                        <input
                          {...register("duration")}
                          type="radio"
                          value="15"
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-2xl font-bold text-neutral-text mb-1">
                            15 min
                          </div>
                          <div className="text-xs text-neutral-text-light">
                            Inicial
                          </div>
                        </div>
                        {selectedDuration === "15" && (
                          <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-ocean-500" />
                        )}
                      </label>

                      <label
                        className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedDuration === "30"
                            ? "border-ocean-500 bg-ocean-50"
                            : "border-sand-200 bg-white hover:border-sand-300"
                        }`}
                      >
                        <input
                          {...register("duration")}
                          type="radio"
                          value="30"
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-2xl font-bold text-neutral-text mb-1">
                            30 min
                          </div>
                          <div className="text-xs text-neutral-text-light">
                            Detalhada
                          </div>
                        </div>
                        {selectedDuration === "30" && (
                          <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-ocean-500" />
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-text mb-2">
                        Data preferida *
                      </label>
                      <input
                        {...register("preferred_date", {
                          required: "Data é obrigatória",
                        })}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 bg-sand-50/50 border border-sand-200 rounded-xl text-neutral-text focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 transition-all"
                      />
                      {errors.preferred_date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.preferred_date.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-text mb-2">
                        Horário preferido *
                      </label>
                      <input
                        {...register("preferred_time", {
                          required: "Horário é obrigatório",
                        })}
                        type="time"
                        className="w-full px-4 py-3 bg-sand-50/50 border border-sand-200 rounded-xl text-neutral-text focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 transition-all"
                      />
                      {errors.preferred_time && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.preferred_time.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-2">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      className="w-full px-4 py-3 bg-sand-50/50 border border-sand-200 rounded-xl text-neutral-text placeholder:text-neutral-text-lighter focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 resize-none transition-all"
                      placeholder="Há algo específico que gostaria de conversar?"
                    />
                  </div>

                  {/* Status Message */}
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl flex items-start gap-3 ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {submitStatus.type === "success" && (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm">{submitStatus.message}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-ocean-500 hover:bg-ocean-600 disabled:bg-ocean-300 !text-black rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Agendar Conversa
                      </>
                    )}
                  </button>

                  <p className="text-xs text-neutral-text-lighter text-center">
                    Você receberá um e-mail de confirmação com o link para a
                    videochamada.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-b from-white to-sand-50">
        <div className="container-sm">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-text mb-4">
              Ainda tem dúvidas?
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Preciso ter tudo decidido para agendar?",
                a: "De jeito nenhum! A conversa é justamente para explorarmos juntos. Pode vir com ideias vagas ou nenhuma ideia — vamos descobrir juntos.",
              },
              {
                q: "Essa conversa é realmente gratuita?",
                a: "Sim! Totalmente gratuita e sem compromisso. É um primeiro passo para nos conhecermos.",
              },
              {
                q: "E se eu não puder no horário agendado?",
                a: "Sem problemas! Basta me avisar e reagendamos para um momento melhor.",
              },
              {
                q: "Como será a conversa?",
                a: "Será online por videochamada (Google Meet). Relaxada, sem pressão. Apenas uma conversa sincera sobre seus sonhos.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-serif font-bold text-lg text-neutral-text mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-neutral-text-light">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
