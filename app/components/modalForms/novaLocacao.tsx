'use client';

import { UserPlus } from 'lucide-react';
import React from 'react';

export default function NovaLocacao() {
  return (
    <div className="flex flex-col gap-4">

      {/* Campo Cliente com botão + e tooltip */}
      <div>
        <label className="text-sm font-medium text-slate-700">
          Cliente
        </label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="Nome ou CPF"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <div className="relative group">
            <button
              type="button"
              onClick={() => {
                // Aqui você pode chamar a função de abrir cadastro de cliente
              }}
              className="p-2 border rounded-md bg-white hover:bg-indigo-600 hover:text-white transition"
            >
              <UserPlus size={18} />
            </button>
            <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
              Criar cliente
            </span>
          </div>
        </div>
      </div>

      {/* Campo Veículo */}
      <div>
        <label className="text-sm font-medium text-slate-700">
          Veículo
        </label>
        <input
          type="text"
          placeholder="Placa ou modelo"
          className="mt-1 w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Datas */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Data início
          </label>
          <input
            type="date"
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Data fim
          </label>
          <input
            type="date"
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* Valor da diária */}
      <div>
        <label className="text-sm font-medium text-slate-700">
          Valor da diária
        </label>
        <input
          type="number"
          className="mt-1 w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2 pt-4">
        <button className="px-4 py-2 rounded-md border">
          Cancelar
        </button>
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
          Salvar Locação
        </button>
      </div>

    </div>
  );
}
