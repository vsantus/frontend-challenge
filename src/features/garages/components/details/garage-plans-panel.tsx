"use client";

import { useState } from "react";

import { UnavailableState } from "@/src/components/feedback/feedback-unavailable";

import { GaragePlan } from "../../types/garage.details";
import {
  GaragePlansMenu,
  GaragePlansMenuItem,
} from "./garage-plans-menu";
import { GaragePlansSection } from "./garage-plans-section";

type GaragePlansPanelProps = {
  garageId: string;
  plans: GaragePlan[];
};

export function GaragePlansPanel({
  garageId,
  plans,
}: GaragePlansPanelProps) {
  const [activeItem, setActiveItem] =
    useState<GaragePlansMenuItem>("plans");

  const unavailableTitle =
    activeItem === "discounts"
      ? "Descontos indisponíveis"
      : "Configurações indisponíveis";

  return (
    <section className="mt-5 flex overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <GaragePlansMenu activeItem={activeItem} onSelectItem={setActiveItem} />

      {activeItem === "plans" ? (
        <GaragePlansSection garageId={garageId} plans={plans} />
      ) : (
        <UnavailableState
          title={unavailableTitle}
          description="Esta função ainda não está disponível para esta garagem."
        />
      )}
    </section>
  );
}
