'use client';

import { Budget, useFormStore } from "@/store/useFormStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ReactNode, useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Spinner } from "../ui/spinner";
import { TypingEffect } from "../typingWrapper";

export function FinalStep({ isActive }: { isActive: boolean }) {
    const savedData = useFormStore((state) => state.formData);
    const resetForm = useFormStore((state) => state.resetForm);

    const [showDrawer, setShowDrawer] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [showNextMessage, setShowNextMessage] = useState(!isActive);

    useEffect(() => {
        const initialDelay = setTimeout(() => {
            setShowDrawer(true);
        }, 8000);

        return () => clearTimeout(initialDelay);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (showDrawer && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (showDrawer && countdown === 0) {
            resetForm();
        }

        return () => clearTimeout(interval);
    }, [showDrawer, countdown, resetForm]);

    const finalTexts: Record<Budget, ReactNode> = {
        'De acordo': (
            <>
                Excelente, <strong>{savedData.name}</strong>! <br /><br />
                Já recebi todo o escopo por aqui. Vamos analisar os detalhes do seu projeto com cuidado para entender a melhor arquitetura para o seu momento. <br /><br />
                Em breve, um de nossos especialistas vai te chamar diretamente no WhatsApp ou e-mail para darmos o próximo passo.
            </>
        ),
        'Avaliar melhor': (
            <>
                Faz todo sentido, <strong>{savedData.name}</strong>. Um projeto de presença digital exige uma decisão bem pensada. <br /><br />
                Já deixei suas respostas salvas por aqui. Se você decidir que é o momento certo para avançar, nossa equipe técnica estará pronta. <br /><br />
                Um de nossos especialistas vai te mandar uma mensagem rápida em breve só para deixar nosso contato à disposição.
            </>
        ),
        'Não interessado': (
            <>
                Sem problemas, <strong>{savedData.name}</strong>! Entendemos perfeitamente. <br /><br />
                O momento ideal e o orçamento precisam estar alinhados para que um projeto tenha sucesso. De qualquer forma, suas respostas ajudaram a estruturar a ideia do seu projeto.<br /><br />
                Sempre que a sua empresa precisar de soluções em tecnologia, estaremos por aqui. Um abraço de toda a equipe!
            </>
        )
    };

    return (
        <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TypingEffect delay={1200} isHistorical={!isActive} onComplete={() => setShowNextMessage(true)}>
                <div className="flex gap-4 items-end">
                    <Avatar>
                        <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                    </Avatar>
                    {savedData.budget && (
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                            {finalTexts[savedData.budget]}
                        </div>
                    )}
                </div>
            </TypingEffect>
            { showNextMessage && (
                <TypingEffect delay={1200} isHistorical={!isActive}>
                <div className="flex gap-4 items-end">
                    <Avatar>
                        <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                        Aguarde alguns instantes para ser redirecioando a nossa página principal.
                    </div>
                </div>
            </TypingEffect>
            )}
            <Drawer open={showDrawer} onOpenChange={setShowDrawer} >
                <DrawerContent className="bg-black">
                    <div className="mx-auto w-full max-w-sm flex flex-col items-center pb-8 pt-4">
                        <DrawerHeader className="text-center w-full flex flex-col items-center">
                            <Spinner className="text-white/80 size-12" />
                            <DrawerTitle className="text-white">
                                Redicionando em {countdown}...
                            </DrawerTitle>
                        </DrawerHeader>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}