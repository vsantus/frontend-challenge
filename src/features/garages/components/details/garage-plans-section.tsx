"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { GaragePlan } from "../../types/garage.details";
import { GaragePlanModal } from "./garage-plan-modal";
import { GaragePlansTable } from "./garage-plans-table";

type GaragePlansSectionProps = {
  garageId: string;
  plans: GaragePlan[];
};

export function GaragePlansSection({
  garageId,
  plans,
}: GaragePlansSectionProps) {
  const [localPlans, setLocalPlans] = useState(plans);
  const [selectedPlan, setSelectedPlan] = useState<GaragePlan | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  function handleCreatePlan() {
    setSelectedPlan(null);
    setIsCreateModalOpen(true);
  }

  function handleEditPlan(planId: string) {
    const plan = localPlans.find((currentPlan) => currentPlan.id === planId);

    if (!plan) {
      return;
    }

    setSelectedPlan(plan);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedPlan(null);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  function handleSubmitEditPlan(updatedPlan: GaragePlan) {
    setLocalPlans((currentPlans) =>
      currentPlans.map((currentPlan) =>
        currentPlan.id === updatedPlan.id ? updatedPlan : currentPlan
      )
    );
    handleCloseEditModal();
  }

  function handleSubmitCreatePlan(newPlan: GaragePlan) {
    setLocalPlans((currentPlans) => [...currentPlans, newPlan]);
    console.log("Plano criado para garagem:", garageId, newPlan);
    handleCloseCreateModal();
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

      <GaragePlansTable plans={localPlans} onEditPlan={handleEditPlan} />

      {isEditModalOpen && (
        <GaragePlanModal
          key={selectedPlan?.id}
          mode="edit"
          open={isEditModalOpen}
          plan={selectedPlan}
          onClose={handleCloseEditModal}
          onSubmit={handleSubmitEditPlan}
        />
      )}

      {isCreateModalOpen && (
        <GaragePlanModal
          key="create-plan"
          mode="create"
          open={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onSubmit={handleSubmitCreatePlan}
        />
      )}
    </div>
  );
}
