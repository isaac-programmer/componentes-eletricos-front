'use client';

// Ainda não vamos conectar a lógica do formulário, apenas a estrutura JSX.

export function ComponenteForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
          Referência
        </label>
        <input
          type="text"
          id="reference"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
      {/* ... outros campos do formulário virão aqui ... */}
      <div className="flex justify-end gap-2 pt-4">
         <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancelar
         </button>
         <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
            Salvar Componente
         </button>
      </div>
    </form>
  )
}