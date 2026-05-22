"use client";

import { useState } from "react";
import { QRBarcodeGenerator } from "@/components/QRBarcodeGenerator";
import PlatinumBusinessCardGenerator from "@/components/PlatinumBusinessCardGenerator";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import { ChezmissAide } from "@/components/ChezmissAide";
import Link from "next/link";
import { ArrowLeft, Lock, Menu, X } from "lucide-react";

export default function StaffPage() {
  const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false);

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
            Staff — QR Code & Barcode Generator
          </h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Security Section */}
      <div className="border-b border-[#B79A5B]/[0.10] bg-[#B79A5B]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-[#B79A5B]">
              <Lock size={18} />
              <span className="text-sm font-medium">Sécurité Staff</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="sm:hidden inline-flex items-center gap-2 rounded-full border border-[#B79A5B]/40 bg-[#080508]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B79A5B]"
                onClick={() => setIsMobileActionsOpen((prev) => !prev)}
                aria-expanded={isMobileActionsOpen}
                aria-controls="staff-mobile-actions"
              >
                {isMobileActionsOpen ? <X size={14} /> : <Menu size={14} />}
                Actions
              </button>
              <Link href="/staff/setup-2fa" className="hidden sm:block">
                <LiquidMetalButton label="Configuration 2FA" />
              </Link>
              <Link href="/staff/login" className="hidden sm:block">
                <LiquidMetalButton label="Connexion Staff" />
              </Link>
            </div>

            {isMobileActionsOpen && (
              <div id="staff-mobile-actions" className="w-full sm:hidden">
                <div className="mt-2 grid grid-cols-1 gap-3 rounded-xl border border-[#B79A5B]/25 bg-[#080508]/55 p-3">
                  <Link
                    href="/staff/setup-2fa"
                    className="rounded-lg border border-[#B79A5B]/35 bg-[#0d0810]/80 px-4 py-3 text-center text-sm font-semibold text-[#f0c9e1]"
                    onClick={() => setIsMobileActionsOpen(false)}
                  >
                    Configuration 2FA
                  </Link>
                  <Link
                    href="/staff/login"
                    className="rounded-lg border border-[#B79A5B]/35 bg-[#0d0810]/80 px-4 py-3 text-center text-sm font-semibold text-[#f0c9e1]"
                    onClick={() => setIsMobileActionsOpen(false)}
                  >
                    Connexion Staff
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-[#B79A5B]/70">Staff Control</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#B79A5B]">
            Générateur de QR Code
          </h2>
          <p className="text-sm sm:text-base text-[#f0c9e1]/70">
            Le générateur principal est placé au centre de la page pour rester clair, lisible et rapide à utiliser.
          </p>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="bg-[#0d0810]/50 border border-[#B79A5B]/20 rounded-xl p-8 sm:p-10">
            <h3 className="text-lg font-semibold text-[#B79A5B] mb-6 text-center">
              Générateur de QR Code
            </h3>
            <p className="text-sm text-[#f0c9e1]/70 mb-8 text-center max-w-2xl mx-auto">
              Cliquez sur le bouton QR code en bas à droite pour commencer à générer des codes QR pour vos besoins.
            </p>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d0810]/50 border border-[#B79A5B]/20 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#B79A5B] mb-3">Page Actuelle</h3>
            <p className="text-sm text-[#f0c9e1]/70">Générez un QR code pour l'URL de la page en cours</p>
          </div>

          <div className="bg-[#0d0810]/50 border border-[#B79A5B]/20 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#B79A5B] mb-3">Produits</h3>
            <p className="text-sm text-[#f0c9e1]/70">Créez des QR codes pour chaque produit CHEZ MISS (5 produits disponibles)</p>
          </div>

          <div className="bg-gradient-to-br from-[#B79A5B]/20 to-[#B79A5B]/5 border border-[#B79A5B]/30 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#B79A5B] mb-3">Personnalisé</h3>
            <p className="text-sm text-[#f0c9e1]/70">Générez des QR codes à partir de n'importe quel texte, URL ou code hexadécimal</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl bg-[#B79A5B]/10 border border-[#B79A5B]/20 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[#B79A5B] mb-3">💡 Utilisation</h3>
          <ul className="text-xs text-[#f0c9e1]/70 space-y-2 list-disc list-inside">
            <li>Marketing et campagnes</li>
            <li>Emballage produit</li>
            <li>Signalétique en magasin</li>
            <li>Matériel imprimé</li>
            <li>Réseaux sociaux</li>
          </ul>

          <p className="mt-4 text-xs text-[#f0c9e1]/70">
            <span className="font-semibold text-[#B79A5B]">Astuce:</span> Les codes QR peuvent être téléchargés et partagés directement. Utilisez-les pour vos besoins marketing!
          </p>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <div className="bg-[#0d0810]/50 border border-[#B79A5B]/20 rounded-xl p-6 sm:p-8">
            <div className="mx-auto max-w-3xl text-center space-y-3 mb-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#B79A5B]/70">Staff Control</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#B79A5B]">
                Générateur de Carte Platinum
              </h2>
              <p className="text-sm sm:text-base text-[#f0c9e1]/70">
                Créez, prévisualisez et exportez vos cartes professionnelles directement depuis cette page.
              </p>
            </div>

            <PlatinumBusinessCardGenerator />
          </div>
        </div>
      </div>

      {/* QR Code & Barcode Generator Component */}
      <QRBarcodeGenerator />

      <ChezmissAide />
    </main>
  );
}
