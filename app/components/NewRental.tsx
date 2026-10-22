'use client';

import { PlusCircle } from 'lucide-react';

export default function NewRentalView() {
  return (
    <div id="newRental-view" className="view min-h-screen">
      
      {/* Header Top */}
      <header className="mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <PlusCircle className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Nova locação
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Informe os dados do cliente e do veículo para continuar
        </p>
      </header>


      {/* Form Container */}
      <div className="mx-auto">
        Teste
      </div>
    </div>
  );
}
