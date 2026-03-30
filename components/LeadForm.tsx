'use client';

import { useFormStore } from "@/store/useFormStore";
import { Progress } from "./ui/progress";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { StepContact } from "./steps/stepContact";
import { TypingEffect } from "./typingWrapper";
import { StepScope } from "./steps/stepScope";
import { StepCompany } from "./steps/stepCompany";
import { StepHasSite } from "./steps/stepHasSite";
import { StepSiteUrl } from "./steps/stepSiteUrl";
import { StepObjective } from "./steps/stepObjective";
import { StepBudget } from "./steps/stepBudget";
import { FinalStep } from "./steps/finalStep";

export function LeadForm() {
    const chatHistory = useFormStore((state) => state.chatHistory);

    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory.length]);

    const currentStep = chatHistory[chatHistory.length - 1];
    let progressPercentage = 20;

    switch (currentStep) {
        case "contact":
            progressPercentage = 20;
            break;
        case "scope":
            progressPercentage = 35;
            break;
        case "hasSite":
            progressPercentage = 50;
            break;
        case "objective":
            progressPercentage = 65;
            break;
        case "budget":
            progressPercentage = 80;
            break;
        case "final":
            progressPercentage = 100;
            break;

    }

    return (
        <div className="flex flex-col h-screen bg-white font-sans">
            <header className="sticky top-0 z-10 bg-white p-4">
                <div className="max-w-2xl mx-auto flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                        <span>Orçamento Novare Vision</span>
                        <span className="text-blue-600">{progressPercentage}% concluído</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 w-full bg-gray-200" />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
                <div className="max-w-2xl mx-auto flex flex-col gap-6 md:max-w-3xl md:pr-12">
                    <div className="flex gap-4 items-end animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Avatar>
                            <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                        </Avatar>
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800 leading-relaxed">
                            Olá! Que legal ver seu interesse. Para sermos rápidos e precisos no seu projeto, vou te fazer algumas perguntas rápidas.
                        </div>
                    </div>

                    {chatHistory.map((stepId, index) => {
                        const isActive = index === chatHistory.length - 1;

                        switch (stepId){
                            case "contact":
                                return (
                                    <TypingEffect key={stepId} delay={1200} isHistorical={!isActive} >
                                        <StepContact isActive={isActive} />
                                    </TypingEffect>
                                );
                            case "scope":
                                return <StepScope key={stepId} isActive={isActive} />
                            case "company":
                                return (
                                    <TypingEffect key={stepId} delay={1200} isHistorical={!isActive} >
                                        <StepCompany isActive={isActive} />
                                    </TypingEffect>
                                );
                            case "hasSite":
                                return (
                                    <TypingEffect key={stepId} delay={1200} isHistorical={!isActive} >
                                        <StepHasSite isActive={isActive} />
                                    </TypingEffect>
                                )
                            case "siteUrl":
                                return (
                                    <TypingEffect key={stepId} delay={1200} isHistorical={!isActive} >
                                        <StepSiteUrl isActive={isActive} />
                                    </TypingEffect>
                                )
                            case "objective":
                                return <StepObjective key={stepId} isActive={isActive} />
                            case "budget":
                                return <StepBudget key={stepId} isActive={isActive} />
                            case "final":
                                return <FinalStep key={stepId} isActive={isActive} />
                            default:
                                return null
                        }
                    })}

                    <div ref={bottomRef} className="h-4" />
                </div>
            </main>
        </div>
    )
}