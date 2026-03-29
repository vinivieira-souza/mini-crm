'use client';

import { Budget, useFormStore } from "@/store/useFormStore";
import { useState } from "react";
import { TypingEffect } from "../typingWrapper";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { estimateCalc } from "@/lib/estimateCalc";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export function StepBudget({ isActive }: { isActive: boolean }) {
    const setFormData = useFormStore((state) => state.setFormData);
    const addNextStep = useFormStore((state) => state.addNextStep)
    const backPrevStep = useFormStore((state) => state.backPrevStep);
    const savedData = useFormStore((state) => state.formData);

    const handleSelect = (select: Budget) => {
        setFormData({ budget: select });
        addNextStep('final');
    }

    const responseTexts: Record<Budget, string> = {
        'De acordo': 'Está dentro do esperado',
        'Avaliar melhor': 'Não foge da realidade, mas quero avaliar melhor',
        'Não interessado': 'Foge do orçamento, não consigo contratar'
    };

    const estimatedCalc = estimateCalc(savedData);

    const [showNextMessage, setShowNextMessage] = useState(!isActive ? 3 : 1);

    return (
        <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TypingEffect delay={1200} isHistorical={!isActive} onComplete={() => setShowNextMessage(2)} >
                <div className="flex gap-4 items-end">
                    <Avatar>
                        <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                        Maravilha, {savedData.name}! Agora, baseado nas suas respostas posso estimar uma base para seu investimento.
                    </div>
                </div>
            </TypingEffect>
            {showNextMessage >= 2 && (
                <TypingEffect delay={1800} isHistorical={!isActive} onComplete={() => setShowNextMessage(3)} >
                    <div className="flex gap-4 items-end">
                        <Avatar>
                            <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                        </Avatar>
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                            Para essa sua necessidade, o investimento estimado no seu projeto fica <strong>{estimatedCalc}</strong>, incluindo desenvolvimento, testes e lançamento. <br />
                            <span className="text-sm font-semibold">*Vale lembrar que essa é uma estimativa baseada em uma interação limitada e o valor final é definido de acordo com a complexidade do projeto.</span>
                        </div>
                    </div>
                </TypingEffect>
            )}
            {showNextMessage >= 3 && (
                <TypingEffect delay={1000} isHistorical={!isActive} >
                    <div className="flex gap-4 items-end">
                        <Avatar>
                            <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                        </Avatar>
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-black/85">
                            Sobre essa estimativa de investimento para ter seu projeto pronto, você diria que:
                        </div>
                    </div>
                    {isActive && (
                        <div className="flex flex-col gap-2 max-w-lg md:pl-12">
                            <div className="flex flex-col gap-3 mt-2">
                                <Button size='lg' className="py-6 md:text-base" onClick={() => handleSelect('De acordo')}>Está dentro do esperado</Button>
                                <Button size='lg' className="py-6 md:text-base" onClick={() => handleSelect('Avaliar melhor')}>Não foge da realidade, mas quero avaliar melhor</Button>
                                <Button size='lg' className="py-6 md:text-base" onClick={() => handleSelect('Não interessado')}>Foge do orçamento, não consigo contratar</Button>
                            </div>
                            <div>
                                <Button size='sm' variant='ghost' className="text-black/70" onClick={() => backPrevStep()}>
                                    <ArrowLeft />
                                    Voltar
                                </Button>
                            </div>
                        </div>
                    )}
                </TypingEffect>
            )}

            {!isActive && savedData.budget && (
                <div className="flex justify-end w-full pl-12 animate-in fade-in zoom-in-95">
                    <div className="bg-black text-gray-100 p-4 rounded-2xl rounded-br-none shadow-md max-w-[90%] text-sm leading-relaxed">
                        <p className="font-bold">{ savedData.budget ? responseTexts[savedData.budget] : '' }</p>
                    </div>
                </div>
            )}
        </div>
    )
}