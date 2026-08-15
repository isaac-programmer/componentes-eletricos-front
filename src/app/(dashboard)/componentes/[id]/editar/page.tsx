"use client";

import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";
import { ComponentStockByLaboratoryTable } from "@/components/organisms/stock/ComponentStockByLaboratoryTable";
import { ComponentForm } from "@/components/organisms/component/ComponentForm";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { useGetComponentById } from "@/useCases/component/useGetComponentById";
import { useUpdateComponent } from "@/useCases/component/useUpdateComponent";
import { useGetComponentStockByLaboratory } from "@/useCases/stock/useGetComponentStockByLaboratory";
import { CircuitBoard } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal } from "@/components/molecules/Modal";
import { useStockTransactions } from "@/useCases/stock/useStockTransactions";
import { AddStockForm } from "@/components/organisms/stock/AddStockForm";
import { ConsumeStockForm } from "@/components/organisms/stock/ConsumeStockForm";
import { AddStockFormData, ConsumeStockFormData, TransferStockFormData } from "@/domain/schemas/transactionSchema";
import { TransferStockForm } from "@/components/organisms/stock/TransferStockForm";


export default function EditComponentPage() {
  const params = useParams();

  const { setBreadcrumbs } = useBreadcrumbs();

  const id = params.id as string;

  const { data: component, isLoading, isError } = useGetComponentById(id);
  const { data: componentStockByLaboratory, isLoading: isLoadingComponentStockByLaboratory } = useGetComponentStockByLaboratory(id);

  const { mutateAsync: updateComponent, isPending } = useUpdateComponent();
  const { addStock, consumeStock, transferStock } = useStockTransactions(id);

  const [addModalData, setAddModalData] = useState({ isOpen: false, laboratoryId: "" });
  const [consumeModalData, setConsumeModalData] = useState({ isOpen: false, laboratoryId: "" });
  const [transferModalData, setTransferModalData] = useState({ isOpen: false, laboratoryId: "" });

  const [imageRemoved, setImageRemoved] = useState(false);

  const buildPayload = (
    data: ComponentFormData,
    dirtyFields: FieldNamesMarkedBoolean<ComponentFormData>
  ): Partial<ComponentFormData> => {
    return Object.keys(dirtyFields).reduce<Partial<ComponentFormData>>(
      (acc, key) => {
        if (key in data) {
          acc[key as keyof ComponentFormData] = data[key as keyof ComponentFormData];
        }
        return acc;
      },
      {}
    );
  };

  const handleOpenAddModal = (laboratoryId: string) => setAddModalData({ isOpen: true, laboratoryId: laboratoryId });
  const handleOpenConsumeModal = (laboratoryId: string) => setConsumeModalData({ isOpen: true, laboratoryId: laboratoryId });
  const handleOpenTransferModal = (laboratoryId: string) => setTransferModalData({ isOpen: true, laboratoryId: laboratoryId });

  const handleCloseAddModal = () => setAddModalData({ isOpen: false, laboratoryId: '' });
  const handleCloseConsumeModal = () => setConsumeModalData({ isOpen: false, laboratoryId: '' });
  const handleCloseTransferModal = () => setTransferModalData({ isOpen: false, laboratoryId: '' });

  const handleAddStock = async (data: AddStockFormData) => {
    try {
      await addStock.mutateAsync({
        componentId: id,
        laboratoryDestinationId: addModalData.laboratoryId,
        quantity: data.quantity,
      });

      toast.success("Quantidade de componente adicionada com sucesso!");

      handleCloseAddModal();
    } catch (error) {
      console.error("Erro ao adicionar quantidade de componente:", error);
    }
  };

  const handleConsumeStock = async (data: ConsumeStockFormData) => {
    try {
      await consumeStock.mutateAsync({
        componentId: id,
        laboratoryOriginId: consumeModalData.laboratoryId,
        quantity: data.quantity,
        motive: data.motive,
      });

      toast.success("Quantidade de componente consumida com sucesso!");

      handleCloseConsumeModal();
    } catch (error) {
      console.error("Erro ao consumir quantidade de componente:", error);
    }
  };

  const handleTransferStock = async (data: TransferStockFormData) => {
    try {
      await transferStock.mutateAsync({
        componentId: id,
        laboratoryOriginId: transferModalData.laboratoryId,
        laboratoryDestinationId: data.laboratoryDestinationId,
        quantity: data.quantity,
      });

      toast.success("Quantidade de componente transferida com sucesso!");

      handleCloseTransferModal();
    } catch (error) {
      console.error("Erro ao transferir quantidade de componente:", error);
    }
  };

  const handleUpdateComponent = async (
    data: ComponentFormData,
    dirtyFields: FieldNamesMarkedBoolean<ComponentFormData>
  ) => {
    const payload: Partial<ComponentFormData> = buildPayload(data, dirtyFields);

    if (imageRemoved && !payload.image) {
      payload.imageUrl = null;
    }

    if (Object.keys(payload).length === 0) {
      toast.error("Nenhuma alteração foi realizada");
      return;
    }

    try {
      await updateComponent({ id, data: payload });
      toast.success("Componente atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar componente:", error);
    }
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: CircuitBoard,
      items: [
        { href: "/componentes", label: "Componentes" },
        { href: `/componentes/${id}/editar`, label: `${component?.name}` },
      ]
    });
  }, [setBreadcrumbs, id, component?.name]);

  useEffect(() => {
    if (!isLoading) {
      const hash = window.location.hash;

      if (hash === "#estoque") {
        setTimeout(() => {
          const element = document.getElementById("estoque");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSpinner text="Carregando componente..." />;
  }

  if (isError || !component) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Componente não encontrado
      </p>
    );
  }

  return (
    <div className="flex flex-col max-sm:items-center gap-6">
      <h1 className="text-2xl font-semibold text-paragraph">
        Editar Componente
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <ComponentForm
          initialData={component}
          onSubmit={handleUpdateComponent}
          isSubmitting={isPending}
          onRemoveImage={() => setImageRemoved(true)}
        />
      </div>

      <div id="estoque" className="w-full bg-white rounded-lg shadow-sm border border-border p-6 max-sm:max-w-[85vw] max-sm:overflow-x-auto">
        <h2 className="text-lg font-semibold text-paragraph mb-4 max-sm:text-center">Quantidade por laboratório</h2>
        <div className="w-full max-sm:max-w-[85vw] max-sm:overflow-x-auto">
          <ComponentStockByLaboratoryTable
            data={componentStockByLaboratory}
            isLoading={isLoadingComponentStockByLaboratory}
            onAddStock={handleOpenAddModal}
            onConsumeStock={handleOpenConsumeModal}
            onTransferStock={handleOpenTransferModal}
          />
        </div>
      </div>

      <Modal
        isOpen={addModalData.isOpen}
        title="Adicionar Quantidade"
        onClose={handleCloseAddModal}
      >
        <AddStockForm
          onSubmit={handleAddStock}
          onCancel={handleCloseAddModal}
          isSubmitting={addStock.isPending}
        />
      </Modal>

      <Modal
        isOpen={consumeModalData.isOpen}
        title="Consumir Quantidade"
        onClose={handleCloseConsumeModal}
      >
        <ConsumeStockForm
          onSubmit={handleConsumeStock}
          onCancel={handleCloseConsumeModal}
          isSubmitting={consumeStock.isPending}
        />
      </Modal>

      <Modal
        isOpen={transferModalData.isOpen}
        title="Transferir Quantidade"
        onClose={handleCloseTransferModal}
      >
        <TransferStockForm
          onSubmit={handleTransferStock}
          onCancel={handleCloseTransferModal}
          isSubmitting={transferStock.isPending}
        />
      </Modal>
    </div>
  );
}