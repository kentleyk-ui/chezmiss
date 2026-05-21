import { Suspense } from "react";
import { BuilderContent } from "./builder-content";

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-[#f0c9e1]">Chargement...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
