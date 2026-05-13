"use client";

import { FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  GaragePlan,
  GaragePlanFormValues,
} from "../../types/garage.details";

type GaragePlanModalMode = "create" | "edit";

type GaragePlanModalProps = {
  mode: GaragePlanModalMode;
  open: boolean;
  plan?: GaragePlan | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (plan: GaragePlanFormValues) => void;
};

type GaragePlanFormState = {
  description: string;
  status: GaragePlan["status"];
  vehicleType: string;
  vacancies: string;
  value: string;
  cancellationValue: string;
  startsAt: string;
  endsAt: string;
};

const defaultFormState: GaragePlanFormState = {
  description: "",
  status: "active",
  vehicleType: "car",
  vacancies: "1",
  value: "0",
  cancellationValue: "0",
  startsAt: "2025-06-20",
  endsAt: "",
};

function getInitialFormState(plan?: GaragePlan | null): GaragePlanFormState {
  if (!plan) {
    return defaultFormState;
  }

  return {
    ...defaultFormState,
    description: plan.description,
    status: plan.status,
    vacancies: String(plan.vacancies),
    value: String(plan.value),
  };
}

export function GaragePlanModal({
  mode,
  open,
  plan,
  loading = false,
  onClose,
  onSubmit,
}: GaragePlanModalProps) {
  const [formState, setFormState] = useState<GaragePlanFormState>(
    getInitialFormState(plan)
  );

  const isActive = formState.status === "active";
  const title = mode === "edit" ? "Editar Plano" : "Novo Plano";
  const description =
    mode === "edit"
      ? "Atualize os dados do plano selecionado."
      : "Preencha os dados para criar um novo plano.";
  const submitLabel = mode === "edit" ? "Salvar" : "Criar";

  if (!open) {
    return null;
  }

  function updateField(field: keyof GaragePlanFormState, value: string) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const vacancies = Number(formState.vacancies);
    const occupied = plan?.occupied ?? 0;

    onSubmit({
      id: plan?.id ?? crypto.randomUUID(),
      description: formState.description,
      value: Number(formState.value),
      vacancies,
      occupied,
      available: vacancies - occupied,
      status: formState.status,
      vehicleType: formState.vehicleType,
      cancellationValue: Number(formState.cancellationValue),
      startsAt: formState.startsAt,
      endsAt: formState.endsAt,
    });
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-zinc-950/75 px-4 py-5 md:items-center md:px-6 md:py-8">
      <form
        onSubmit={handleSubmit}
        className="relative min-h-full w-full rounded-lg bg-white p-5 shadow-xl md:min-h-0 md:max-w-[528px] md:p-6"
      >
        <div className="pr-10">
          <h2 className="text-xl font-semibold leading-none text-zinc-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">{description}</p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-5 top-5 text-zinc-700"
          aria-label="Fechar modal de plano"
          disabled={loading}
        >
          <X size={18} />
        </Button>

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
          <Input
            id="plan-description"
            label="Descrição"
            placeholder="Digite a descrição do plano"
            value={formState.description}
            onChange={(event) => updateField("description", event.target.value)}
            disabled={loading}
            required
          />

          <div className="space-y-2">
            <span className="block text-sm font-semibold text-zinc-950">
              Status
            </span>
            <label className="flex h-11 items-center gap-3">
              <Switch
                checked={isActive}
                disabled={loading}
                onCheckedChange={(checked) =>
                  updateField("status", checked ? "active" : "inactive")
                }
              />
              <span className="text-sm font-semibold text-green-700">
                {isActive ? "Ativo" : "Inativo"}
              </span>
            </label>
          </div>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-zinc-950">
              Tipo de Veículo
            </span>
            <select
              value={formState.vehicleType}
              disabled={loading}
              onChange={(event) => updateField("vehicleType", event.target.value)}
              className="h-11 w-full rounded-md border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus-visible:ring-2 focus-visible:ring-[#7ad33e] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="car">Carro</option>
              <option value="motorcycle">Moto</option>
              <option value="truck">Caminhão</option>
            </select>
          </label>

          <Input
            id="plan-vacancies"
            label="Total de Vagas"
            type="number"
            min={0}
            value={formState.vacancies}
            onChange={(event) => updateField("vacancies", event.target.value)}
            disabled={loading}
            required
          />

          <Input
            id="plan-value"
            label="Valor (R$)"
            type="number"
            min={0}
            step="0.01"
            value={formState.value}
            onChange={(event) => updateField("value", event.target.value)}
            disabled={loading}
            required
          />

          <Input
            id="plan-cancellation-value"
            label="Valor do Cancelamento (R$)"
            type="number"
            min={0}
            step="0.01"
            value={formState.cancellationValue}
            onChange={(event) =>
              updateField("cancellationValue", event.target.value)
            }
            disabled={loading}
          />

          <Input
            id="plan-starts-at"
            label="Início da Validade"
            type="date"
            value={formState.startsAt}
            onChange={(event) => updateField("startsAt", event.target.value)}
            disabled={loading}
            required
          />

          <Input
            id="plan-ends-at"
            label="Fim da Validade"
            type="date"
            value={formState.endsAt}
            onChange={(event) => updateField("endsAt", event.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            size="lg"
            loading={loading}
            className="bg-[#7ad33e] text-white hover:bg-[#6bc733]"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>,
    document.body
  );
}
