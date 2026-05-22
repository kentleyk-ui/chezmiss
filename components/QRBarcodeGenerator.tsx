"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { QrCode, Barcode, Shuffle, Download, Copy, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GeneratorItem {
  id: string;
  label: string;
  value: string;
  type: "product" | "custom" | "random";
}

export function QRBarcodeGenerator() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [mode, setMode] = useState<"qr" | "barcode">("qr");
  const [selectedItem, setSelectedItem] = useState<GeneratorItem | null>(null);
  const [customValue, setCustomValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState<string | null>(null);
  const [isRandom, setIsRandom] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [withSignature, setWithSignature] = useState(true);

  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const barcodeCanvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);

  const products: GeneratorItem[] = [
    {
      id: "chezmiss-home",
      label: "CHEZ MISS HOME",
      value: "https://www.chezmiss.ca",
      type: "product",
    },
    {
      id: "milele",
      label: "MILELE MEMORIAL",
      value: "https://www.milele4ever.com",
      type: "product",
    },
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
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes transformer {
          0% { transform: perspective(1000px) rotateY(0deg) scale(1); }
          50% { transform: perspective(1000px) rotateY(90deg) scale(1.05); }
          100% { transform: perspective(1000px) rotateY(0deg) scale(1); }
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

  // Initialize with Chezmiss Home by default
  useEffect(() => {
    const chezmissItem = products.find(p => p.id === "chezmiss-home");
    if (chezmissItem) {
      setSelectedItem(chezmissItem);
    }
  }, []);

  const addWatermark = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
    const watermarkCanvas = document.createElement("canvas");
    watermarkCanvas.width = canvas.width;
    watermarkCanvas.height = canvas.height;

    const ctx = watermarkCanvas.getContext("2d");
    if (!ctx) return canvas;

    ctx.drawImage(canvas, 0, 0);

    ctx.font = `bold ${Math.max(12, canvas.width * 0.08)}px Arial`;
    ctx.fillStyle = "rgba(183, 154, 91, 0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("CHEZ MISS", canvas.width / 2, canvas.height - 8);

    return watermarkCanvas;
  };

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

  const generateQRCode = async (value: string, addSignature = withSignature) => {
    if (!qrCanvasRef.current) return;
    setIsGenerating(true);
    try {
      await QRCode.toCanvas(qrCanvasRef.current, value, {
        width: 300,
        margin: 2,
        color: {
          dark: "#B79A5B",
          light: "#080508",
        },
      });

      const outputCanvas = addSignature ? addWatermark(qrCanvasRef.current) : qrCanvasRef.current;
      setGenerated(outputCanvas.toDataURL("image/png"));
      setShowPanel(true);
    } catch (err) {
      console.error("QR Code error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBarcode = async (value: string, addSignature = withSignature) => {
    if (!barcodeCanvasRef.current) return;
    setIsGenerating(true);
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

      const outputCanvas = addSignature ? addWatermark(barcodeCanvasRef.current) : barcodeCanvasRef.current;
      setGenerated(outputCanvas.toDataURL("image/png"));
      setShowPanel(true);
    } catch (err) {
      console.error("Barcode error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async (addSignatureOverride?: boolean) => {
    const value = customValue || selectedItem?.value;
    const addSignature = addSignatureOverride ?? withSignature;

    if (value) {
      if (mode === "qr") {
        await generateQRCode(value, addSignature);
      } else {
        await generateBarcode(value, addSignature);
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
    if (generated) {
      const link = document.createElement("a");
      link.href = generated;
      link.download = `chezmiss-${mode}-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      {/* Hidden canvases for QR/Barcode generation */}
      <canvas ref={qrCanvasRef} style={{ display: "none" }} />
      <canvas ref={barcodeCanvasRef} style={{ display: "none" }} />

      <motion.div className="pointer-events-auto">
        <AnimatePresence>
          {/* Sliding Panel - Emerges from button */}
          {showPanel && generated && (
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: -380 }}
              exit={{ opacity: 0, x: 50, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }}
              className="mb-4 w-96 rounded-3xl overflow-hidden pointer-events-auto"
            >
              {/* Glass backdrop */}
              <div className="absolute inset-0 rounded-3xl backdrop-blur-3xl bg-gradient-to-br from-[#B79A5B]/15 via-[#080508]/60 to-[#1a0a12]/40 border border-[#B79A5B]/50" />

              {/* Animated glow edges */}
              <motion.div
                animate={{
                  boxShadow: [
                    "inset 0 0 20px rgba(183,154,91,0.2), 0 0 40px rgba(183,154,91,0.3)",
                    "inset 0 0 40px rgba(183,154,91,0.4), 0 0 80px rgba(183,154,91,0.5)",
                    "inset 0 0 20px rgba(183,154,91,0.2), 0 0 40px rgba(183,154,91,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
              />

              {/* Content */}
              <div className="relative p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-[#B79A5B] to-[#f0c9e1] bg-clip-text text-transparent">
                    {mode === "qr" ? "QR Code" : "Code-barres"}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPanel(false)}
                    className="p-2 hover:bg-[#B79A5B]/20 rounded-full transition-colors"
                  >
                    <X size={18} className="text-[#B79A5B]" />
                  </motion.button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const nextSignature = !withSignature;
                      setWithSignature(nextSignature);
                      if (generated) {
                        void handleGenerate(nextSignature);
                      }
                    }}
                    className="rounded-full border border-[#B79A5B]/35 bg-[#080508]/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B79A5B] hover:border-[#B79A5B]/60"
                  >
                    {withSignature ? "Signature: ON" : "Signature: OFF"}
                  </button>
                </div>

                {/* Code Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex justify-center"
                >
                  {generated && (
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B79A5B]/30 via-transparent to-[#B79A5B]/20 blur-2xl" />
                      <img
                        src={generated}
                        alt={mode}
                        className="relative w-64 h-64 rounded-2xl border-2 border-[#B79A5B]/40 shadow-2xl object-contain bg-[#0d0810]/80 p-2"
                      />
                      {withSignature ? (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#B79A5B]/60 tracking-widest">
                          ✓ SIGNE CHEZ MISS
                        </div>
                      ) : (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#f0c9e1]/45 tracking-widest">
                          SANS SIGNATURE
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="grid grid-cols-2 gap-3 pt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#B79A5B]/30 to-[#f0c9e1]/10 hover:from-[#B79A5B]/50 hover:to-[#f0c9e1]/20 border border-[#B79A5B]/40 text-[#B79A5B] font-bold transition-all flex items-center justify-center gap-2 group"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="group-hover:scale-110 transition-transform" />
                        <span>Copié!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="group-hover:scale-110 transition-transform" />
                        <span>Copier</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadCode}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#B79A5B] to-[#c8a76b] hover:from-[#B79A5B]/90 hover:to-[#c8a76b]/90 text-black font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <Download size={16} className="group-hover:scale-110 transition-transform" />
                    <span>PNG</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Expanded Control Panel */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: -420 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 w-96 rounded-3xl border border-[#B79A5B]/60 overflow-hidden pointer-events-auto"
              style={{
                boxShadow:
                  "0 0 60px rgba(183, 154, 91, 0.4), 0 0 100px rgba(183, 154, 91, 0.2), inset 0 0 40px rgba(183, 154, 91, 0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d0810] via-[#1a0a12] to-[#080508] backdrop-blur-2xl" />

              {/* Content */}
              <div className="relative p-8 space-y-6">
                {/* Header with Mode Switch */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-[#B79A5B] to-[#f0c9e1] bg-clip-text text-transparent">
                    {mode === "qr" ? "QR Code" : "Code-barres"}
                  </h3>

                  {/* Mode Switch - Transformer Style */}
                  <motion.div
                    className="flex gap-1 rounded-xl bg-[#080508]/80 border border-[#B79A5B]/30 p-1 backdrop-blur-sm"
                    animate={{ rotateY: isExpanded ? 0 : -10 }}
                  >
                    {[
                      { id: "qr", label: "QR", icon: QrCode },
                      { id: "barcode", label: "CODE", icon: Barcode },
                    ].map(({ id, label, icon: Icon }) => (
                      <motion.button
                        key={id}
                        onClick={() => setMode(id as "qr" | "barcode")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 rounded-lg transition-all duration-300 text-xs font-bold flex items-center gap-1 ${
                          mode === id
                            ? "bg-gradient-to-r from-[#B79A5B] to-[#c8a76b] text-black shadow-lg"
                            : "text-[#B79A5B]/70 hover:text-[#B79A5B]"
                        }`}
                      >
                        <Icon size={14} />
                        {label}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Products Grid */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[#B79A5B]/60 uppercase tracking-wider">Produits</p>
                  <div className="grid gap-2 max-h-40 overflow-y-auto">
                    {products.map((product) => (
                      <motion.button
                        key={product.id}
                        onClick={() => {
                          setSelectedItem(product);
                          setIsRandom(false);
                          setCustomValue("");
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className={`p-3 rounded-lg text-sm transition-all text-left ${
                          selectedItem?.id === product.id
                            ? "bg-gradient-to-r from-[#B79A5B]/30 to-[#f0c9e1]/10 border border-[#B79A5B] text-[#f0c9e1]"
                            : "bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1]/70 hover:border-[#B79A5B]/50"
                        }`}
                      >
                        {product.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Input */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#B79A5B]/60 uppercase tracking-wider">Personnalisé</p>
                  <textarea
                    value={customValue}
                    onChange={(e) => {
                      setCustomValue(e.target.value);
                      setIsRandom(false);
                    }}
                    placeholder="Entrez une URL, du texte, ou un code..."
                    className="w-full rounded-xl bg-[#080508]/50 border border-[#B79A5B]/20 p-3 text-sm text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:border-[#B79A5B]/60 focus:outline-none focus:ring-1 focus:ring-[#B79A5B]/30 backdrop-blur-sm transition-all"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <motion.div
                  className="grid grid-cols-2 gap-3 pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => {
                      void handleGenerate();
                    }}
                    disabled={isGenerating}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#B79A5B] to-[#c8a76b] text-black font-bold hover:from-[#B79A5B]/90 hover:to-[#c8a76b]/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4">
                          <QrCode size={16} />
                        </motion.div>
                        <span>...</span>
                      </>
                    ) : (
                      <>
                        <QrCode size={16} />
                        <span>Générer</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={generateRandomCode}
                    whileHover={{ scale: 1.05, y: -2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#B79A5B]/50 to-[#f0c9e1]/20 border border-[#B79A5B]/50 text-[#B79A5B] font-bold hover:from-[#B79A5B]/70 hover:to-[#f0c9e1]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Shuffle size={16} />
                    <span>Aléatoire</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button - Transformer Style */}
        <motion.button
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (isExpanded) setShowPanel(false);
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
          onMouseEnter={() => {
            if (shaderMount.current?.setSpeed) {
              shaderMount.current.setSpeed(1.5);
            }
          }}
          onMouseLeave={() => {
            if (shaderMount.current?.setSpeed) {
              shaderMount.current.setSpeed(0.8);
            }
          }}
        >
          {/* Transformer-like rotating rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-16 h-16 rounded-full border border-[#B79A5B]/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 w-12 h-12 rounded-full border border-[#B79A5B]/20"
          />

          {/* Main button container */}
          <div className="w-14 h-14 rounded-full overflow-hidden shadow-2xl border border-[#B79A5B]/40 relative">
            {/* Shader Background */}
            <div ref={shaderRef} className="qr-shader-container absolute inset-0 w-full h-full rounded-full" />

            {/* Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-white z-10 pointer-events-none"
              animate={{ rotateZ: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.div
                animate={isExpanded ? { y: -2 } : { y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <QrCode size={28} className="drop-shadow-lg text-[#B79A5B]" />
              </motion.div>
            </motion.div>

            {/* Pulsing Aura */}
            <motion.div
              animate={{
                boxShadow: isExpanded
                  ? [
                      "0 0 0 0 rgba(183,154,91,0.8)",
                      "0 0 0 16px rgba(183,154,91,0)",
                    ]
                  : [
                      "0 0 0 0 rgba(183,154,91,0.6)",
                      "0 0 0 12px rgba(183,154,91,0)",
                    ],
              }}
              transition={{ duration: isExpanded ? 1.2 : 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />

            {/* Animated Border */}
            <motion.div
              animate={{
                opacity: isExpanded ? [0.5, 1, 0.5] : [0.3, 0.8, 0.3],
              }}
              transition={{ duration: isExpanded ? 2 : 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-[#B79A5B]/50"
            />
          </div>

          {/* Glow indicator */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#B79A5B]/20 to-[#f0c9e1]/10 blur-xl pointer-events-none"
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
