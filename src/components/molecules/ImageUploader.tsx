"use client";

import { Edit2, Image as ImageIcon, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
    value: FileList | null | undefined;
    initialImageUrl?: string | null;
    onRemoveInitial?: () => void;
    onChange: (files: FileList | null) => void;
}

export function ImageUploader({
    value,
    onChange,
    onRemoveInitial,
    initialImageUrl,
}: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const file = files?.[0];

        if (file) {
            const MAX_FILE_SIZE = 10 * 1024 * 1024;
            const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

            if (file.size > MAX_FILE_SIZE) {
                toast.error("O tamanho máximo da imagem é 10MB");
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
                return;
            }

            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                toast.error("Formato de arquivo inválido");
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
                return;
            }

            onChange(files);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        onChange(null);

        if (onRemoveInitial) {
            onRemoveInitial();
        }

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleReplaceImage = () => {
        inputRef.current?.click();
    };

    useEffect(() => {
        if (value === null) {
            setPreview(null);
            return;
        }

        const newFile = value?.[0];
        if (newFile) {
            const fileUrl = URL.createObjectURL(newFile);
            setPreview(fileUrl);
            return () => URL.revokeObjectURL(fileUrl);
        }

        if (initialImageUrl) {
            setPreview(initialImageUrl);
        }
    }, [value, initialImageUrl]);

    return (
        <div className="w-full">
            {preview ? (
                <div className="relative group bg-white-div border border-gray-200 rounded-md">
                    <img
                        src={preview}
                        alt="Pré-visualização"
                        className="w-full h-48 object-contain rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                        <button
                            type="button"
                            onClick={handleReplaceImage}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black/40 rounded-md hover:bg-black/60"
                        >
                            <Edit2 className="h-4 w-4 text-primary" />
                        </button>
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-black/40 rounded-md hover:bg-black/60"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50"
                >
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                    <span>Selecione uma imagem <span className="text-sm">&#40;opcional&#41;</span></span>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
            />
        </div>
    );
}
