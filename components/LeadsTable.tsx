'use client';

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Frown } from "lucide-react";
import { Lead } from "@/generated/prisma/client";
import React from "react";

export function LeadsTable({ leads }: { leads: Lead[] }) {
    const [expandedRow, setExpandedRow] = useState<string[]>([]);

    const toggleRow = (id: string) => {
        setExpandedRow((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit', month: '2-digit'
        }).format(date);
    };

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="w-10"></TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Objetivo</TableHead>
                        <TableHead>Comportamento</TableHead>
                        <TableHead className="text-right">Data</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-32 relative overflow-hidden">
                                <Frown className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 text-gray-300 fill-gray-100 z-0" strokeWidth={1.5} />
                                <span className="relative z-10 text-black/70 font-medium text-lg">Nenhum lead captado ainda.</span>
                            </TableCell>
                        </TableRow>
                    ) : (
                        leads.map((lead) => (
                            <React.Fragment key={lead.id}>

                                <TableRow
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleRow(lead.id)}
                                >
                                    <TableCell>
                                        {expandedRow.includes(lead.id) ? (
                                            <ChevronDown className="h-4 w-4 text-gray-500 rotate-180 transition-all duration-300" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-gray-500 transition-all duration-300" />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900">
                                        {lead.name}
                                    </TableCell>
                                    <TableCell className="text-gray-700">
                                        {lead.objective}
                                    </TableCell>
                                    <TableCell>
                                        {lead.leadBehavior === 'De acordo' && <Badge className="bg-emerald-500">Potencial</Badge>}
                                        {lead.leadBehavior === 'Avaliar melhor' && <Badge variant="secondary" className="bg-amber-100 text-amber-800">Sobreaviso</Badge>}
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-gray-500">
                                        {formatDate(lead.createdAt)}
                                    </TableCell>
                                </TableRow>

                                {expandedRow.includes(lead.id) && (
                                    <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                                        <TableCell colSpan={5} className="p-0">
                                            <div className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Empresa / Escopo</h4>
                                                        <p className="text-sm font-medium text-gray-900">{lead.companyName || 'Pessoa Física'} ({lead.projectScope})</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Contato</h4>
                                                        <p className="text-sm font-medium text-gray-900">{lead.phone}</p>
                                                        <p className="text-sm text-gray-500">{lead.email}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Site Atual</h4>
                                                        <p className="text-sm font-medium text-gray-900">{lead.hasSite}</p>
                                                        {lead.siteUrl && <a href={lead.siteUrl} target="_blank" className="text-sm text-blue-600 hover:underline">{lead.siteUrl}</a>}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Estimativa Passada</h4>
                                                        <p className="text-sm font-medium text-gray-900">{lead.estimatedValue}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}