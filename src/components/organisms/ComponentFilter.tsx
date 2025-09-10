'use client';

import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Filter, X } from 'lucide-react';
import { Fragment } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FilterFormInputs = {
  name: boolean;
  nameValue: string;
  reference: boolean;
  referenceValue: string;
};

interface FiltroComponentesProps {
  onApplyFilters: (filters: Partial<FilterFormInputs>) => void;
}

export function FiltroComponentes({ onApplyFilters }: FiltroComponentesProps) {
  const { register, handleSubmit, watch, reset } = useForm<FilterFormInputs>();
  
  const watchedFields = watch();

  const onSubmit: SubmitHandler<FilterFormInputs> = (data) => {
    onApplyFilters(data);
  };

  const handleClearFilters = () => {
    reset();
    onApplyFilters({});
  };

  return (
    <Popover className="relative">
      <PopoverButton className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-primary border border-primary rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none">
        <Filter className="h-4 w-4" />
        <span>Filtro</span>
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 z-10 mt-2 w-screen max-w-xs transform px-4 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <form onSubmit={handleSubmit(onSubmit)} className="relative bg-white p-6 space-y-4">
              <h3 className="text-lg font-medium">Opções de Filtro</h3>
              
              <div className="space-y-4">
                {/* Filtro por Nome */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="name" {...register('name')} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                  <label htmlFor="name" className="text-sm">Nome</label>
                </div>
                {watchedFields.name && (
                  <input 
                    type="text" 
                    placeholder="Informe o nome" 
                    {...register('nameValue')}
                    className="w-full mt-1 pl-3 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                )}

                {/* Filtro por Referência */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="reference" {...register('reference')} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                  <label htmlFor="reference" className="text-sm">Referência</label>
                </div>
                {watchedFields.reference && (
                  <input 
                    type="text" 
                    placeholder="Informe a referência" 
                    {...register('referenceValue')}
                    className="w-full mt-1 pl-3 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                )}
                {/* Adicione outros checkboxes (Categoria, Origem, etc.) seguindo o mesmo padrão */}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={handleClearFilters} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Limpar
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                  Aplicar Filtros
                </button>
              </div>
            </form>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}