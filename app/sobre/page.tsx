"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ArrowRight, Sparkles, Award } from "lucide-react";
import { heroImages } from "@/lib/images";
import { about, seo } from "@/content";

export default function SobrePage() {
  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: seo.about.title,
            description: seo.about.description,
            mainEntity: {
              "@type": "Person",
              name: about.founder.name,
              jobTitle: about.founder.title,
              description: about.founder.bio,
              image: about.founder.image,
              worksFor: {
                "@type": "Organization",
                name: seo.organization.name,
                memberOf: {
                  "@type": "Organization",
                  name: seo.organization.memberOf,
                },
              },
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImages.sobre?.url || heroImages.home.url}
            alt={heroImages.sobre?.alt || "Sobre a Casa 9 Viagens"}
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
              Conheça nossa história
            </span>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
              style={{
                textShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Sobre a Casa 9
            </h1>

            <p
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium"
              style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)" }}
            >
              Viagens com propósito, curadas com alma
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-[640px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={about.founder.image}
                alt={about.founder.imageAlt}
                fill
                className="object-cover"
                quality={90}
                priority
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <span className="text-sm font-semibold text-ocean-500 uppercase tracking-widest mb-4 block">
                Fundadora
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-neutral-text mb-4">
                {about.founder.name}
              </h2>
              <p className="text-xl text-ocean-600 font-medium mb-6">
                {about.founder.title}
              </p>
              <p className="text-lg text-neutral-text-light leading-relaxed mb-8">
                {about.short}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contato">
                  <Button variant="primary" size="lg" className="!text-black">
                    Agendar conversa <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/blog/bia-minha-jornada">
                  <Button variant="outline" size="lg">
                    Ler história completa
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="section-padding bg-sand-50">
        <div className="container-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-10 bg-white shadow-xl text-center">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-neutral-text mb-4">
                Credenciais & Excelência
              </h3>
              <p className="text-lg text-neutral-text-light leading-relaxed max-w-2xl mx-auto mb-6">
                <strong className="text-neutral-text">Bia Castro</strong> atua
                como consultora independente afiliada à{" "}
                <strong className="text-neutral-text">Primetour</strong>, agência
                membro da renomada rede{" "}
                <strong className="text-neutral-text">Virtuoso</strong>,
                garantindo acesso a experiências exclusivas e padrão de
                excelência internacional em cada detalhe.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-sand-50 rounded-xl">
                  <h4 className="font-bold text-neutral-text mb-2">
                    Saúde Integral
                  </h4>
                  <p className="text-sm text-neutral-text-light">
                    Formação pela NOS Escola como Agente de Saúde Integral
                  </p>
                </div>
                <div className="p-6 bg-sand-50 rounded-xl">
                  <h4 className="font-bold text-neutral-text mb-2">
                    Astrologia Védica
                  </h4>
                  <p className="text-sm text-neutral-text-light">
                    Formação em Astrologia Védica para conexão e propósito
                  </p>
                </div>
                <div className="p-6 bg-sand-50 rounded-xl">
                  <h4 className="font-bold text-neutral-text mb-2">
                    Rede Virtuoso
                  </h4>
                  <p className="text-sm text-neutral-text-light">
                    Afiliada à Primetour (membro da rede Virtuoso)
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
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
              Nossa Missão
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-text max-w-3xl mx-auto mb-6">
              Viagens que transformam vidas
            </h2>
            <p className="text-xl text-neutral-text-light max-w-2xl mx-auto">
              A Casa 9 integra conscientemente os 5 pilares da Saúde Integral em
              cada experiência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { title: "Corpo", desc: "Vitalidade e rejuvenescimento" },
              {
                title: "Alimentação",
                desc: "Nutrição consciente e descoberta culinária",
              },
              { title: "Espiritualidade", desc: "Conexão interior e propósito" },
              {
                title: "Trabalho/Propósito",
                desc: "Clareza de propósito e inspiração",
              },
              {
                title: "Relacionamentos",
                desc: "Conexões autênticas e fortalecimento de laços",
              },
            ].map((pilar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full px-6 py-6 text-center bg-sand-50 hover:bg-ocean-50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-ocean-500 rounded-full flex items-center justify-center mb-4 text-white font-bold text-sm mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="text-base md:text-lg font-serif font-bold text-neutral-text mb-2 text-center">
                    {pilar.title}
                  </h3>
                  <p className="text-sm text-neutral-text-light">{pilar.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-ocean-600 px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 !text-black leading-tight px-4">
            Vamos criar sua próxima jornada?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-ocean-50 mb-10 leading-relaxed max-w-2xl mx-auto px-4">
            Cada detalhe será cuidadosamente pensado para que você retorne com
            a alma nutrida e memórias transformadoras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link href="/contato" className="w-full sm:w-auto flex justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white !text-black hover:bg-sand-50 w-full sm:w-auto"
              >
                Agendar conversa <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/experiencias" className="w-full sm:w-auto flex justify-center">
              <Button
                variant="ghost"
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto"
              >
                Ver experiências
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
