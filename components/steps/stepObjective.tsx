'use client';

import { ProjectObjective, useFormStore } from "@/store/useFormStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { TypingEffect } from "../typingWrapper";

export function StepObjective({ isActive }: { isActive: boolean }) {
    const setFormData = useFormStore((state) => state.setFormData);
    const addNextStep = useFormStore((state) => state.addNextStep);
    const backPrevStep = useFormStore((state) => state.backPrevStep);
    const savedData = useFormStore((state) => state.formData);

    const handleSelect = (select: ProjectObjective) => {
        setFormData({ projectObjective: select });
        addNextStep('budget');
    };

    const [showNextMessage, setShowNextMessage] = useState(!isActive);

    const responseTexts: Record<ProjectObjective, string> = {
        'Começar rápido': 'Quero que mais pessoas encontrem meu negócio',
        'Site dedicado': 'Quero apresentar minha empresa e passar credibilidade',
        'E-commerce': 'Preciso de uma loja virtual para vender 24h'
    };

    return (
        <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TypingEffect delay={1500} isHistorical={!isActive} onComplete={() => setShowNextMessage(true)} >
                <div className="flex gap-4 items-end">
                    <Avatar>
                        <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                        {savedData.projectScope === 'Empresarial'
                            ? `Ótimo ${savedData.name}! Na Novare Vision trabalhamos de várias formas, dependendo da atual necessidade e objetivo da empresa.`
                            : `Ótimo ${savedData.name}! Na Novare Vision trabalhamos de várias formas, dependendo do objetivo do projeto.`
                        }
                    </div>
                </div>
            </TypingEffect>
            {showNextMessage && (
                <TypingEffect delay={1000} isHistorical={!isActive} onComplete={() => setShowNextMessage(true)} >
                    <div className="flex gap-4 items-end">
                        <Avatar>
                            <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                        </Avatar>
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                            O que descreve melhor o seu objetivo atual?
                        </div>
                    </div>

                    {isActive ? (
                        <div className="flex flex-col gap-2 max-w-xl md:pl-12">
                            <div className="flex flex-col gap-3 mt-2">
                                <Button className="md:py-3 md:text-base whitespace-normal flex-col h-auto p-3" onClick={() => handleSelect('Começar rápido')}>Quero que mais pessoas encontrem meu negócio <br /><span className="text-white/80 text-xs md:text-sm font-light md:font-normal">(Site com entrega ágil para colher resultados rápidos)</span></Button>
                                <Button className="md:py-3 md:text-base whitespace-normal flex-col h-auto p-3" onClick={() => handleSelect('Site dedicado')}>Quero apresentar minha empresa e passar credibilidade <br /><span className="text-white/80 text-xs md:text-sm font-light md:font-normal">(Site com SEO avançado, design dedicado e gerenciador de projetos)</span></Button>
                                <Button className="md:py-3 md:text-base whitespace-normal flex-col h-auto p-3" onClick={() => handleSelect('E-commerce')}>Preciso de uma loja virtual para vender 24h <br /><span className="text-white/80 text-xs md:text-sm font-light md:font-normal">(Plataforma completa com pagamentos integrados, carrinho otimizado e gestão de estoque)</span></Button>
                            </div>
                            <div>
                                <Button size='sm' variant='ghost' className="text-black/70" onClick={() => backPrevStep()}>
                                    <ArrowLeft />
                                    Voltar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-end w-full pl-12 animate-in fade-in zoom-in-95">
                            <div className="bg-black text-gray-100 p-4 rounded-2xl rounded-br-none shadow-md max-w-[90%] text-sm leading-relaxed">
                                <p className="font-bold">{savedData.projectObjective ? responseTexts[savedData.projectObjective] : ''}</p>
                            </div>
                        </div>
                    )}
                </TypingEffect>
            )}

        </div>
    )
}