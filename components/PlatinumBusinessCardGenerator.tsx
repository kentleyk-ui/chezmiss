"use client"

import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import * as htmlToImage from "html-to-image"
import jsPDF from "jspdf"

type SignatureType = "chezmiss" | "kentley" | "none"
type ModeType = "standard" | "team" | "a4" | "hologram" | "mobile"

type CardData = {
  name: string
  title: string
  company: string
  phone: string
  email: string
  website: string
  showQR: boolean
  signature: SignatureType
  logo?: string
}

const defaultCard: CardData = {
  name: "Kentley Mwila",
  title: "Founder · Milele Inc.",
  company: "CHEZMISS",
  phone: "+1 (514) 000-0000",
  email: "contact@chezmiss.com",
  website: "https://chezmiss.com",
  showQR: true,
  signature: "chezmiss",
}

export default function PlatinumBusinessCardGenerator() {
  const [mode, setMode] = useState<ModeType>("standard")
  const [isMonochrome, setIsMonochrome] = useState(false)
  const [card, setCard] = useState<CardData>(defaultCard)
  const [team, setTeam] = useState<CardData[]>([defaultCard])
  const previewRef = useRef<HTMLDivElement | null>(null)
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const logoInputRef = useRef<HTMLInputElement | null>(null)

  function updateCard<K extends keyof CardData>(field: K, value: CardData[K]) {
    setCard({ ...card, [field]: value })
  }

  function addTeamCard() {
    setTeam([...team, { ...defaultCard, name: "", email: "", phone: "", website: "" }])
  }

  function updateTeamCard<K extends keyof CardData>(index: number, field: K, value: CardData[K]) {
    const updated = [...team]
    updated[index] = { ...updated[index], [field]: value }
    setTeam(updated)
  }

  function onLogoUpload(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateCard("logo", reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  function saveCardLocally() {
    if (typeof window === "undefined") return
    window.localStorage.setItem("chezmiss_platinum_card", JSON.stringify(card))
    window.alert("Carte sauvegardee localement.")
  }

  function loadSavedCard() {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem("chezmiss_platinum_card")
    if (!raw) {
      window.alert("Aucune sauvegarde trouvee.")
      return
    }

    try {
      const parsed = JSON.parse(raw) as Partial<CardData>
      setCard((prev) => ({ ...prev, ...parsed }))
      window.alert("Carte chargee.")
    } catch {
      window.alert("Sauvegarde invalide.")
    }
  }

  async function downloadPNG() {
    if (!previewRef.current) return
    const url = await htmlToImage.toPng(previewRef.current)
    const link = document.createElement("a")
    link.href = url
    link.download = "CHEZMISS-PLATINUM-card.png"
    link.click()
  }

  async function downloadA4PDF() {
    if (!sheetRef.current) return
    const url = await htmlToImage.toPng(sheetRef.current)
    const pdf = new jsPDF("portrait", "mm", "a4")
    pdf.addImage(url, "PNG", 0, 0, 210, 297)
    pdf.save("CHEZMISS-PLATINUM-A4.pdf")
  }

  async function printCard() {
    if (!previewRef.current) return

    const url = await htmlToImage.toPng(previewRef.current)
    const printWindow = window.open("", "_blank", "width=900,height=600")
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head><title>Impression carte CHEZMISS</title></head>
        <body style="margin:0;display:flex;align-items:center;justify-content:center;background:#111;">
          <img src="${url}" alt="Carte" style="max-width:96%;height:auto;" />
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  async function sendCard() {
    if (!previewRef.current) return

    const pngDataUrl = await htmlToImage.toPng(previewRef.current)
    const response = await fetch(pngDataUrl)
    const blob = await response.blob()
    const file = new File([blob], "CHEZMISS-PLATINUM-card.png", { type: "image/png" })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: "Carte CHEZMISS",
        text: `${card.name} - ${card.title}`,
        files: [file],
      })
      return
    }

    const subject = encodeURIComponent(`Carte professionnelle - ${card.name}`)
    const body = encodeURIComponent(
      `Nom: ${card.name}\nTitre: ${card.title}\nEntreprise: ${card.company}\nEmail: ${card.email}\nTelephone: ${card.phone}\nSite web: ${card.website}\n\nImage de carte a joindre: CHEZMISS-PLATINUM-card.png`
    )
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self")
  }

  function renderSignature(sig: SignatureType) {
    if (sig === "none") return null
    if (sig === "chezmiss") return "CHEZMISS"
    if (sig === "kentley") return "Made by Kentley · Milele Inc."
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 flex flex-col gap-8">
      {/* BACKGROUND FUTURISTE */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 left-10 w-72 h-72 bg-[#D4AF37]/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/25 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
      </div>

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-[0.25em] text-[#D4AF37]">
          CHEZMISS PLATINUM SUITE
        </h1>
        <p className="text-xs md:text-sm opacity-70 uppercase">
          Business Card Generator · Futuristic Edition
        </p>
        <p className="text-[11px] opacity-60">
          Designed & Engineered by <span className="text-[#D4AF37]">Kentley · Milele Inc.</span>
        </p>
      </div>

      {/* BARRE D’OPTIONS */}
      <div className="flex flex-wrap justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="opacity-70">Mode :</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as ModeType)}
            className="bg-black border border-[#D4AF37]/60 rounded-lg px-2 py-1"
          >
            <option value="standard">Standard</option>
            <option value="team">Équipe</option>
            <option value="a4">Planche A4</option>
            <option value="hologram">Hologram 3D</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className="opacity-70">Signature :</span>
          <select
            value={card.signature}
            onChange={(e) => updateCard("signature", e.target.value as SignatureType)}
            className="bg-black border border-[#D4AF37]/60 rounded-lg px-2 py-1"
          >
            <option value="chezmiss">CHEZMISS</option>
            <option value="kentley">Kentley · Milele Inc.</option>
            <option value="none">Aucune</option>
          </select>

          <label className="inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/60 px-2 py-1 cursor-pointer">
            <input
              type="checkbox"
              checked={isMonochrome}
              onChange={(e) => setIsMonochrome(e.target.checked)}
            />
            Noir et blanc
          </label>

          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="rounded-lg border border-[#D4AF37]/60 px-3 py-1"
          >
            Inserer logo
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onLogoUpload(e.target.files?.[0])}
          />

          <button
            type="button"
            onClick={() => updateCard("logo", undefined)}
            className="rounded-lg border border-[#D4AF37]/40 px-3 py-1"
          >
            Retirer logo
          </button>
        </div>
      </div>

      {/* CONTENU SELON LE MODE */}
      {mode === "standard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* FORM */}
          <div className="space-y-4 text-sm">
            {[
              { key: "name", label: "Nom" },
              { key: "title", label: "Titre" },
              { key: "company", label: "Entreprise" },
              { key: "phone", label: "Téléphone" },
              { key: "email", label: "Email" },
              { key: "website", label: "Site web" },
            ].map((f) => (
              <div key={f.key} className="flex flex-col gap-1">
                <label className="opacity-70">{f.label}</label>
                <input
                  className="bg-black border border-[#D4AF37]/50 rounded-lg px-3 py-2 text-sm"
                  value={card[f.key as keyof CardData] as string}
                  onChange={(e) => updateCard(f.key as keyof CardData, e.target.value)}
                />
              </div>
            ))}

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={card.showQR}
                onChange={(e) => updateCard("showQR", e.target.checked)}
              />
              <span className="text-xs opacity-80">Afficher le QR code</span>
            </label>

            <button
              onClick={downloadPNG}
              className="mt-4 px-6 py-2 bg-[#D4AF37] text-black rounded-lg text-sm"
            >
              Télécharger PNG
            </button>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={printCard}
                className="px-4 py-2 border border-[#D4AF37]/70 rounded-lg text-xs"
              >
                Imprimer
              </button>
              <button
                onClick={saveCardLocally}
                className="px-4 py-2 border border-[#D4AF37]/70 rounded-lg text-xs"
              >
                Sauvegarder
              </button>
              <button
                onClick={loadSavedCard}
                className="px-4 py-2 border border-[#D4AF37]/70 rounded-lg text-xs"
              >
                Charger
              </button>
              <button
                onClick={sendCard}
                className="px-4 py-2 border border-[#D4AF37]/70 rounded-lg text-xs"
              >
                Envoyer
              </button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="flex justify-center">
            <div ref={previewRef}>
              <PlatinumCard
                data={card}
                signature={renderSignature(card.signature)}
                monochrome={isMonochrome}
              />
            </div>
          </div>
        </div>
      )}

      {mode === "team" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#D4AF37]">Équipe</h2>
            <button
              onClick={addTeamCard}
              className="px-4 py-2 border border-[#D4AF37] rounded-lg text-xs"
            >
              Ajouter une carte
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <div key={i} className="space-y-3">
                <input
                  className="bg-black border border-[#D4AF37]/50 rounded-lg px-3 py-2 text-sm w-full"
                  placeholder="Nom"
                  value={member.name}
                  onChange={(e) => updateTeamCard(i, "name", e.target.value)}
                />
                <input
                  className="bg-black border border-[#D4AF37]/50 rounded-lg px-3 py-2 text-sm w-full"
                  placeholder="Titre"
                  value={member.title}
                  onChange={(e) => updateTeamCard(i, "title", e.target.value)}
                />
                <input
                  className="bg-black border border-[#D4AF37]/50 rounded-lg px-3 py-2 text-sm w-full"
                  placeholder="Téléphone"
                  value={member.phone}
                  onChange={(e) => updateTeamCard(i, "phone", e.target.value)}
                />
                <input
                  className="bg-black border border-[#D4AF37]/50 rounded-lg px-3 py-2 text-sm w-full"
                  placeholder="Email"
                  value={member.email}
                  onChange={(e) => updateTeamCard(i, "email", e.target.value)}
                />
                <PlatinumCard data={member} signature={renderSignature(card.signature)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "a4" && (
        <div className="space-y-4">
          <button
            onClick={downloadA4PDF}
            className="px-6 py-2 bg-[#D4AF37] text-black rounded-lg text-sm"
          >
            Télécharger Planche A4 (PDF)
          </button>

          <div
            ref={sheetRef}
            className="w-[210mm] h-[297mm] bg-white text-black p-10 grid grid-cols-2 gap-6"
          >
            {team.slice(0, 10).map((member, i) => (
              <div key={i} className="scale-[0.75] origin-top-left">
                <PlatinumCard
                  data={member}
                  signature={renderSignature(card.signature)}
                  plain
                  monochrome={isMonochrome}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "hologram" && (
        <div className="flex justify-center">
          <PlatinumCard
            data={card}
            signature={renderSignature(card.signature)}
            hologram
            monochrome={isMonochrome}
          />
        </div>
      )}

      {mode === "mobile" && (
        <div className="max-w-xs mx-auto">
          <PlatinumCard
            data={card}
            signature={renderSignature(card.signature)}
            monochrome={isMonochrome}
          />
        </div>
      )}
    </div>
  )
}

/* ————————————————————————————————
   CARTE PLATINUM FUTURISTE
——————————————————————————————— */

function PlatinumCard({
  data,
  signature,
  hologram = false,
  plain = false,
  monochrome = false,
}: {
  data: CardData
  signature: string | null
  hologram?: boolean
  plain?: boolean
  monochrome?: boolean
}) {
  const qrValue = `${data.name} · ${data.title} · ${data.company} · ${data.phone} · ${data.email} · ${data.website}`

  if (plain) {
    return (
      <div className="w-[340px] h-[210px] border border-gray-300 rounded-xl p-4 flex flex-col justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            {data.company}
          </div>
          <div className="mt-2 text-lg font-semibold">{data.name}</div>
          <div className="text-xs">{data.title}</div>
        </div>
        <div className="text-[10px] space-y-1 mt-2">
          <div>{data.phone}</div>
          <div>{data.email}</div>
          <div>{data.website}</div>
        </div>
        {signature && (
          <div className="text-[8px] opacity-60 text-right mt-1">{signature}</div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative w-[340px] h-[210px] rounded-xl overflow-hidden border p-4 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.9)] ${
        monochrome
          ? "border-white/40 bg-gradient-to-br from-black via-[#1a1a1a] to-black"
          : "border-[#D4AF37]/50 bg-gradient-to-br from-black via-[#120b18] to-black"
      }`}
    >
      {/* Layers futuristes */}
      <div
        className={`absolute -top-20 -right-10 w-40 h-40 blur-3xl ${
          monochrome ? "bg-white/10" : "bg-[#D4AF37]/25"
        }`}
      />
      <div
        className={`absolute bottom-[-40px] left-[-20px] w-40 h-40 blur-3xl ${
          monochrome ? "bg-white/10" : "bg-purple-500/25"
        }`}
      />
      {hologram && (
        <div
          className={`absolute inset-0 mix-blend-screen opacity-70 animate-pulse ${
            monochrome
              ? "bg-[conic-gradient(from_180deg,_rgba(255,255,255,0.15),_transparent,_rgba(120,120,120,0.2),_transparent,_rgba(255,255,255,0.15))]"
              : "bg-[conic-gradient(from_180deg,_rgba(212,175,55,0.25),_transparent,_rgba(168,85,247,0.25),_transparent,_rgba(212,175,55,0.25))]"
          }`
        />
      )}

      <div className="relative flex justify-between gap-3">
        <div>
          <div className={`text-[10px] uppercase tracking-[0.25em] ${monochrome ? "text-white/90" : "text-[#D4AF37]"}`}>
            {data.company}
          </div>
          <div className="mt-2 text-lg font-semibold">{data.name}</div>
          <div className="text-xs opacity-70">{data.title}</div>
        </div>

        {data.logo && (
          <div className={`rounded-lg p-1 border ${monochrome ? "border-white/30 bg-black/50" : "border-[#D4AF37]/40 bg-black/50"}`}>
            <img
              src={data.logo}
              alt="Logo"
              className="w-[44px] h-[44px] object-contain"
            />
          </div>
        )}

        {data.showQR && (
          <div className={`bg-black/50 rounded-lg p-1 border ${monochrome ? "border-white/30" : "border-[#D4AF37]/40"}`}>
            <QRCodeCanvas
              value={qrValue}
              size={70}
              bgColor="transparent"
              fgColor={monochrome ? "#FFFFFF" : "#D4AF37"}
            />
          </div>
        )}
      </div>

      <div className="relative text-[10px] space-y-1 mt-4">
        <div>{data.phone}</div>
        <div>{data.email}</div>
        <div>{data.website}</div>
      </div>

      {signature && (
        <div className="relative text-[9px] opacity-70 text-right mt-2">
          {signature}
        </div>
      )}
    </div>
  )
}
