'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '@/store/useFormStore';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect } from 'react';

const contactSchema = z.object({
  name: z.string().min(3, "Por favor, digite seu nome completo."),
  email: z.email("Email inválido."),
  phone: z.string().min(15, "Telefone incompleto (DDD + Número)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const maskPhone = (value: string) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1');
};

export function StepContact({ isActive }: { isActive: boolean }) {
  const setFormData = useFormStore((state) => state.setFormData);
  const addNextStep = useFormStore((state) => state.addNextStep);
  const savedData = useFormStore((state) => state.formData);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      name: savedData.name,
      email: savedData.email,
      phone: savedData.phone,
    }
  });

  useEffect(() => {
    if (savedData) {
      reset();
    }
  }, [savedData, reset]);

  const onSubmit = (data: ContactFormData) => {
    setFormData(data);
    addNextStep('scope');
  };

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">


      <div className="flex gap-4 items-end">
        <Avatar>
          <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
        </Avatar>
        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-gray-800">
          Para começarmos, como podemos te chamar e qual seu melhor contato?
        </div>
      </div>

      {isActive ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 md:pl-12"
        >
          <div className="flex flex-col gap-1">
            <Input
              {...register('name')}
              placeholder='Nome completo'
              className={`py-5 ${errors.name ? 'border-red-500 focus-visible:ring-red-400/50 focus-visible:border-red-500' : ''}`}
            />
            {errors.name && <span className="text-red-500 text-xs pl-1">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              {...register('email')}
              type='email'
              placeholder='E-mail profissional'
              className={`py-5 ${errors.email ? 'border-red-500 focus-visible:ring-red-400/50 focus-visible:border-red-500' : ''}`} />
            {errors.email && <span className="text-red-500 text-xs pl-1">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              {...register('phone')}
              placeholder="(00) 00000-0000"
              onChange={(e) => {
                e.target.value = maskPhone(e.target.value);
                setValue('phone', e.target.value, { shouldValidate: true });
              }}
              className={`py-5 ${errors.phone ? 'border-red-500 focus-visible:ring-red-400/50 focus-visible:border-red-500' : ''}`} />
            {errors.phone && <span className="text-red-500 text-xs pl-1">{errors.phone.message}</span>}
          </div>

          <Button size='lg' type='submit'>Continuar conversa</Button>
        </form>
      ) : (
        <div className="flex justify-end w-full pl-12 animate-in fade-in zoom-in-95">
          <div className="bg-black text-gray-100 p-4 rounded-2xl rounded-br-none shadow-md max-w-[90%] text-sm leading-relaxed">
            <p className="font-bold border-b border-gray-600 pb-1 mb-1">{savedData.name}</p>
            <p>{savedData.email}</p>
            <p>{savedData.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}
