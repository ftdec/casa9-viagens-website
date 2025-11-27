"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ArrowRight, Sparkles, Heart, Users, Compass } from "lucide-react";
import { heroImages } from "@/lib/images";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ServicosPage() {
  const services = [
    {
      icon: Heart,
      title: "Jornada de Essência Pessoal",
      description:
        "Roteiros sob medida criados a partir do seu pedido, seguindo o conceito da Casa 9: luxo consciente aliado à saúde integral. Cada detalhe é pensado para tocar sua essência e promover reconexão consigo mesmo.",
      features: [
        "Roteiro 100% personalizado",
        "Curadoria exclusiva de experiências",
        "Alinhado aos 5 pilares da saúde integral",
        "Luxo consciente e sustentável",
      ],
      color: "ocean",
    },
    {
      icon: Users,
      title: "Imersões Temáticas: Círculos de Descoberta",
      description:
        "Viagens em grupo com a participação de um especialista acompanhando durante toda a jornada. Os temas sempre irão permear os 5 pilares da saúde integral: Corpo, Alimentação, Espiritualidade, Trabalho e Relacionamentos.",
      features: [
        "Viagens em grupo selecionado",
        "Especialista dedicado durante toda a viagem",
        "Temas transformadores",
        "Conexões autênticas e aprendizado coletivo",
      ],
      color: "terracotta",
    },
    {
      icon: Compass,
      title: "Escapadas de Reequilíbrio",
      description:
        "Viagens de final de semana para destinos onde o hotel é a própria experiência e oferece atividades dentro dos 5 pilares. Podemos também levar especialistas e criar workshops exclusivos para esse formato.",
      features: [
        "Finais de semana transformadores",
        "Hotéis com experiências integradas",
        "Workshops e atividades guiadas",
        "Reequilíbrio rápido e profundo",
      ],
      color: "sage",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImages.experiencias?.url || heroImages.home.url}
            alt="Serviços Casa 9 Viagens"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
        </div>

        <div className="container-max relative z-10 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-ocean-600 rounded-full text-sm font-medium shadow-lg mb-6">
              <Sparkles className="w-4 h-4 !text-black" />
              Como posso atender você
            </span>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
              style={{
                textShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Meu Trabalho
            </h1>

            <p
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium"
              style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)" }}
            >
              Experiências transformadoras criadas com propósito e alma
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-ocean-500 uppercase tracking-widest mb-4 block">
              Jornadas que transformam
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-text max-w-3xl mx-auto mb-6">
              Três formas de vivenciar a Casa 9
            </h2>
            <p className="text-xl text-neutral-text-light max-w-2xl mx-auto">
              Cada formato é pensado para atender diferentes momentos da sua
              jornada
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full p-8 hover:shadow-2xl transition-all duration-500 bg-white border-2 border-sand-200 hover:border-ocean-300">
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${service.color}-100 to-${service.color}-50 rounded-2xl flex items-center justify-center mb-6 shadow-md`}
                      >
                        <Icon
                          className={`w-8 h-8 text-${service.color}-600`}
                          strokeWidth={2}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-serif font-bold text-neutral-text mb-4">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-text-light leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mt-auto">
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-neutral-text"
                            >
                              <span className="text-ocean-500 mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-10 bg-gradient-to-br from-ocean-50 to-sand-50 border-2 border-ocean-200 max-w-3xl mx-auto">
              <h3 className="text-3xl font-serif font-bold text-neutral-text mb-4">
                Qual jornada fala com você?
              </h3>
              <p className="text-lg text-neutral-text-light mb-6 leading-relaxed">
                Vamos conversar para entender o momento que você está vivendo e
                criar a experiência perfeita para você.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contato">
                  <Button
                    variant="primary"
                    size="lg"
                    className="!text-black w-full sm:w-auto"
                  >
                    Agendar conversa <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/experiencias">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Ver experiências
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pilares Section */}
      <section className="section-padding bg-sand-50">
        <div className="container-max">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-ocean-500 uppercase tracking-widest mb-4 block">
              O que nos guia
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-text max-w-3xl mx-auto mb-6">
              Os 5 Pilares da Saúde Integral
            </h2>
            <p className="text-xl text-neutral-text-light max-w-2xl mx-auto">
              Cada experiência é desenhada para tocar diferentes dimensões do
              seu bem-estar
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {[
              { title: "Corpo", emoji: "🧘" },
              { title: "Alimentação", emoji: "🍃" },
              { title: "Espiritualidade", emoji: "✨" },
              { title: "Trabalho", emoji: "💼" },
              { title: "Relacionamentos", emoji: "🤝" },
            ].map((pilar, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full p-6 text-center bg-white hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{pilar.emoji}</div>
                  <h3 className="text-lg font-serif font-bold text-neutral-text">
                    {pilar.title}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative section-padding bg-ocean-600">
        <div className="container-sm text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 !text-black leading-tight">
              Pronta para começar sua jornada?
            </h2>
            <p className="text-xl md:text-2xl !text-black mb-10 leading-relaxed max-w-2xl mx-auto">
              Toda grande transformação começa com um simples{" "}
              <span className="font-serif italic">"olá"</span>.
            </p>
            <Link href="/contato">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white !text-black hover:bg-sand-50 shadow-2xl"
              >
                Vamos Conversar <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
