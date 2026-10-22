'use client';
import React from 'react';

export default function AddVehicleForm() {
  return (
    <div className="hidden bg-white rounded-xl shadow-lg p-6 mb-6 fade-in">
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        Cadastrar Novo Veículo
      </h3>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Marca
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Modelo
          </label>
          <input
            id="model"
            name="model"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="plate"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Placa
          </label>
          <input
            id="plate"
            name="plate"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Ano
          </label>
          <input
            id="year"
            name="year"
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Cor
          </label>
          <input
            id="color"
            name="color"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="rate"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Valor Diária R$
          </label>
          <input
            id="rate"
            name="rate"
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2 flex gap-3 justify-end pt-2">
          <button
            type="button"
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Cadastrar Veículo
          </button>
        </div>
      </form>
    </div>
  );
}
