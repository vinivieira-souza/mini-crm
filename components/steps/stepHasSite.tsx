'use client';

import { HasSite, useFormStore } from "@/store/useFormStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export function StepHasSite({ isActive }: { isActive: boolean }) {
    const setFormData = useFormStore((state) => state.setFormData);
    const addNextStep = useFormStore((state) => state.addNextStep);
    const backPrevStep = useFormStore((state) => state.backPrevStep);
    const savedData = useFormStore((state) => state.formData);

    const handleSelect = (select: HasSite) => {
        setFormData({ hasSite: select });
        addNextStep(select === 'Não tem' ? 'objective' : 'siteUrl');
    };

    const responseTexts: Record<HasSite, string> = {
        'Não tem': 'Não tem site, será o primeiro',
        'Tem, quero alterar': 'Tem um site, mas quero alterar',
        'Tem, quero novo': 'Tem um site, mas quero um novo',
    };

    return (
        <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-4 items-end">
                <Avatar>
                    <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                </Avatar>
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                    {savedData.projectScope === 'Empresarial'
                        ? `Entendi, ${savedData.name}! Sua empresa já tem um site ou será o primeiro?`
                        : `Entendi, ${savedData.name}! E você já tem um site para seu projeto ou será o primeiro?`
                    }
                </div>
            </div>
            {isActive ? (
                <div className="flex flex-col gap-2 max-w-lg md:pl-12">
                    <div className="flex flex-col gap-3 mt-2">
                        <Button className="p-6 md:text-base" onClick={() => handleSelect('Não tem')}>Não tem site, será o primeiro</Button>
                        <Button className="p-6 md:text-base" onClick={() => handleSelect('Tem, quero alterar')}>Tem um site, mas quero alterar</Button>
                        <Button className="p-6 md:text-base" onClick={() => handleSelect('Tem, quero novo')}>Tem um site, mas quero um novo</Button>
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
                        <p className="font-bold">{savedData.hasSite ? responseTexts[savedData.hasSite] : '' }</p>
                    </div>
                </div>
            )}
        </div>
    )
}