"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { GaragePlan } from "../../types/garage.details";
import { GaragePlansTable } from "./garage-plans-table";

type GaragePlansSectionProps = {
  garageId: string;
  plans: GaragePlan[];
};

export function GaragePlansSection({
  garageId,
  plans,
}: GaragePlansSectionProps) {
  function handleCreatePlan() {
    console.log("Abrir modal de novo plano", garageId);
  }

  function handleEditPlan(planId: string) {
    console.log("Abrir modal de edição do plano", planId);
  }

  return (
    <div className="flex-1 bg-white px-6 py-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-medium text-zinc-900">
          Planos Disponíveis
        </h2>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleCreatePlan}
          className="border-green-500 px-3 text-green-600 hover:bg-green-50 hover:text-green-600"
        >
          <Plus size={16} />
          Novo Plano
        </Button>
      </div>

      <GaragePlansTable plans={plans} onEditPlan={handleEditPlan} />
    </div>
  );
}
