"use client";

import { QRCodeAdvanced } from "@/components/QRCodeAdvanced";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function StaffPage() {
  return (
    <main className="cm-marble cm-page-enter min-h-screen text-[#f8edf3] overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#B79A5B]/[0.10] bg-black/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 text-[#B79A5B] hover:text-[#B79A5B]/80 transition">
            <ArrowLeft size={20} />
            <span className="text-sm font-semibold">Retour</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-[#B79A5B]">
            Staff — QR Code Generator
          </h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d0810]/50 border border-[#B79A5B]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#B79A5B] mb-4">
                QR Code Generator
              </h2>
              <div className="space-y-4 text-sm text-[#f0c9e1]/70">
                <div>
                  <h3 className="font-semibold text-[#B79A5B] mb-2">Page Actuelle</h3>
                  <p>Générez un QR code pour l'URL de la page en cours</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#B79A5B] mb-2">Produits</h3>
                  <p>Créez des QR codes pour chaque produit CHEZ MISS (5 produits disponibles)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#B79A5B] mb-2">Personnalisé</h3>
                  <p>Générez des QR codes à partir de n'importe quel texte, URL ou code hexadécimal</p>
                </div>
              </div>
            </div>

            <div className="bg-[#B79A5B]/10 border border-[#B79A5B]/20 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#B79A5B] mb-3">💡 Utilisation</h3>
              <ul className="text-xs text-[#f0c9e1]/70 space-y-2 list-disc list-inside">
                <li>Marketing et campagnes</li>
                <li>Emballage produit</li>
                <li>Signalétique en magasin</li>
                <li>Matériel imprimé</li>
                <li>Réseaux sociaux</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#B79A5B]/20 to-[#B79A5B]/5 border border-[#B79A5B]/30 rounded-xl p-6">
              <p className="text-xs text-[#f0c9e1]/70">
                <span className="font-semibold text-[#B79A5B]">Astuce:</span> Les codes QR peuvent être téléchargés et partagés directement. Utilisez-les pour vos besoins marketing!
              </p>
            </div>
          </div>

          {/* QR Generator */}
          <div className="lg:col-span-2">
            <div className="bg-[#0d0810]/50 border border-[#B79A5B]/20 rounded-xl p-8">
              <h2 className="text-lg font-semibold text-[#B79A5B] mb-6">
                Générateur de QR Code
              </h2>
              <p className="text-sm text-[#f0c9e1]/70 mb-6">
                Cliquez sur le bouton QR code en bas à droite pour commencer à générer des codes QR pour vos besoins.
              </p>

              {/* Instructions */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B79A5B] text-black flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f0c9e1] mb-1">Cliquez sur le bouton QR</h4>
                    <p className="text-sm text-[#f0c9e1]/70">
                      Le bouton doré se trouve dans le coin inférieur droit de votre écran
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B79A5B] text-black flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f0c9e1] mb-1">Sélectionnez un mode</h4>
                    <p className="text-sm text-[#f0c9e1]/70">
                      Choisissez entre Page, Produits ou Personnalisé
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B79A5B] text-black flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f0c9e1] mb-1">Générez votre QR code</h4>
                    <p className="text-sm text-[#f0c9e1]/70">
                      Le code QR s'affiche automatiquement en haute qualité
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B79A5B] text-black flex items-center justify-center font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f0c9e1] mb-1">Téléchargez ou copiez</h4>
                    <p className="text-sm text-[#f0c9e1]/70">
                      Téléchargez en PNG ou copiez le contenu du QR code
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#080508]/50 border border-[#B79A5B]/20 rounded-lg p-4">
                  <h5 className="font-semibold text-[#B79A5B] text-sm mb-2">📱 5 Produits</h5>
                  <p className="text-xs text-[#f0c9e1]/60">
                    QR codes pré-configurés pour tous vos produits
                  </p>
                </div>
                <div className="bg-[#080508]/50 border border-[#B79A5B]/20 rounded-lg p-4">
                  <h5 className="font-semibold text-[#B79A5B] text-sm mb-2">✏️ Texte libre</h5>
                  <p className="text-xs text-[#f0c9e1]/60">
                    Générez à partir de n'importe quel contenu
                  </p>
                </div>
                <div className="bg-[#080508]/50 border border-[#B79A5B]/20 rounded-lg p-4">
                  <h5 className="font-semibold text-[#B79A5B] text-sm mb-2">💾 Exportation</h5>
                  <p className="text-xs text-[#f0c9e1]/60">
                    Téléchargez en haute résolution PNG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Generator Component */}
      <QRCodeAdvanced />
    </main>
  );
}
