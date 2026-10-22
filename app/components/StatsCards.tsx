'use client';
import React from 'react';
import { Car, CheckCircle, KeyRound, DollarSign } from 'lucide-react';

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total de Veículos" value="0" icon={<Car size={22} />} />

      <StatCard
        title="Veículos Disponíveis"
        value="0"
        icon={<CheckCircle size={22} />}
        color="text-green-600"
      />

      <StatCard
        title="Locações Ativas"
        value="0"
        icon={<KeyRound size={22} />}
        color="text-orange-600"
      />

      <StatCard
        title="Receita do Mês"
        value="0"
        icon={<DollarSign size={22} />}
        color="text-purple-600"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export function StatCard({
  title,
  value,
  icon,
  color = 'text-slate-800',
}: StatCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 card-hover overflow-hidden">
      {/* SVG ou IMG atrás do conteúdo */}
      <img
        src="/zBe5j01.svg"
        alt="Fundo SVG"
        className="absolute top-7 left-40 w-[100px] h-[130px] opacity-10"
        style={{
          filter: "blur(0px) brightness(0.9)",
        }}
      />

      {/* Conteúdo do card */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>

        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
