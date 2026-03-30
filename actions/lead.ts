'use server';

import { prisma } from "@/lib/prisma";
import { LeadsData } from "@/store/useFormStore";
import { estimateCalc } from "@/lib/estimateCalc";

export async function createLead(data: LeadsData) {
    try {
        const estimatedValue = estimateCalc(data);

        const newLead = await prisma.lead.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                projectScope: data.projectScope,
                companyName: data.companyName,
                hasSite: data.hasSite,
                siteUrl: data.websiteUrl,
                objective: data.projectObjective,
                leadBehavior: data.budget,
                estimatedValue: estimatedValue,
            }
        });

        return { success: true, leadId: newLead.id };
    } catch (error) {
        console.error('Erro ao salvar o lead:', error);
        
        return { succes: false, message: 'Falha ao salvar as informações no banco.' }
    }
}

export async function getLeads() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return leads;
    } catch (error) {
        console.error('Falha ao buscar os leads da Novare Vision:', error);
        return [];
    }
}