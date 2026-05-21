"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { QrCode, Barcode, Shuffle, Download, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface GeneratorItem {
  id: string;
  label: string;
  value: string;
  type: "product" | "custom" | "random";
}

export function QRBarcodeFuturistic() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<"qr" | "barcode">("qr");
  const [selectedItem, setSelectedItem] = useState<GeneratorItem | null>(null);
  const [customValue, setCustomValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState<string | null>(null);
  const [isRandom, setIsRandom] = useState(false);

  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const barcodeCanvasRef = useRef<HTMLCanvasElement>(null);

  const products: GeneratorItem[] = [
    {
      id: "whipped-cream",
      label: "WHIPPED CREAM",
      value: "https://www.chezmiss.ca/boutique?product=whipped-cream-cleanser",
      type: "product",
    },
    {
      id: "lash-setting",
      label: "LASH SETTING",
      value: "https://www.chezmiss.ca/boutique?product=lash-setting-spray",
      type: "product",
    },
    {
      id: "lash-primer",
      label: "LASH PRIMER",
      value: "https://www.chezmiss.ca/boutique?product=lash-primer",
      type: "product",
    },
    {
      id: "premium-bonder",
      label: "PREMIUM BONDER",
      value: "https://www.chezmiss.ca/boutique?product=premium-bonder",
      type: "product",
    },
    {
      id: "cream-remover",
      label: "CREAM REMOVER",
      value: "https://www.chezmiss.ca/boutique?product=cream-remover",
      type: "product",
    },
  ];

  const generateRandomCode = () => {
    setIsRandom(true);
    const randomId = "CHZ" + Math.random().toString(36).substring(2, 11).toUpperCase();
    const randomItem: GeneratorItem = {
      id: randomId,
      label: `RANDOM CODE`,
      value: randomId,
      type: "random",
    };
    setSelectedItem(randomItem);
    setCustomValue("");
  };

  const generateQRCode = async (value: string) => {
    if (!qrCanvasRef.current) return;
    try {
      await QRCode.toCanvas(qrCanvasRef.current, value, {
        width: 300,
        margin: 2,
        color: {
          dark: "#B79A5B",
          light: "#080508",
        },
      });
      setGenerated(value);
    } catch (err) {
      console.error("QR Code error:", err);
    }
  };

  const generateBarcode = (value: string) => {
    if (!barcodeCanvasRef.current) return;
    try {
      JsBarcode(barcodeCanvasRef.current, value, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        fontOptions: "bold",
        lineColor: "#B79A5B",
        background: "#080508",
        margin: 10,
      });
      setGenerated(value);
    } catch (err) {
      console.error("Barcode error:", err);
    }
  };

  useEffect(() => {
    if (!isExpanded || !generated) return;

    if (mode === "qr") {
      generateQRCode(generated);
    } else {
      generateBarcode(generated);
    }
  }, [mode, isExpanded, generated]);

  const handleGenerate = () => {
    const value = customValue || selectedItem?.value;
    if (value) {
      if (mode === "qr") {
        generateQRCode(value);
      } else {
        generateBarcode(value);
      }
    }
  };

  const copyToClipboard = () => {
    if (generated) {
      navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    const canvas = mode === "qr" ? qrCanvasRef.current : barcodeCanvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${mode}-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="fixed bottom-6 right-1/4 transform translate-x-1/2 z-40 pointer-events-none sm:right-auto sm:left-1/2 sm:transform sm:-translate-x-1/2">
      <motion.div
        initial={false}
        animate={{ width: isExpanded ? "auto" : "auto" }}
        className="pointer-events-auto"
      >
        {/* Expanded Panel */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: -420 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-96 rounded-2xl border border-[#B79A5B]/50 bg-gradient-to-br from-[#0d0810] via-[#1a0a12] to-[#080508] p-6 shadow-2xl backdrop-blur-xl"
            style={{
              boxShadow: "0 0 40px rgba(183, 154, 91, 0.3), inset 0 0 20px rgba(183, 154, 91, 0.05)",
            }}
          >
            {/* Header with Mode Switch */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#B79A5B]">
                {mode === "qr" ? "QR Code" : "Code-barres"} Generator
              </h3>

              {/* Mode Switch */}
              <div className="flex gap-1 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 p-1">
                <button
                  onClick={() => setMode("qr")}
                  className={`px-3 py-1 rounded transition-all duration-300 text-xs font-semibold ${
                    mode === "qr"
                      ? "bg-[#B79A5B] text-black shadow-lg"
                      : "text-[#B79A5B]/70 hover:text-[#B79A5B]"
                  }`}
                >
                  <QrCode size={14} className="inline mr-1" /> QR
                </button>
                <button
                  onClick={() => setMode("barcode")}
                  className={`px-3 py-1 rounded transition-all duration-300 text-xs font-semibold ${
                    mode === "barcode"
                      ? "bg-[#B79A5B] text-black shadow-lg"
                      : "text-[#B79A5B]/70 hover:text-[#B79A5B]"
                  }`}
                >
                  <Barcode size={14} className="inline mr-1" /> CODE
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-[#B79A5B]/20 pb-3">
              {["Page", "Produits", "Personnalisé", "Aléatoire"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                    tab === "Aléatoire" && isRandom
                      ? "bg-[#B79A5B]/20 text-[#B79A5B] border border-[#B79A5B]"
                      : tab === "Produits" && selectedItem?.type === "product"
                      ? "bg-[#B79A5B]/20 text-[#B79A5B] border border-[#B79A5B]"
                      : tab === "Personnalisé" && customValue
                      ? "bg-[#B79A5B]/20 text-[#B79A5B] border border-[#B79A5B]"
                      : "bg-[#080508]/50 text-[#f0c9e1]/60 border border-[#B79A5B]/20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {!isRandom && !customValue && (
              <div className="mb-6 grid gap-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedItem(product);
                      setIsRandom(false);
                      setCustomValue("");
                    }}
                    className={`p-2 rounded text-sm transition-all text-left ${
                      selectedItem?.id === product.id
                        ? "bg-[#B79A5B]/20 border border-[#B79A5B] text-[#f0c9e1]"
                        : "bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1]/70 hover:border-[#B79A5B]/50"
                    }`}
                  >
                    {product.label}
                  </button>
                ))}
              </div>
            )}

            {/* Custom Input */}
            <textarea
              value={customValue}
              onChange={(e) => {
                setCustomValue(e.target.value);
                setIsRandom(false);
              }}
              placeholder="Entrez une URL, du texte, ou un code personnalisé..."
              className="mb-4 w-full rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 p-3 text-sm text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:border-[#B79A5B]/50 focus:outline-none"
              rows={3}
            />

            {/* Generated Code Display */}
            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-col items-center gap-4 rounded-lg bg-[#080508]/80 border border-[#B79A5B]/30 p-4"
              >
                {mode === "qr" ? (
                  <canvas ref={qrCanvasRef} className="w-48 h-48" />
                ) : (
                  <canvas ref={barcodeCanvasRef} />
                )}

                <div className="w-full space-y-2">
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#B79A5B]/20 text-[#B79A5B] hover:bg-[#B79A5B]/30 transition-all text-sm font-medium"
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copié!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copier
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadCode}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#B79A5B] text-black hover:bg-[#B79A5B]/90 transition-all text-sm font-bold"
                  >
                    <Download size={16} /> Télécharger PNG
                  </button>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGenerate}
                className="px-4 py-2 rounded-lg bg-[#B79A5B] text-black font-bold hover:bg-[#B79A5B]/90 transition-all"
              >
                Générer
              </button>
              <button
                onClick={generateRandomCode}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B79A5B]/50 to-[#f0c9e1]/20 border border-[#B79A5B]/50 text-[#B79A5B] font-bold hover:from-[#B79A5B]/70 hover:to-[#f0c9e1]/30 transition-all flex items-center justify-center gap-2"
              >
                <Shuffle size={16} /> Aléatoire
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative group"
        >
          {/* Glow Background */}
          <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-[#B79A5B]/40 to-[#f0c9e1]/20 group-hover:from-[#B79A5B]/60 group-hover:to-[#f0c9e1]/40 transition-all duration-300" />

          {/* Button Container */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-2xl">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#0d0810] to-[#080508]" />

            {/* Animated Lines */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, rgba(183,154,91,0.3) 0%, transparent 50%, rgba(240,201,225,0.2) 100%)",
                backgroundSize: "200% 200%",
              }}
            />

            {/* Holographic Lines */}
            <div className="absolute inset-0 grid grid-cols-2 gap-0">
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="border-r border-[#B79A5B]/40"
              />
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                className="border-l border-[#f0c9e1]/30"
              />
            </div>

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center text-[#B79A5B] z-10">
              <motion.div
                animate={{
                  rotate: isExpanded ? 180 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                <QrCode size={isExpanded ? 32 : 28} className="drop-shadow-lg" />
              </motion.div>
            </div>

            {/* Pulsing Ring */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(183,154,91,0.4)",
                  "0 0 0 15px rgba(183,154,91,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-full bg-[#B79A5B]/0 group-hover:bg-[#B79A5B]/10 transition-all duration-300" />
          </div>
        </button>
      </motion.div>
    </div>
  );
}
