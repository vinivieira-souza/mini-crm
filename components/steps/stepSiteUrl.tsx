'use client';

import { useFormStore } from "@/store/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, SendHorizonal } from "lucide-react";

const siteUrlSchema = z.object({
    websiteUrl: z.url("Url inválida")
});

type UrlFormData = z.infer<typeof siteUrlSchema>;

export function StepSiteUrl({ isActive }: { isActive: boolean }) {
    const setFormData = useFormStore((state) => state.setFormData);
    const addNextStep = useFormStore((state) => state.addNextStep);
    const backPrevStep = useFormStore((state) => state.backPrevStep);
    const savedData = useFormStore((state) => state.formData);

    const { register, handleSubmit, formState: { errors } } = useForm<UrlFormData>({
        resolver: zodResolver(siteUrlSchema),
        mode: 'onChange',
        defaultValues: { websiteUrl: savedData.websiteUrl }
    });

    const onSubmit = (data: UrlFormData) => {
        setFormData(data);
        addNextStep('objective');
    };

    return (
        <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-4 items-end">
                <Avatar>
                    <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                </Avatar>
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
                    Perfeito! Qual o url do site?
                </div>
            </div>
            {isActive ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 md:pl-12 max-w-md"
                >
                    <div>
                        <div className="relative w-full">
                            <Input
                                {...register('websiteUrl')}
                                placeholder="Digite aqui..."
                                className={`py-5 pr-8 ${errors.websiteUrl ? 'border-red-500 focus-visible:ring-red-400/50 focus-visible:border-red-500' : ''}`} />
                            <Button
                                type='submit'
                                size='icon-sm'
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:opacity-70 transition-all"
                            >
                                <SendHorizonal className="text-white" />
                            </Button>
                        </div>
                        {errors.websiteUrl && <span className="text-red-500 text-xs pl-1">{errors.websiteUrl.message}</span>}
                    </div>
                    <div>
                        <Button size='sm' variant='ghost' className="text-black/70" onClick={() => backPrevStep()}>
                            <ArrowLeft />
                            Voltar
                        </Button>
                    </div>

                </form>
            ) : (
                <div className="flex justify-end w-full pl-12 animate-in fade-in zoom-in-95">
                    <div className="bg-black text-gray-100 p-4 rounded-2xl rounded-br-none shadow-md max-w-[90%] text-sm leading-relaxed">
                        <p className="font-bold">{savedData.websiteUrl}</p>
                    </div>
                </div>
            )}
        </div>
    )
}