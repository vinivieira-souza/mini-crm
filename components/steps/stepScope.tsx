'use client';

import { ProjectScope, useFormStore } from "@/store/useFormStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useState } from "react";
import { TypingEffect } from "../typingWrapper";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export function StepScope({ isActive }: { isActive: boolean }) {
    const setFormData = useFormStore((state) => state.setFormData)
    const addNextStep = useFormStore((state) => state.addNextStep)
    const backPrevStep = useFormStore((state) => state.backPrevStep)
    const projectScope = useFormStore((state) => state.formData.projectScope)
    const clientName = useFormStore((state) => state.formData.name)

    const handleSelect = (select: ProjectScope) => {
        setFormData({ projectScope: select })
        addNextStep(select === 'Empresarial' ? 'company' : 'hasSite');
    };

    const [showNextMessage, setShowNextMessage] = useState(!isActive);

    return (
        <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TypingEffect delay={1200} isHistorical={!isActive} onComplete={() => setShowNextMessage(true)} >
                <div className="flex gap-4 items-end">
                    <Avatar>
                        <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                        Certo, {clientName}! Agora, vamos entender melhor seu projeto.
                    </div>
                </div>
            </TypingEffect>
            {showNextMessage && (
                <TypingEffect delay={1000} isHistorical={!isActive}>
                    <div className="flex gap-4 items-end">
                        <Avatar>
                            <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                        </Avatar>
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                            Primeiro, esse projeto é uma demanda pessoal ou empresarial?
                        </div>
                    </div>

                    {isActive && (
                        <div className="flex flex-col gap-2 md:pl-12 max-w-xl">
                            <div className="flex flex-col gap-3 mt-2">
                                <Button className="p-6 md:text-base" onClick={() => handleSelect('Pessoal')}>Demanda pessoal (Pessoa Física - CPF)</Button>
                                <Button className="p-6 md:text-base" onClick={() => handleSelect('Empresarial')}>Demanda empresarial (Pessoa Jurídica - CNPJ)</Button>
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

            {!isActive && projectScope && (
                <div className="flex justify-end w-full pl-12 animate-in fade-in zoom-in-95">
                    <div className="bg-black text-gray-100 p-4 rounded-2xl rounded-br-none shadow-md max-w-[90%] text-sm leading-relaxed">
                        <p className="font-bold">{projectScope === 'Empresarial'
                            ? 'Demanda empresarial'
                            : 'Demanda pessoal'
                        }</p>
                    </div>
                </div>
            )}
        </div>
    )
}