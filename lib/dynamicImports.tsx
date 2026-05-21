import dynamic from "next/dynamic";
import React from "react";

// Heavy builder components - defer loading
export const BuilderContent = dynamic(
  () => import("@/app/admin/builder/builder-content").then(mod => ({ default: mod.BuilderContent })),
  { ssr: false, loading: () => <BuilderSkeleton /> }
);

export const PropertiesPanel = dynamic(
  () => import("@/app/components/builder/PropertiesPanel"),
  { loading: () => <PropertySkeleton /> }
);

export const Renderer = dynamic(
  () => import("@/app/components/builder/Renderer"),
  { loading: () => <RendererSkeleton /> }
);

// Note: For components with complex exports, keep standard imports in-page
// Dynamic imports work best with default exports
// Use manual code-splitting for QRBarcodeGenerator, ChezmissAide, GoldTester

// Skeletons
const BuilderSkeleton = () => (
  <div className="min-h-screen bg-black animate-pulse">
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="h-12 bg-[#B79A5B]/20 rounded w-1/3"></div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-[#B79A5B]/10 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

const PropertySkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-[#B79A5B]/20 rounded w-2/3"></div>
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 bg-[#B79A5B]/10 rounded"></div>
      ))}
    </div>
  </div>
);

const RendererSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-48 bg-[#B79A5B]/10 rounded"></div>
    ))}
  </div>
);

const QRSkeleton = () => (
  <div className="min-h-96 bg-[#B79A5B]/10 rounded animate-pulse"></div>
);
