import { create } from "zustand";

export type StepId = 'contact' | 'scope' | 'company' | 'hasSite' | 'siteUrl' | 'objective' | 'budget' | 'final'

export type ProjectScope = 'Pessoal' | 'Empresarial'
export type HasSite = 'Não tem' | 'Tem, quero novo' | 'Tem, quero alterar'
export type ProjectObjective = 'Começar rápido' | 'Site dedicado' | 'E-commerce'
export type Budget = 'De acordo' | 'Avaliar melhor' | 'Não interessado'

export interface LeadsData {
    name: string;
    email: string;
    phone: string;
    companyName?: string;
    websiteUrl?: string;

    projectScope: ProjectScope | null;
    hasSite: HasSite | null;
    projectObjective: ProjectObjective | null;
    budget: Budget | null;
}

interface FormState {
    chatHistory: StepId[];
    formData: LeadsData;
    setFormData: (data: Partial<LeadsData>) => void;
    addNextStep: (stepId: StepId) => void;
    backPrevStep: () => void;
    resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
    chatHistory: ['contact'],
    formData: {
        name: '',
        email: '',
        phone: '',
        companyName: '',
        websiteUrl: '',
        projectScope: null,
        hasSite: null,
        projectObjective: null,
        budget: null,
    },

    setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data },
    })),

    addNextStep: (stepId) => set((state) => ({
        chatHistory: [...state.chatHistory, stepId]
    })),

    backPrevStep: () => set((state) => {
        if (state.chatHistory.length > 1) {
            return {
                chatHistory: state.chatHistory.slice(0, -1)
            };
        }
        return state;
    }),

    resetForm: () => set({
        chatHistory: ['contact'],
        formData: {
            name: '',
            email: '',
            phone: '',
            companyName: '',
            websiteUrl: '',
            projectScope: null,
            hasSite: null,
            projectObjective: null,
            budget: null,
        }
    })
}));