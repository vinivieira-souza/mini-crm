import { LeadsData } from '@/store/useFormStore';

export const estimateCalc = (data: LeadsData): string => {
    let min = 1200;
    let max = 1800;

    if (data.projectScope === 'Empresarial'){
        min += 800;
        max += 1200;
    }

    if (data.projectObjective === 'Site dedicado'){
        min += 2300;
        max += 2700;
    } else if (data.projectObjective === 'E-commerce'){
        min += 3800;
        max += 6200;
    }

    const formatValue = (value: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    }).format(value);

    return `entre ${formatValue(min)} e ${formatValue(max)}`;
}