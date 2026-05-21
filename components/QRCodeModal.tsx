"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { QrCode, X, Download } from "lucide-react";

export function QRCodeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const pageUrl = typeof window !== "undefined" ? window.location.href : "https://www.chezmiss.ca";

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, pageUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }).catch(err => console.error("QR Code generation error:", err));
    }
  }, [isOpen, pageUrl]);

  const handleDownload = async () => {
    try {
      if (canvasRef.current) {
        const url = canvasRef.current.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "chez-miss-qr.png";
        link.click();
      }
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <>
      {/* QR Code Button — Bottom Right Corner */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#B79A5B] text-black shadow-lg hover:bg-[#B79A5B]/90 active:scale-95 transition-all duration-200 flex items-center justify-center group"
        aria-label="Afficher le code QR"
        title="Scan pour accéder au site"
      >
        <QrCode size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* QR Code Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d0810] rounded-2xl border border-[#B79A5B]/30 shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B79A5B]/20 to-[#B79A5B]/10 border-b border-[#B79A5B]/20 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#B79A5B]">Code QR</h2>
                <p className="text-xs text-[#f0c9e1]/60 mt-1">Scannez pour accéder au site</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[#B79A5B]/20 rounded-lg transition text-[#f0c9e1]/70 hover:text-[#B79A5B]"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* QR Code Content */}
            <div className="p-8 flex flex-col items-center gap-6">
              {/* QR Code */}
              <div className="bg-white p-4 rounded-lg">
                <canvas
                  ref={canvasRef}
                  className="w-auto h-auto"
                />
              </div>

              {/* URL Display */}
              <div className="w-full">
                <p className="text-xs text-[#f0c9e1]/50 mb-2">URL:</p>
                <div className="bg-[#080508]/50 border border-[#B79A5B]/20 rounded px-3 py-2 truncate text-xs text-[#f0c9e1]/70 font-mono">
                  {pageUrl}
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-[#B79A5B] text-black py-3 rounded-lg font-semibold hover:bg-[#B79A5B]/90 active:scale-95 transition-all duration-200"
              >
                <Download size={18} />
                Télécharger
              </button>

              {/* Info */}
              <div className="text-center text-xs text-[#f0c9e1]/50">
                <p>📱 Photographiez ce code avec votre téléphone</p>
                <p className="mt-1">pour accéder directement au site</p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#080508]/50 border-t border-[#B79A5B]/20 px-6 py-3 text-center text-xs text-[#f0c9e1]/40">
              CHEZ MISS — Beauty & Confidence
            </div>
          </div>
        </div>
      )}
    </>
  );
}
