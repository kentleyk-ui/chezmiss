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

export function QRBarcodeGenerator() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<"qr" | "barcode">("qr");
  const [selectedItem, setSelectedItem] = useState<GeneratorItem | null>(null);
  const [customValue, setCustomValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState<string | null>(null);
  const [isRandom, setIsRandom] = useState(false);

  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const barcodeCanvasRef = useRef<HTMLCanvasElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);

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

  useEffect(() => {
    const styleId = "qr-generator-shader-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes qr-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(183,154,91,0.6), 0 0 40px rgba(183,154,91,0.3); }
          50% { box-shadow: 0 0 40px rgba(183,154,91,0.9), 0 0 80px rgba(183,154,91,0.5); }
        }
        .qr-shader-container canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100% !important;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import("@paper-design/shaders");

        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 5,
              u_softness: 0.18,
              u_shiftRed: 0.45,
              u_shiftBlue: 0.15,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 35,
              u_scale: 10,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.7
          );
        }
      } catch (error) {
        console.error("Shader loading error:", error);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
      }
    };
  }, []);

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
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <motion.div className="pointer-events-auto">
        {/* Expanded Panel */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: -380 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-4 w-96 rounded-3xl border border-[#B79A5B]/60 bg-gradient-to-br from-[#0d0810] via-[#1a0a12] to-[#080508] p-8 shadow-2xl backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 0 60px rgba(183, 154, 91, 0.4), 0 0 100px rgba(183, 154, 91, 0.2), inset 0 0 40px rgba(183, 154, 91, 0.1)",
            }}
          >
            {/* Header with Mode Switch */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#B79A5B]">
                {mode === "qr" ? "QR Code" : "Code-barres"} Generator
              </h3>

              {/* Mode Switch */}
              <div className="flex gap-1 rounded-lg bg-[#080508]/80 border border-[#B79A5B]/30 p-1 backdrop-blur-sm">
                <button
                  onClick={() => setMode("qr")}
                  className={`px-3 py-1 rounded transition-all duration-300 text-xs font-bold ${
                    mode === "qr"
                      ? "bg-[#B79A5B] text-black shadow-lg"
                      : "text-[#B79A5B]/70 hover:text-[#B79A5B]"
                  }`}
                >
                  <QrCode size={14} className="inline mr-1" /> QR
                </button>
                <button
                  onClick={() => setMode("barcode")}
                  className={`px-3 py-1 rounded transition-all duration-300 text-xs font-bold ${
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
              <div className="mb-6 grid gap-2 max-h-40 overflow-y-auto">
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

            {/* Generated Code Display - Glass Morphism with Liquid Metal Border */}
            {generated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-6 relative rounded-2xl overflow-hidden"
              >
                {/* Liquid Metal Border Glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                  background: `linear-gradient(135deg, rgba(183,154,91,0.3) 0%, rgba(240,201,225,0.1) 50%, rgba(183,154,91,0.2) 100%)`,
                  opacity: 0.6,
                  filter: "blur(1px)",
                }} />

                {/* Main Glass Container */}
                <div className="relative p-6 backdrop-blur-2xl bg-gradient-to-br from-[#B79A5B]/10 via-[#080508]/50 to-[#1a0a12]/30 border-2 border-[#B79A5B]/40 rounded-2xl shadow-2xl"
                  style={{
                    boxShadow: "0 8px 32px rgba(183, 154, 91, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Top shine effect */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B79A5B]/40 to-transparent rounded-t-2xl" />

                  {/* Code Display Area */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Code Canvas Container */}
                    <div className="relative p-4 rounded-xl bg-gradient-to-b from-[#0d0810]/80 to-[#080508]/95 border border-[#B79A5B]/20">
                      {/* Inner glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#B79A5B]/5 to-transparent pointer-events-none" />

                      {mode === "qr" ? (
                        <canvas ref={qrCanvasRef} className="w-48 h-48 relative z-10" />
                      ) : (
                        <canvas ref={barcodeCanvasRef} className="relative z-10" />
                      )}
                    </div>

                    {/* Code Value Info */}
                    <div className="w-full">
                      <p className="text-xs text-[#B79A5B]/60 mb-2 font-semibold tracking-wider uppercase">
                        {mode === "qr" ? "Contenu QR" : "Contenu Code-barres"}
                      </p>
                      <div className="px-3 py-2 rounded-lg bg-[#080508]/60 border border-[#B79A5B]/20 backdrop-blur-sm">
                        <p className="text-xs text-[#f0c9e1]/70 font-mono break-all line-clamp-2 hover:line-clamp-none transition-all">
                          {generated.length > 50 ? `${generated.substring(0, 50)}...` : generated}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#B79A5B]/20 hover:bg-[#B79A5B]/30 border border-[#B79A5B]/30 text-[#B79A5B] transition-all text-xs font-semibold group"
                      >
                        {copied ? (
                          <>
                            <Check size={14} className="group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} className="group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Copier</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadCode}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#B79A5B] hover:bg-[#B79A5B]/90 border border-[#B79A5B]/50 text-black transition-all text-xs font-bold group"
                      >
                        <Download size={14} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">PNG</span>
                      </button>
                    </div>
                  </div>
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

        {/* Main Floating Button with Liquid Metal Shader */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative group"
          onMouseEnter={() => {
            if (shaderMount.current?.setSpeed) {
              shaderMount.current.setSpeed(1.2);
            }
          }}
          onMouseLeave={() => {
            if (shaderMount.current?.setSpeed) {
              shaderMount.current.setSpeed(0.8);
            }
          }}
        >
          {/* Button Container - 48x48 (half of 96x96) */}
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-xl border border-[#B79A5B]/40">
            {/* Shader Background */}
            <div
              ref={shaderRef}
              className="qr-shader-container absolute inset-0 w-full h-full rounded-full"
            />

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center text-white z-10 pointer-events-none">
              <motion.div
                animate={{
                  rotate: isExpanded ? 180 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <QrCode size={24} className="drop-shadow-lg text-[#B79A5B]" />
              </motion.div>
            </div>

            {/* Pulsing Ring */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(183,154,91,0.6)",
                  "0 0 0 12px rgba(183,154,91,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />

            {/* Animated Border */}
            <motion.div
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-[#B79A5B]/50"
            />
          </div>
        </button>
      </motion.div>
    </div>
  );
}
