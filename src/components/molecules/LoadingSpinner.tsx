import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export function LoadingSpinner({ size = 8, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8">
      <Loader2 className={`h-${size} w-${size} animate-spin text-primary`} />
      {text && <p className="text-md text-paragraph">{text}</p>}
    </div>
  );
}