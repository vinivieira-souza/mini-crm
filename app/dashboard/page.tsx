import { getLeads } from "@/actions/lead";
import { LeadsTable } from "@/components/LeadsTable";
import { Lead } from "@/generated/prisma/client";

export default async function DashboardPage() {
    const rawLeads = await getLeads();

    const hasSiteFormat: Record<string, string> = {
        'Não tem': 'Vai fazer o primeiro site',
        'Tem, quero alterar': 'Quer fazer alterações',
        'Tem, quero novo': 'Quer refazer o site do zero',
    }

    const objectiveFormat: Record<string, string> = {
        'Começar rápido': 'Site rápido (Landing Page)',
        'Site dedicado': 'Site detalhado com design próprio',
        'E-commerce': 'Loja virtual (E-commerce)'
    }

    const formattedLead: Lead[] = rawLeads.map((lead) => ({
        ...lead,
        hasSite: lead.hasSite ? (hasSiteFormat[lead.hasSite] || lead.hasSite) : 'Não informado',
        objective: lead.objective ? (objectiveFormat[lead.objective] || lead.objective) : 'Não informado',
    }))

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard Novare Vision</h1>
                        <p className="text-gray-500 mt-1">
                            Visão geral das captações de leads ({formattedLead.length} contatos)
                        </p>
                    </div>
                </div>
                <LeadsTable leads={formattedLead} />      
            </div>
        </div>
    );
}