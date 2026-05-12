import { Building2, Car } from "lucide-react";
import { AppShell } from "../../components/shell/app-shell";
import { DashboardFeatureCard } from "./components/dashboard-card";
import { PageHeader } from "./components/dashboard-header";

export default function DashboardPage() {
    return (
        <AppShell >
            <PageHeader
                title="Bem-vindo ao Portal Estapar B2B"
                description={`Gerencie seus serviços de estacionamento,
                          acesse relatórios, configure credenciados
                        e contrate \n planos de mensalidade em um só lugar.`}
            />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <DashboardFeatureCard
                    href="/garages"
                    title="Garagens"
                    description="Veja a lista de garagens disponíveis e suas configurações."
                    icon={<Building2 size={42} strokeWidth={1.5} />}
                />

                <DashboardFeatureCard
                    href="/plans"
                    title="Mensalistas"
                    description="Contrate vagas adicionais para seus funcionários ou visitantes."
                    icon={<Car size={42} strokeWidth={1.5} />}
                />
            </div>
        </AppShell>
    );
}