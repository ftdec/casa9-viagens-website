"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "./Card";
import { MessageCircle, Users } from "lucide-react";

interface ExperienceCardProps {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  tags: string[];
  isGroup?: boolean;
  image?: string;
  details?: string[];
  idealFor?: string;
}

export default function ExperienceCard({
  slug,
  title,
  summary,
  description,
  tags,
  isGroup = false,
  image,
  details,
  idealFor,
}: ExperienceCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContact = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experience_slug: slug,
          source: "experience_card",
        }),
      });

      if (response.ok) {
        // Redirect to contact page with pre-filled experience
        window.location.href = `/contato?experience=${slug}`;
      } else {
        // Fallback: redirect anyway
        window.location.href = `/contato?experience=${slug}`;
      }
    } catch (error) {
      // Fallback on error
      window.location.href = `/contato?experience=${slug}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWaitlist = () => {
    window.location.href = `/experiencias?waitlist=${slug}#waitlist-form`;
  };

  return (
    <Card hover className="h-full overflow-hidden group bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Image - if provided */}
      {image && (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          {/* Tags overlay */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-ocean-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-2xl font-serif font-bold text-neutral-text">
            {title}
          </h3>
          {isGroup && (
            <div className="flex-shrink-0 w-8 h-8 bg-ocean-100 rounded-full flex items-center justify-center" title="Viagem em grupo">
              <Users className="w-4 h-4 text-ocean-600" />
            </div>
          )}
        </div>

        <p className="text-neutral-text-light mb-4 leading-relaxed font-medium">
          {summary}
        </p>

        {description && (
          <p className="text-sm text-neutral-text-lighter leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Details list */}
        {details && details.length > 0 && (
          <ul className="space-y-2 mb-6">
            {details.slice(0, 3).map((detail, idx) => (
              <li
                key={idx}
                className="text-sm text-neutral-text-light flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        )}

        {/* Ideal for */}
        {idealFor && (
          <p className="text-xs text-neutral-text-lighter italic mb-4 pb-4 border-b border-sand-200">
            Ideal para: {idealFor}
          </p>
        )}

        {/* Tags - if no image */}
        {!image && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-ocean-50 text-xs font-medium text-ocean-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleContact}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-white hover:bg-sand-50 disabled:bg-sand-100 text-black rounded-xl font-medium text-sm transition-all hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2 border-2 border-black shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            {isSubmitting ? "Carregando..." : "Quero conversar"}
          </button>

          {isGroup && (
            <button
              onClick={handleWaitlist}
              className="px-4 py-3 bg-white hover:bg-sand-50 text-black rounded-xl font-medium text-sm transition-all hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap border-2 border-black shadow-md"
              title="Entrar na lista de espera"
            >
              <Users className="w-4 h-4" />
              Lista
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
