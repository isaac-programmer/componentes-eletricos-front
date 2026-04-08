import { Modal } from "@/components/molecules/Modal";
import { Laboratory } from "@/domain/entities/laboratory";
import { LaboratoryFormData } from "@/domain/repositories/LaboratoryRepository";
import { useCreateLaboratory } from "@/useCases/laboratory/useCreateLaboratory";
import { useUpdateLaboratory } from "@/useCases/laboratory/useUpdateLaboratory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const laboratorySchema = z.object({
  name: z.string().min(1, "O nome do laboratório é obrigatório"),
});

interface LaboratoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  laboratory?: Laboratory | null;
}

export function LaboratoryFormModal({ isOpen, onClose, laboratory }: LaboratoryFormModalProps) {
  const isEditing = !!laboratory;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LaboratoryFormData>({
    resolver: zodResolver(laboratorySchema),
  });

  const { mutate: createLaboratory, isPending: isCreating } = useCreateLaboratory();
  const { mutate: updateLaboratory, isPending: isUpdating } = useUpdateLaboratory();

  useEffect(() => {
    if (isOpen) {
      if (laboratory) {
        reset({ name: laboratory.name });
      } else {
        reset({ name: "" });
      }
    }
  }, [isOpen, laboratory, reset]);

  const onSubmit = (data: LaboratoryFormData) => {
    if (isEditing && laboratory) {
      updateLaboratory({ id: laboratory.id, data }, {
        onSuccess: () => onClose(),
      });
    } else {
      createLaboratory(data, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Laboratório" : "Adicionar Laboratório"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
        <div>
          <label htmlFor="name">Nome*</label>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Informe o nome do laboratório"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="px-6 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {isEditing ? "Atualizar" : "Adicionar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
