"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { QrCode, X, Download, Plus, Copy, Check } from "lucide-react";

interface QRGeneratorItem {
  id: string;
  label: string;
  value: string;
  type: "product" | "custom";
}

export function QRCodeAdvanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"page" | "products" | "custom">("page");
  const [selectedItem, setSelectedItem] = useState<QRGeneratorItem | null>(null);
  const [customValue, setCustomValue] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "https://chezmiss.netlify.app";

  // Produits pré-définis
  const products: QRGeneratorItem[] = [
    {
      id: "whipped-cream",
      label: "WHIPPED CREAM CLEANSER",
      value: "https://chezmiss.netlify.app/boutique?product=whipped-cream-cleanser",
      type: "product",
    },
    {
      id: "lash-setting",
      label: "LASH SETTING SPRAY",
      value: "https://chezmiss.netlify.app/boutique?product=lash-setting-spray",
      type: "product",
    },
    {
      id: "lash-primer",
      label: "LASH PRIMER",
      value: "https://chezmiss.netlify.app/boutique?product=lash-primer",
      type: "product",
    },
    {
      id: "premium-bonder",
      label: "PREMIUM BONDER",
      value: "https://chezmiss.netlify.app/boutique?product=premium-bonder",
      type: "product",
    },
    {
      id: "cream-remover",
      label: "CREAM REMOVER",
      value: "https://chezmiss.netlify.app/boutique?product=cream-remover",
      type: "product",
    },
  ];

  // Générer QR code
  const generateQR = async (value: string) => {
    if (!canvasRef.current) return;
    try {
      await QRCode.toCanvas(canvasRef.current, value, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
    } catch (err) {
      console.error("QR Code generation error:", err);
    }
  };

  // Initialiser QR au changement
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "page") {
      generateQR(pageUrl);
    } else if (mode === "products" && selectedItem) {
      generateQR(selectedItem.value);
    } else if (mode === "custom" && customValue) {
      generateQR(customValue);
    }
  }, [isOpen, mode, selectedItem, customValue, pageUrl]);

  const handleDownload = (filename: string) => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.png`;
      link.click();
    }
  };

  const handleCopyValue = () => {
    let valueToCopy = pageUrl;
    if (mode === "products" && selectedItem) {
      valueToCopy = selectedItem.value;
    } else if (mode === "custom") {
      valueToCopy = customValue;
    }

    navigator.clipboard.writeText(valueToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getDisplayValue = (): string => {
    if (mode === "page") return pageUrl;
    if (mode === "products" && selectedItem) return selectedItem.value;
    if (mode === "custom") return customValue;
    return "";
  };

  const getModalTitle = (): string => {
    if (mode === "page") return "Code QR — Page Actuelle";
    if (mode === "products") return "Code QR — Produit";
    if (mode === "custom") return "Code QR — Personnalisé";
    return "Code QR";
  };

  return (
    <>
      {/* QR Code Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#B79A5B] text-black shadow-lg hover:bg-[#B79A5B]/90 active:scale-95 transition-all duration-200 flex items-center justify-center group"
        aria-label="Générateur de code QR"
        title="Générer des codes QR"
      >
        <QrCode size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* QR Code Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d0810] rounded-2xl border border-[#B79A5B]/30 shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B79A5B]/20 to-[#B79A5B]/10 border-b border-[#B79A5B]/20 px-6 py-4 sticky top-0 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#B79A5B]">{getModalTitle()}</h2>
                <p className="text-xs text-[#f0c9e1]/60 mt-1">Scannez pour accéder</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[#B79A5B]/20 rounded-lg transition text-[#f0c9e1]/70 hover:text-[#B79A5B]"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="border-b border-[#B79A5B]/20 px-6 py-3 flex gap-2 flex-wrap">
              <button
                onClick={() => setMode("page")}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  mode === "page"
                    ? "bg-[#B79A5B] text-black"
                    : "bg-[#B79A5B]/10 text-[#f0c9e1]/70 hover:bg-[#B79A5B]/20"
                }`}
              >
                Page Actuelle
              </button>
              <button
                onClick={() => setMode("products")}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  mode === "products"
                    ? "bg-[#B79A5B] text-black"
                    : "bg-[#B79A5B]/10 text-[#f0c9e1]/70 hover:bg-[#B79A5B]/20"
                }`}
              >
                Produits
              </button>
              <button
                onClick={() => setMode("custom")}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  mode === "custom"
                    ? "bg-[#B79A5B] text-black"
                    : "bg-[#B79A5B]/10 text-[#f0c9e1]/70 hover:bg-[#B79A5B]/20"
                }`}
              >
                Personnalisé
              </button>
            </div>

            {/* Content */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: QR Code */}
              <div className="lg:col-span-1 flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#B79A5B]/20">
                  <canvas ref={canvasRef} className="w-auto h-auto" />
                </div>
              </div>

              {/* Right: Controls */}
              <div className="lg:col-span-2 space-y-4">
                {/* Mode: Page Actuelle */}
                {mode === "page" && (
                  <div className="space-y-3">
                    <div className="bg-[#080508]/50 border border-[#B79A5B]/20 rounded-lg p-3">
                      <p className="text-xs text-[#f0c9e1]/50 mb-1">URL:</p>
                      <p className="text-xs text-[#f0c9e1]/70 font-mono break-all">{pageUrl}</p>
                    </div>
                  </div>
                )}

                {/* Mode: Produits */}
                {mode === "products" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedItem(product)}
                          className={`p-3 rounded-lg text-left text-sm transition ${
                            selectedItem?.id === product.id
                              ? "bg-[#B79A5B]/20 border border-[#B79A5B] text-[#f0c9e1]"
                              : "bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1]/70 hover:bg-[#B79A5B]/10"
                          }`}
                        >
                          {product.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mode: Personnalisé */}
                {mode === "custom" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-[#f0c9e1]/50 block mb-2">
                        Entrez une URL ou du texte hexadécimal
                      </label>
                      <textarea
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder="https://... ou #B79A5B ou n'importe quel texte"
                        className="w-full bg-[#080508]/50 border border-[#B79A5B]/20 rounded px-3 py-2 text-sm text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50"
                        rows={4}
                      />
                    </div>
                    {customValue && (
                      <div className="bg-[#080508]/50 border border-[#B79A5B]/20 rounded-lg p-3">
                        <p className="text-xs text-[#f0c9e1]/50 mb-1">Contenu:</p>
                        <p className="text-xs text-[#f0c9e1]/70 font-mono break-all">{customValue}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Display Value */}
                {(mode === "products" && selectedItem) || (mode === "custom" && customValue) || mode === "page" ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleCopyValue}
                      className="w-full flex items-center justify-center gap-2 bg-[#B79A5B]/20 text-[#B79A5B] py-2 rounded-lg text-sm hover:bg-[#B79A5B]/30 transition"
                    >
                      {copied ? (
                        <>
                          <Check size={16} /> Copié !
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copier le contenu
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        handleDownload(
                          mode === "products" && selectedItem
                            ? selectedItem.id
                            : mode === "custom"
                              ? "custom-qr"
                              : "page-qr"
                        )
                      }
                      className="w-full flex items-center justify-center gap-2 bg-[#B79A5B] text-black py-2 rounded-lg font-semibold hover:bg-[#B79A5B]/90 active:scale-95 transition"
                    >
                      <Download size={16} /> Télécharger
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#f0c9e1]/50 text-sm">
                    {mode === "products" && "Sélectionnez un produit"}
                    {mode === "custom" && "Entrez une valeur"}
                  </div>
                )}

                {/* Info */}
                <div className="bg-[#B79A5B]/10 border border-[#B79A5B]/20 rounded-lg p-3 text-xs text-[#f0c9e1]/70">
                  <p>💡 Le code QR peut contenir:</p>
                  <ul className="mt-2 space-y-1 ml-3">
                    <li>• URLs (pages web)</li>
                    <li>• Codes hexadécimaux (#B79A5B)</li>
                    <li>• Texte libre</li>
                    <li>• N'importe quelle donnée</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#080508]/50 border-t border-[#B79A5B]/20 px-6 py-3 text-center text-xs text-[#f0c9e1]/40">
              CHEZ MISS — QR Code Generator
            </div>
          </div>
        </div>
      )}
    </>
  );
}
