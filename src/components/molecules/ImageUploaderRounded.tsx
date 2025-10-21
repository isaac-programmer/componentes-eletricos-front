// src/components/molecules/ImageUploaderRounded.tsx

"use client";

import { Edit2, Image as ImageIcon, Trash2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

interface ImageUploaderRoundedProps {
  value: FileList | null | undefined;
  initialImageUrl?: string | null;
  onRemoveInitial?: () => void;
  onChange: (files: FileList | null) => void;
  label?: string;
}

export function ImageUploaderRounded({
  value,
  onChange,
  onRemoveInitial,
  initialImageUrl,
  label = "Selecione uma imagem",
}: ImageUploaderRoundedProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files?.[0];

    if (file) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
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
  }, [onChange]);

  const handleRemoveImage = useCallback(() => {
    setPreview(null);
    onChange(null);
    if (onRemoveInitial) onRemoveInitial();
    if (inputRef.current) inputRef.current.value = "";
  }, [onChange, onRemoveInitial]);

  const handleReplaceImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

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
    } else {
      setPreview(null);
    }
  }, [value, initialImageUrl]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {preview ? (
        <div className="relative group w-32 h-32">
          <img
            src={preview}
            alt="Pré-visualização"
            className="w-full h-full object-cover rounded-full border border-gray-200"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
            <button
              type="button"
              onClick={handleReplaceImage}
              className="p-2 text-sm font-medium text-white bg-black/40 rounded-full hover:bg-black/60"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="p-2 text-sm font-medium text-red-400 bg-black/40 rounded-full hover:bg-black/60"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-full text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-primary"
        >
          <ImageIcon className="h-8 w-8 text-gray-400 mb-1" />
          <span className="text-xs text-center px-2">{label}</span>
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