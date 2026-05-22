"use client"

import { useEffect, useRef, useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import * as htmlToImage from "html-to-image"
import jsPDF from "jspdf"

type SignatureType = "chezmiss" | "kentley" | "none"
type ModeType = "standard" | "team" | "a4" | "hologram" | "mobile"
type CardTheme = "executive" | "minimal" | "luxe"
type ToastTone = "success" | "error" | "info"

type ToastState = {
  message: string
  tone: ToastTone
} | null

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

type SavedProfile = {
  name: string
  card: CardData
  theme: CardTheme
  mode: ModeType
  isMonochrome: boolean
  team: CardData[]
}

const CARD_STORAGE_KEY = "chezmiss_platinum_card"
const PROFILES_STORAGE_KEY = "chezmiss_platinum_card_profiles"

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

function validateCardData(card: CardData): string[] {
  const issues: string[] = []

  if (!card.name.trim()) issues.push("Le nom est requis")
  if (!card.title.trim()) issues.push("Le titre est requis")
  if (!card.company.trim()) issues.push("L'entreprise est requise")

  if (card.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(card.email.trim())) {
    issues.push("L'email n'est pas valide")
  }

  if (card.website.trim()) {
    try {
      new URL(card.website.trim())
    } catch {
      issues.push("Le site web doit être une URL valide")
    }
  }

  if (!card.phone.trim()) issues.push("Le numéro de téléphone est requis")

  return issues
}

function normalizeProfileName(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 40)
}

function cloneCardData(source: CardData): CardData {
  return { ...source }
}

function cloneTeamData(source: CardData[]): CardData[] {
  if (!Array.isArray(source) || source.length === 0) return [cloneCardData(defaultCard)]
  return source.map((member) => ({ ...defaultCard, ...member }))
}

function sanitizeFileStem(value: string): string {
  const trimmed = value.trim().toLowerCase()
  const normalized = trimmed.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  return normalized || "chezmiss-card"
}

function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

function buildVCard(card: CardData): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCardValue(card.name)}`,
    `ORG:${escapeVCardValue(card.company)}`,
    `TITLE:${escapeVCardValue(card.title)}`,
    `TEL;TYPE=WORK,VOICE:${escapeVCardValue(card.phone)}`,
    `EMAIL;TYPE=INTERNET:${escapeVCardValue(card.email)}`,
    `URL:${escapeVCardValue(card.website)}`,
    "END:VCARD",
  ]

  return `${lines.join("\r\n")}\r\n`
}

export default function PlatinumBusinessCardGenerator() {
  const [mode, setMode] = useState<ModeType>("standard")
  const [theme, setTheme] = useState<CardTheme>("luxe")
  const [isMonochrome, setIsMonochrome] = useState(false)
  const [card, setCard] = useState<CardData>(defaultCard)
  const [team, setTeam] = useState<CardData[]>([defaultCard])
  const [profileName, setProfileName] = useState("Carte principale")
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([])
  const [selectedProfileName, setSelectedProfileName] = useState("")
  const [toast, setToast] = useState<ToastState>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const logoInputRef = useRef<HTMLInputElement | null>(null)
  const teamLogoInputRefs = useRef<Array<HTMLInputElement | null>>([])
  const exportCardRefs = useRef<Array<HTMLDivElement | null>>([])
  const toastTimerRef = useRef<number | null>(null)

  function updateCard<K extends keyof CardData>(field: K, value: CardData[K]) {
    setCard((prev) => ({ ...prev, [field]: value }))
  }

  function addTeamCard() {
    setTeam((prev) => [
      ...prev,
      {
        ...defaultCard,
        name: "",
        title: "",
        company: defaultCard.company,
        email: "",
        phone: "",
        website: "",
        showQR: true,
      },
    ])
  }

  function updateTeamCard<K extends keyof CardData>(index: number, field: K, value: CardData[K]) {
    setTeam((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
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

  function onTeamLogoUpload(index: number, file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateTeamCard(index, "logo", reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  function notify(message: string, tone: ToastTone = "info") {
    setToast({ message, tone })
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null)
    }, 3200)
  }

  function persistProfiles(nextProfiles: SavedProfile[]) {
    setSavedProfiles(nextProfiles)
    window.localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(nextProfiles))
  }

  function isCardTheme(value: unknown): value is CardTheme {
    return value === "executive" || value === "minimal" || value === "luxe"
  }

  function saveProfile() {
    const issues = validateCardData(card)
    if (issues.length > 0) {
      notify(issues[0], "error")
      return
    }

    const name = normalizeProfileName(profileName) || `Carte ${card.name}`
    const nextProfile: SavedProfile = {
      name,
      card: cloneCardData(card),
      theme,
      mode,
      isMonochrome,
      team: cloneTeamData(team),
    }
    const nextProfiles = [...savedProfiles.filter((profile) => profile.name !== name), nextProfile].sort((a, b) =>
      a.name.localeCompare(b.name, "fr")
    )

    persistProfiles(nextProfiles)
    setSelectedProfileName(name)
    window.localStorage.setItem(
      CARD_STORAGE_KEY,
      JSON.stringify({ card, theme, mode, isMonochrome, team })
    )
    notify(`Profil \"${name}\" sauvegardé.`, "success")
  }

  function loadSelectedProfile() {
    const profile = savedProfiles.find((item) => item.name === selectedProfileName)
    if (!profile) {
      notify("Sélectionne un profil à charger.", "error")
      return
    }

    setCard(profile.card)
    setTheme(profile.theme)
    setMode(profile.mode ?? "standard")
    setIsMonochrome(Boolean(profile.isMonochrome))
    setTeam(cloneTeamData(profile.team))
    setProfileName(profile.name)
    window.localStorage.setItem(
      CARD_STORAGE_KEY,
      JSON.stringify({
        card: profile.card,
        theme: profile.theme,
        mode: profile.mode ?? "standard",
        isMonochrome: Boolean(profile.isMonochrome),
        team: cloneTeamData(profile.team),
      })
    )
    notify(`Profil \"${profile.name}\" chargé.`, "success")
  }

  function deleteSelectedProfile() {
    if (!selectedProfileName) {
      notify("Sélectionne un profil à supprimer.", "error")
      return
    }

    const nextProfiles = savedProfiles.filter((profile) => profile.name !== selectedProfileName)
    persistProfiles(nextProfiles)
    setSelectedProfileName(nextProfiles[0]?.name ?? "")
    notify(`Profil \"${selectedProfileName}\" supprimé.`, "success")
  }

  function duplicateSelectedProfile() {
    const profile = savedProfiles.find((item) => item.name === selectedProfileName)
    if (!profile) {
      notify("Sélectionne un profil à dupliquer.", "error")
      return
    }

    const baseName = `${profile.name} copie`
    let nextName = baseName
    let index = 2
    while (savedProfiles.some((item) => item.name === nextName)) {
      nextName = `${baseName} ${index}`
      index += 1
    }

    const duplicated: SavedProfile = {
      name: nextName,
      card: { ...profile.card },
      theme: profile.theme,
      mode: profile.mode ?? "standard",
      isMonochrome: Boolean(profile.isMonochrome),
      team: cloneTeamData(profile.team),
    }

    const nextProfiles = [...savedProfiles, duplicated].sort((a, b) => a.name.localeCompare(b.name, "fr"))
    persistProfiles(nextProfiles)
    setSelectedProfileName(nextName)
    notify(`Profil \"${nextName}\" dupliqué.`, "success")
  }

  async function exportAllProfilesPDF() {
    if (savedProfiles.length === 0) {
      notify("Aucun profil à exporter.", "error")
      return
    }

    const pdf = new jsPDF("portrait", "mm", "a4")
    const generatedAt = new Date().toLocaleString("fr-CA")

    for (let idx = 0; idx < savedProfiles.length; idx += 1) {
      const profile = savedProfiles[idx]
      const node = exportCardRefs.current[idx]
      if (idx > 0) pdf.addPage()

      pdf.setFontSize(16)
      pdf.text("CHEZMISS - Export Profils Cartes", 14, 18)
      pdf.setFontSize(12)
      pdf.text(`Profil: ${profile.name}`, 14, 28)
      pdf.setFontSize(10)
      pdf.text(`Theme: ${profile.theme}`, 14, 36)
      pdf.text(`Generation: ${generatedAt}`, 14, 42)

      if (node) {
        const image = await htmlToImage.toPng(node, {
          pixelRatio: 4,
          cacheBust: true,
          backgroundColor: isMonochrome ? "#000000" : profile.theme === "minimal" ? "#0f0f0f" : "#050309",
        })
        pdf.addImage(image, "PNG", 18, 56, 174, 107)
      } else {
        pdf.text("Prévisualisation non disponible pour ce profil.", 14, 56)
      }
    }

    pdf.save("CHEZMISS-PLATINUM-profils.pdf")
    notify("Export batch PDF des profils terminé.", "success")
  }

  function validateBeforeExport() {
    const issues = validateCardData(card)
    if (issues.length > 0) {
      notify(`Export bloqué: ${issues[0]}`, "error")
      return false
    }
    return true
  }

  async function capturePreview(node: HTMLElement, pixelRatio = 3) {
    return htmlToImage.toPng(node, {
      pixelRatio,
      cacheBust: true,
      backgroundColor: isMonochrome ? "#000000" : "#050309",
    })
  }

  function saveCardLocally() {
    if (typeof window === "undefined") return
    const profile: SavedProfile = {
      name: normalizeProfileName(profileName) || `Carte ${card.name}`,
      card: cloneCardData(card),
      theme,
      mode,
      isMonochrome,
      team: cloneTeamData(team),
    }
    persistProfiles([
      ...savedProfiles.filter((item) => item.name !== profile.name),
      profile,
    ].sort((a, b) => a.name.localeCompare(b.name, "fr")))
    window.localStorage.setItem(
      CARD_STORAGE_KEY,
      JSON.stringify({ card, theme, mode, isMonochrome, team })
    )
    setSelectedProfileName(profile.name)
    notify("Carte sauvegardée localement.", "success")
  }

  function loadSavedCard() {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem(CARD_STORAGE_KEY)
    if (!raw) {
      notify("Aucune sauvegarde trouvée.", "error")
      return
    }

    try {
      const parsed = JSON.parse(raw) as Partial<CardData> | { card?: Partial<CardData>; theme?: unknown }
      if (parsed && typeof parsed === "object" && "card" in parsed) {
        const savedCard = parsed.card ?? {}
        setCard((prev) => ({ ...prev, ...savedCard }))
        if (isCardTheme(parsed.theme)) {
          setTheme(parsed.theme)
        }
        if ("mode" in parsed && typeof parsed.mode === "string") {
          const savedMode = parsed.mode as ModeType
          if (["standard", "team", "a4", "hologram", "mobile"].includes(savedMode)) {
            setMode(savedMode)
          }
        }
        if ("isMonochrome" in parsed) {
          setIsMonochrome(Boolean(parsed.isMonochrome))
        }
        if ("team" in parsed && Array.isArray(parsed.team)) {
          setTeam(cloneTeamData(parsed.team as CardData[]))
        }
      } else {
        setCard((prev) => ({ ...prev, ...(parsed as Partial<CardData>) }))
      }
      notify("Carte chargée.", "success")
    } catch {
      notify("Sauvegarde invalide.", "error")
    }
  }

  async function downloadPNG() {
    if (!previewRef.current || !validateBeforeExport()) return
    const url = await capturePreview(previewRef.current, 4)
    const link = document.createElement("a")
    link.href = url
    link.download = "CHEZMISS-PLATINUM-card.png"
    link.click()
    notify("PNG haute définition généré.", "success")
  }

  async function downloadA4PDF() {
    if (!sheetRef.current || !validateBeforeExport()) return
    const url = await htmlToImage.toPng(sheetRef.current, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "#ffffff",
    })
    const pdf = new jsPDF("portrait", "mm", "a4")
    pdf.addImage(url, "PNG", 8, 8, 194, 274)
    pdf.save("CHEZMISS-PLATINUM-A4.pdf")
    notify("PDF A4 prêt à l'impression.", "success")
  }

  async function printCard() {
    if (!previewRef.current || !validateBeforeExport()) return

    const url = await capturePreview(previewRef.current, 4)
    const printWindow = window.open("", "_blank", "width=900,height=600")
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Impression carte CHEZMISS</title>
          <style>
            @page { margin: 12mm; }
            body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #111; }
            img { max-width: 100%; height: auto; display: block; }
          </style>
        </head>
        <body>
          <img src="${url}" alt="Carte" />
        </body>
      </html>
    `)
    printWindow.document.close()
    const triggerPrint = () => {
      printWindow.focus()
      printWindow.print()
    }
    if (printWindow.document.readyState === "complete") {
      triggerPrint()
    } else {
      printWindow.onload = triggerPrint
    }
    notify("Fenêtre d'impression ouverte.", "success")
  }

  async function sendCard() {
    if (!previewRef.current || !validateBeforeExport()) return

    const pngDataUrl = await capturePreview(previewRef.current, 4)
    const response = await fetch(pngDataUrl)
    const blob = await response.blob()
    const file = new File([blob], "CHEZMISS-PLATINUM-card.png", { type: "image/png" })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: "Carte CHEZMISS",
          text: `${card.name} - ${card.title}`,
          files: [file],
        })
        notify("Carte envoyée via le partage natif.", "success")
      } catch {
        notify("Partage annulé.", "info")
      }
      return
    }

    const subject = encodeURIComponent(`Carte professionnelle - ${card.name}`)
    const body = encodeURIComponent(
      `Nom: ${card.name}\nTitre: ${card.title}\nEntreprise: ${card.company}\nEmail: ${card.email}\nTelephone: ${card.phone}\nSite web: ${card.website}\n\nImage de carte a joindre: CHEZMISS-PLATINUM-card.png`
    )
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self")
    notify("Ouverture du client mail.", "success")
  }

  async function addToAppleWallet(
    sourceCard: CardData,
    options?: {
      sourceTheme?: CardTheme
      sourceMode?: ModeType
      sourceMonochrome?: boolean
      sourceProfileName?: string
      silent?: boolean
    }
  ) {
    if (!validateBeforeExport()) return

    const walletTheme = options?.sourceTheme ?? theme
    const walletMode = options?.sourceMode ?? mode
    const walletMonochrome = options?.sourceMonochrome ?? isMonochrome

    const payload = {
      name: sourceCard.name.trim(),
      title: sourceCard.title.trim(),
      company: sourceCard.company.trim(),
      phone: sourceCard.phone.trim(),
      email: sourceCard.email.trim(),
      website: sourceCard.website.trim(),
      theme: walletTheme,
      mode: walletMode,
      signature: sourceCard.signature,
      showQR: sourceCard.showQR,
      monochrome: walletMonochrome,
      logo: sourceCard.logo,
      profileName: options?.sourceProfileName,
    }

    let passDownloaded = false

    try {
      const response = await fetch("/api/wallet/apple-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const contentType = response.headers.get("content-type") || ""
        if (contentType.includes("application/vnd.apple.pkpass")) {
          const blob = await response.blob()
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download = `${sanitizeFileStem(sourceCard.name)}.pkpass`
          link.click()
          URL.revokeObjectURL(link.href)
          passDownloaded = true
          if (!options?.silent) {
            notify("Pass Apple Wallet telecharge.", "success")
          }
        }
      } else {
        const errorBody = (await response.json().catch(() => null)) as { message?: string } | null
        if (errorBody?.message && !options?.silent) {
          notify(errorBody.message, "info")
        }
      }
    } catch {
      // Fallback handled below.
    }

    if (passDownloaded) return

    const vcard = buildVCard(sourceCard)
    const fileName = `${sanitizeFileStem(sourceCard.name)}.vcf`
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" })
    const file = new File([blob], fileName, { type: "text/vcard;charset=utf-8" })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: `Contact ${sourceCard.name}`,
          text: "Carte de contact CHEZMISS",
          files: [file],
        })
        if (!options?.silent) {
          notify("Contact partage au format vCard.", "info")
        }
        return
      } catch {
        // Continue with direct download.
      }
    }

    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    URL.revokeObjectURL(link.href)
    if (!options?.silent) {
      notify("Service Apple Wallet non configure. Fichier vCard telecharge en alternative.", "info")
    }
  }

  async function addSelectedProfileToAppleWallet() {
    const profile = savedProfiles.find((item) => item.name === selectedProfileName)
    if (!profile) {
      notify("Selectionne un profil a ajouter au Wallet.", "error")
      return
    }

    await addToAppleWallet(profile.card, {
      sourceTheme: profile.theme,
      sourceMode: profile.mode ?? "standard",
      sourceMonochrome: Boolean(profile.isMonochrome),
      sourceProfileName: profile.name,
    })
  }

  async function addTeamToAppleWallet() {
    if (team.length === 0) {
      notify("Aucune carte equipe a ajouter.", "error")
      return
    }

    let processed = 0
    for (let idx = 0; idx < team.length; idx += 1) {
      const member = team[idx]
      const issues = validateCardData(member)
      if (issues.length > 0) {
        continue
      }
      await addToAppleWallet(member, {
        sourceTheme: theme,
        sourceMode: "team",
        sourceMonochrome: isMonochrome,
        sourceProfileName: `Equipe ${idx + 1}`,
        silent: true,
      })
      processed += 1
    }

    if (processed === 0) {
      notify("Aucune carte equipe valide pour Wallet.", "error")
      return
    }

    notify(`${processed} carte(s) equipe envoyee(s) vers Wallet/vCard.`, "success")
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const rawProfiles = window.localStorage.getItem(PROFILES_STORAGE_KEY)
      if (rawProfiles) {
        const parsed = JSON.parse(rawProfiles) as SavedProfile[]
        if (Array.isArray(parsed)) {
          const normalizedProfiles = parsed
            .filter((item) => item && typeof item.name === "string" && item.card)
            .map((item) => ({
              name: normalizeProfileName(item.name) || `Carte ${item.card?.name ?? "sans nom"}`,
              card: { ...defaultCard, ...item.card },
              theme: isCardTheme((item as Partial<SavedProfile>).theme) ? (item as SavedProfile).theme : "luxe",
            }))
          setSavedProfiles(normalizedProfiles)
          setSelectedProfileName(normalizedProfiles[0]?.name ?? "")
        }
      } else {
        const legacy = window.localStorage.getItem(CARD_STORAGE_KEY)
        if (legacy) {
          const parsed = JSON.parse(legacy) as Partial<CardData> | { card?: Partial<CardData>; theme?: unknown }
          const migratedCard = {
            ...defaultCard,
            ...(parsed && typeof parsed === "object" && "card" in parsed ? (parsed.card ?? {}) : (parsed as Partial<CardData>)),
          }
          const migratedTheme =
            parsed && typeof parsed === "object" && "theme" in parsed && isCardTheme(parsed.theme)
              ? parsed.theme
              : "luxe"
          setCard(migratedCard)
          setTheme(migratedTheme)
          const legacyProfile = { name: "Dernière carte", card: migratedCard, theme: migratedTheme }
          setSavedProfiles([legacyProfile])
          setSelectedProfileName(legacyProfile.name)
        }
      }
    } catch {
      notify("Impossible de lire les sauvegardes locales.", "error")
    }
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  const validationIssues = validateCardData(card)
  const themeLabel = theme === "executive" ? "Executive" : theme === "minimal" ? "Minimal" : "Luxe"
  const themeCaption =
    theme === "executive"
      ? "Boardroom precision"
      : theme === "minimal"
        ? "Quiet luxury"
        : "Jewelled contrast"
  const modeLabel =
    mode === "standard"
      ? "Studio"
      : mode === "team"
        ? "Equipe"
        : mode === "a4"
          ? "Impression"
          : mode === "hologram"
            ? "Hologram"
            : "Mobile"
  const chromeShell =
    "rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
  const chromeField =
    "bg-black/55 border border-[#D4AF37]/45 rounded-xl px-3 py-2 text-sm text-white outline-none transition duration-200 placeholder:text-white/30 focus:border-[#D4AF37] focus:bg-black/70 focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
  const chromeSelect =
    "bg-black/65 border border-[#D4AF37]/50 rounded-xl px-3 py-2 text-sm text-white outline-none transition duration-200 focus:border-[#D4AF37] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
  const chromeButton =
    "rounded-xl px-3.5 py-2 text-sm font-semibold tracking-[0.08em] uppercase transition duration-200 active:scale-[0.98]"
  const chromeButtonPrimary =
    `${chromeButton} bg-[linear-gradient(135deg,#d4af37_0%,#f7e3a4_45%,#b58b18_100%)] text-black shadow-[0_14px_28px_rgba(212,175,55,0.22)] hover:shadow-[0_18px_36px_rgba(212,175,55,0.32)]`
  const chromeButtonSecondary =
    `${chromeButton} border border-[#D4AF37]/45 bg-white/5 text-[#f7e3a4] hover:bg-white/10 hover:border-[#D4AF37]/70`
  const chromeButtonDanger =
    `${chromeButton} border border-red-400/40 bg-red-500/10 text-red-100 hover:bg-red-500/15 hover:border-red-400/60`
  const chromeBadge =
    "rounded-full border border-[#D4AF37]/25 bg-white/5 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-[#f7e3a4]"
  const chromeMetric =
    "rounded-2xl border border-white/10 bg-black/25 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"

  function fieldBorder(field: keyof CardData) {
    const hasIssue = validationIssues.some((issue) => {
      if (field === "name") return issue.includes("nom")
      if (field === "title") return issue.includes("titre")
      if (field === "company") return issue.includes("entreprise")
      if (field === "phone") return issue.includes("téléphone") || issue.includes("numéro")
      if (field === "email") return issue.includes("email")
      if (field === "website") return issue.includes("site web")
      return false
    })
    return hasIssue ? "border-red-400/70" : "border-[#D4AF37]/50"
  }

  function renderSignature(sig: SignatureType) {
    if (sig === "none") return null
    if (sig === "chezmiss") return "CHEZMISS"
    if (sig === "kentley") return "Made by Kentley · Milele Inc."
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 flex flex-col gap-8 overflow-hidden">
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-full border px-4 py-2 text-xs font-medium shadow-2xl backdrop-blur-xl ${
            toast.tone === "success"
              ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
              : toast.tone === "error"
                ? "border-red-400/40 bg-red-500/15 text-red-100"
                : "border-white/20 bg-black/60 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* BACKGROUND FUTURISTE */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 left-10 w-72 h-72 bg-[#D4AF37]/20 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-sky-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/25 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* HEADER */}
      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.9fr] items-stretch">
        <div className={`${chromeShell} p-5 md:p-6 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.35),_transparent_36%)]" />
          <div className="relative space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className={chromeBadge}>Platinum suite</div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-white/70">
                {themeLabel} / {modeLabel}
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-white/70">
                {savedProfiles.length} profils
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black tracking-[0.18em] text-transparent bg-clip-text bg-[linear-gradient(135deg,#f7e3a4_0%,#d4af37_34%,#ffffff_58%,#b58b18_100%)] drop-shadow-[0_0_24px_rgba(212,175,55,0.18)] font-serif uppercase">
                CHEZMISS PLATINUM SUITE
              </h1>
              <p className="max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
                Business card generator conçu comme un atelier de direction artistique: validation, templates éditoriaux,
                export batch et finitions premium pour des cartes qui semblent déjà imprimées en papier de luxe.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em]">
              <span className={chromeBadge}>{themeCaption}</span>
              <span className={chromeBadge}>{validationIssues.length === 0 ? "Prêt à exporter" : `${validationIssues.length} alerte(s)`}</span>
              <span className={chromeBadge}>{isMonochrome ? "Monochrome" : "Couleur"}</span>
            </div>
          </div>
        </div>

        <div className={`${chromeShell} p-5 md:p-6 space-y-3`}>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">Atelier status</div>
          <div className={chromeMetric}>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">Validation</div>
            <div className="mt-1 text-sm text-white">
              {validationIssues.length === 0 ? "Aucune erreur bloquante" : `${validationIssues.length} point(s) à corriger`}
            </div>
          </div>
          <div className={chromeMetric}>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">Mode actif</div>
            <div className="mt-1 text-sm text-white">{modeLabel}</div>
          </div>
          <div className={chromeMetric}>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">Template</div>
            <div className="mt-1 text-sm text-white">{themeLabel}</div>
          </div>
          <p className="text-[11px] leading-relaxed text-white/55">
            Designed & Engineered by <span className="text-[#D4AF37]">Kentley · Milele Inc.</span>
          </p>
        </div>
      </div>

      {/* BARRE D’OPTIONS */}
      <div className={`${chromeShell} flex flex-wrap justify-between items-center gap-4 text-xs p-4`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="opacity-70 uppercase tracking-[0.2em]">Mode</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as ModeType)}
            className={chromeSelect}
          >
            <option value="standard">Standard</option>
            <option value="team">Équipe</option>
            <option value="a4">Planche A4</option>
            <option value="hologram">Hologram 3D</option>
            <option value="mobile">Mobile</option>
          </select>

          <span className="opacity-70 ml-3 uppercase tracking-[0.2em]">Template</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as CardTheme)}
            className={chromeSelect}
          >
            <option value="executive">Executive</option>
            <option value="minimal">Minimal</option>
            <option value="luxe">Luxe</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className="opacity-70 uppercase tracking-[0.2em]">Signature</span>
          <select
            value={card.signature}
            onChange={(e) => updateCard("signature", e.target.value as SignatureType)}
            className={chromeSelect}
          >
            <option value="chezmiss">CHEZMISS</option>
            <option value="kentley">Kentley · Milele Inc.</option>
            <option value="none">Aucune</option>
          </select>

          <label className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-white/5 px-3 py-2 cursor-pointer transition hover:bg-white/10">
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
            className={chromeButtonSecondary}
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
            className={chromeButtonSecondary}
          >
            Retirer logo
          </button>
        </div>
      </div>

      {mode === "standard" && (
        <div className={`${chromeShell} grid grid-cols-1 md:grid-cols-3 gap-3 p-4 text-xs`}>
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="opacity-70 uppercase tracking-[0.2em]">Nom du profil</span>
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className={`min-w-[220px] ${chromeField}`}
                placeholder="Ex: Carte Kentley"
              />
              <button
                type="button"
                onClick={saveProfile}
                className={chromeButtonPrimary}
              >
                Sauvegarder profil
              </button>
              <button
                type="button"
                onClick={saveCardLocally}
                className={chromeButtonSecondary}
              >
                Sauvegarde rapide
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="opacity-70 uppercase tracking-[0.2em]">Profils enregistrés</span>
              <select
                value={selectedProfileName}
                onChange={(e) => setSelectedProfileName(e.target.value)}
                className={`min-w-[220px] ${chromeSelect}`}
              >
                <option value="">Choisir un profil</option>
                {savedProfiles.map((profile) => (
                  <option key={profile.name} value={profile.name}>
                    {profile.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={loadSelectedProfile}
                className={chromeButtonSecondary}
              >
                Charger
              </button>
              <button
                type="button"
                onClick={deleteSelectedProfile}
                className={chromeButtonDanger}
              >
                Supprimer
              </button>
              <button
                type="button"
                onClick={duplicateSelectedProfile}
                className={chromeButtonSecondary}
              >
                Dupliquer
              </button>
              <button
                type="button"
                onClick={exportAllProfilesPDF}
                className={chromeButtonPrimary}
              >
                Export profils PDF
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-[#D4AF37]/20 bg-black/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">Contrôle qualité</div>
            {validationIssues.length === 0 ? (
              <p className="mt-2 text-emerald-200">Carte prête pour l’export et l’impression.</p>
            ) : (
              <ul className="mt-2 space-y-1 text-red-200">
                {validationIssues.slice(0, 3).map((issue) => (
                  <li key={issue}>• {issue}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* CONTENU SELON LE MODE */}
      {mode === "standard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* FORM */}
          <div className={`${chromeShell} space-y-4 text-sm p-4`}>
            {[
              { key: "name", label: "Nom" },
              { key: "title", label: "Titre" },
              { key: "company", label: "Entreprise" },
              { key: "phone", label: "Téléphone" },
              { key: "email", label: "Email" },
              { key: "website", label: "Site web" },
            ].map((f) => (
              <div key={f.key} className="flex flex-col gap-1">
                <label className="opacity-70 uppercase tracking-[0.2em] text-[10px]">{f.label}</label>
                <input
                  className={`${chromeField} ${fieldBorder(f.key as keyof CardData)}`}
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

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={downloadPNG}
                className={`${chromeButtonPrimary} sm:col-span-2`}
              >
                Télécharger PNG HD
              </button>
              <button
                onClick={printCard}
                className={chromeButtonSecondary}
              >
                Imprimer
              </button>
              <button
                onClick={saveCardLocally}
                className={chromeButtonSecondary}
              >
                Sauvegarder
              </button>
              <button
                onClick={loadSavedCard}
                className={chromeButtonSecondary}
              >
                Charger
              </button>
              <button
                onClick={sendCard}
                className={chromeButtonSecondary}
              >
                Envoyer
              </button>
              <button
                onClick={() => addToAppleWallet(card, {
                  sourceTheme: theme,
                  sourceMode: mode,
                  sourceMonochrome: isMonochrome,
                })}
                className={chromeButtonPrimary}
              >
                Ajouter a Apple Wallet
              </button>
              <button
                onClick={addSelectedProfileToAppleWallet}
                className={chromeButtonSecondary}
              >
                Wallet profil selectionne
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
                theme={theme}
              />
            </div>
          </div>
        </div>
      )}

      {mode === "team" && (
        <div className={`${chromeShell} space-y-4 p-4`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#D4AF37] tracking-[0.18em] uppercase">Équipe</h2>
            <button
              onClick={addTeamCard}
              className={chromeButtonSecondary}
            >
              Ajouter une carte
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <div key={i} className="space-y-3 rounded-2xl border border-white/8 bg-black/25 p-3">
                <input
                  className={`w-full ${chromeField}`}
                  placeholder="Nom"
                  value={member.name}
                  onChange={(e) => updateTeamCard(i, "name", e.target.value)}
                />
                <input
                  className={`w-full ${chromeField}`}
                  placeholder="Titre"
                  value={member.title}
                  onChange={(e) => updateTeamCard(i, "title", e.target.value)}
                />
                <input
                  className={`w-full ${chromeField}`}
                  placeholder="Entreprise"
                  value={member.company}
                  onChange={(e) => updateTeamCard(i, "company", e.target.value)}
                />
                <input
                  className={`w-full ${chromeField}`}
                  placeholder="Téléphone"
                  value={member.phone}
                  onChange={(e) => updateTeamCard(i, "phone", e.target.value)}
                />
                <input
                  className={`w-full ${chromeField}`}
                  placeholder="Email"
                  value={member.email}
                  onChange={(e) => updateTeamCard(i, "email", e.target.value)}
                />
                <input
                  className={`w-full ${chromeField}`}
                  placeholder="Site web"
                  value={member.website}
                  onChange={(e) => updateTeamCard(i, "website", e.target.value)}
                />
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="inline-flex items-center gap-2 text-xs opacity-80">
                    <input
                      type="checkbox"
                      checked={member.showQR}
                      onChange={(e) => updateTeamCard(i, "showQR", e.target.checked)}
                    />
                    QR code
                  </label>
                  <button
                    type="button"
                    onClick={() => teamLogoInputRefs.current[i]?.click()}
                    className={chromeButtonSecondary}
                  >
                    Logo
                  </button>
                  <button
                    type="button"
                    onClick={() => updateTeamCard(i, "logo", undefined)}
                    className={chromeButtonSecondary}
                  >
                    Retirer
                  </button>
                  <input
                    ref={(el) => {
                      teamLogoInputRefs.current[i] = el
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onTeamLogoUpload(i, e.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => addToAppleWallet(member, {
                      sourceTheme: theme,
                      sourceMode: "team",
                      sourceMonochrome: isMonochrome,
                      sourceProfileName: `Equipe ${i + 1}`,
                    })}
                    className={chromeButtonPrimary}
                  >
                    Apple Wallet
                  </button>
                </div>
                <PlatinumCard data={member} signature={renderSignature(card.signature)} theme={theme} />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={addTeamToAppleWallet}
              className={chromeButtonPrimary}
            >
              Ajouter toute l'equipe au Wallet
            </button>
          </div>
        </div>
      )}

      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        {savedProfiles.map((profile, idx) => (
          <div
            key={`${profile.name}-${idx}`}
            ref={(el) => {
              exportCardRefs.current[idx] = el
            }}
          >
            <PlatinumCard
              data={profile.card}
              signature={renderSignature(profile.card.signature)}
              monochrome={isMonochrome}
              theme={profile.theme}
            />
          </div>
        ))}
      </div>

      {mode === "a4" && (
        <div className={`${chromeShell} space-y-4 p-4`}>
          <button
            onClick={downloadA4PDF}
            className={chromeButtonPrimary}
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
                  theme={theme}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "hologram" && (
        <div className="flex flex-col items-center gap-3">
          <PlatinumCard
            data={card}
            signature={renderSignature(card.signature)}
            hologram
            monochrome={isMonochrome}
            theme={theme}
          />
          <button
            onClick={() => addToAppleWallet(card, {
              sourceTheme: theme,
              sourceMode: "hologram",
              sourceMonochrome: isMonochrome,
            })}
            className={chromeButtonPrimary}
          >
            Ajouter mode Hologram au Wallet
          </button>
        </div>
      )}

      {mode === "mobile" && (
        <div className="max-w-xs mx-auto flex flex-col items-center gap-3">
          <PlatinumCard
            data={card}
            signature={renderSignature(card.signature)}
            monochrome={isMonochrome}
            theme={theme}
          />
          <button
            onClick={() => addToAppleWallet(card, {
              sourceTheme: theme,
              sourceMode: "mobile",
              sourceMonochrome: isMonochrome,
            })}
            className={chromeButtonPrimary}
          >
            Ajouter mode Mobile au Wallet
          </button>
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
  theme = "luxe",
}: {
  data: CardData
  signature: string | null
  hologram?: boolean
  plain?: boolean
  monochrome?: boolean
  theme?: CardTheme
}) {
  const qrValue = `${data.name} · ${data.title} · ${data.company} · ${data.phone} · ${data.email} · ${data.website}`
  const themeMeta = {
    executive: {
      label: "Executive",
      descriptor: "Boardroom precision",
      footer: "Precision / Authority / Clarity",
      rail: "Executive dossier",
    },
    minimal: {
      label: "Minimal",
      descriptor: "Quiet luxury",
      footer: "Calm / Space / Restraint",
      rail: "Minimal dossier",
    },
    luxe: {
      label: "Luxe",
      descriptor: "Jewelled contrast",
      footer: "Ritual / Glow / Statement",
      rail: "Platinum dossier",
    },
  }[theme]
  const themeLabel = themeMeta.label

  const themeStyles = {
    executive: {
      border: monochrome ? "border-white/35" : "border-sky-300/35",
      background: monochrome
        ? "bg-gradient-to-br from-black via-[#161616] to-black"
        : "bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(135deg,_#04070d_0%,_#0b1220_52%,_#05070a_100%)]",
      accent: monochrome ? "text-white/85" : "text-sky-200",
      glowA: monochrome ? "bg-white/8" : "bg-sky-400/18",
      glowB: monochrome ? "bg-white/8" : "bg-cyan-400/14",
    },
    minimal: {
      border: monochrome ? "border-white/50" : "border-zinc-200/70",
      background: monochrome
        ? "bg-gradient-to-br from-black via-[#181818] to-black"
        : "bg-[linear-gradient(135deg,_#ffffff_0%,_#fafafa_58%,_#f3f4f6_100%)]",
      accent: monochrome ? "text-white/90" : "text-zinc-900",
      glowA: monochrome ? "bg-white/5" : "bg-zinc-300/12",
      glowB: monochrome ? "bg-white/4" : "bg-zinc-100/10",
    },
    luxe: {
      border: monochrome ? "border-white/40" : "border-[#D4AF37]/50",
      background: monochrome
        ? "bg-gradient-to-br from-black via-[#181818] to-black"
        : "bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_22%),linear-gradient(135deg,_#050408_0%,_#120b18_50%,_#07050a_100%)]",
      accent: monochrome ? "text-white/90" : "text-[#D4AF37]",
      glowA: monochrome ? "bg-white/10" : "bg-[#D4AF37]/20",
      glowB: monochrome ? "bg-white/10" : "bg-purple-500/22",
    },
  } satisfies Record<CardTheme, { border: string; background: string; accent: string; glowA: string; glowB: string }>

  const currentTheme = themeStyles[theme]
  const isMinimal = theme === "minimal"
  const isExecutive = theme === "executive"
  const isLuxe = theme === "luxe"
  const logoFrame = monochrome
    ? "border-white/30 bg-black/55"
    : isMinimal
      ? "border-zinc-300/80 bg-white"
      : isExecutive
        ? "border-sky-200/30 bg-slate-950/70"
        : "border-[#D4AF37]/35 bg-black/55"
  const qrFrame = monochrome
    ? "border-white/30 bg-black/55"
    : isMinimal
      ? "border-zinc-300/80 bg-white"
      : isExecutive
        ? "border-sky-200/30 bg-slate-950/70"
        : "border-[#D4AF37]/35 bg-black/55"
  const qrForeground = monochrome ? "#FFFFFF" : isMinimal ? "#111111" : isExecutive ? "#BAE6FD" : "#D4AF37"
  const titleTone = monochrome ? "text-white/75" : isMinimal ? "text-zinc-700" : isExecutive ? "text-slate-200/80" : "text-white/70"
  const detailsTone = monochrome ? "text-white/80" : isMinimal ? "text-zinc-700" : "text-white/80"
  const nameTone = monochrome
    ? "text-white"
    : isMinimal
      ? "text-zinc-950 tracking-[0.06em]"
      : isExecutive
        ? "text-white tracking-[0.03em]"
        : "text-white tracking-[0.05em]"
  const nameStyle = isLuxe && !monochrome ? "font-serif italic" : ""
  const chipTone = monochrome
    ? "border-white/20 bg-white/5 text-white/80"
    : isMinimal
      ? "border-zinc-300 bg-white text-zinc-700"
      : isExecutive
        ? "border-sky-200/20 bg-sky-300/10 text-sky-100"
        : "border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#f7e3a4]"
  const ruleTone = monochrome
    ? "from-white/30 via-white/10 to-white/30"
    : isMinimal
      ? "from-zinc-300/70 via-zinc-200/20 to-zinc-300/70"
      : isExecutive
        ? "from-sky-200/70 via-sky-200/20 to-sky-200/70"
        : "from-[#D4AF37]/70 via-[#f7e3a4]/20 to-[#D4AF37]/70"
  const railTone = monochrome
    ? "text-white/55"
    : isMinimal
      ? "text-zinc-500"
      : isExecutive
        ? "text-sky-100/65"
        : "text-[#f7e3a4]/70"

  if (plain) {
    return (
      <div className="w-[340px] h-[210px] border border-gray-300 rounded-xl p-4 flex flex-col justify-between bg-white text-black shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#B79A5B]">{data.company}</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-zinc-400">{themeMeta.descriptor}</div>
            <div className="mt-1 text-lg font-semibold text-zinc-950">{data.name}</div>
            <div className="text-xs text-zinc-600">{data.title}</div>
          </div>
          <div className="space-y-2 text-right">
            <div className="text-[9px] uppercase tracking-[0.22em] rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-zinc-600">
              {themeLabel}
            </div>
            <div className="text-[8px] uppercase tracking-[0.24em] text-zinc-400">{themeMeta.rail}</div>
          </div>
        </div>

        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div className="text-[10px] space-y-1 mt-2 text-zinc-700">
          <div>{data.phone}</div>
          <div>{data.email}</div>
          <div>{data.website}</div>
        </div>
        {signature && (
          <div className="flex items-end justify-between gap-3 mt-1">
            <div className="text-[8px] uppercase tracking-[0.22em] text-zinc-400">{themeMeta.footer}</div>
            <div className="text-[8px] uppercase tracking-[0.2em] opacity-60 text-right">{signature}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative w-[340px] h-[210px] rounded-xl overflow-hidden border p-4 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.9)] ${currentTheme.border} ${currentTheme.background}`}
    >
      {/* Layers futuristes */}
      <div className={`absolute -top-20 -right-10 w-40 h-40 blur-3xl ${currentTheme.glowA}`} />
      <div className={`absolute bottom-[-40px] left-[-20px] w-40 h-40 blur-3xl ${currentTheme.glowB}`} />
      <div className="absolute inset-0 opacity-[0.14] mix-blend-screen bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.22)_49%,transparent_52%,transparent_100%)] bg-[length:240%_240%]" />
      {!isMinimal && !monochrome && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.25)_100%)]" />}
      {hologram && (
        <div
          className={`absolute inset-0 mix-blend-screen opacity-70 animate-pulse ${
            monochrome
              ? "bg-[conic-gradient(from_180deg,_rgba(255,255,255,0.15),_transparent,_rgba(120,120,120,0.2),_transparent,_rgba(255,255,255,0.15))]"
              : "bg-[conic-gradient(from_180deg,_rgba(212,175,55,0.25),_transparent,_rgba(168,85,247,0.25),_transparent,_rgba(212,175,55,0.25))]"
          }`}
        ></div>
      )}

      <div className="relative flex justify-between gap-3">
        <div className="min-w-0">
          <div className={`text-[10px] uppercase tracking-[0.3em] ${currentTheme.accent}`}>
            {data.company}
          </div>
          <div className={`mt-2 text-[10px] uppercase tracking-[0.28em] ${isMinimal ? "text-zinc-400" : "text-white/55"}`}>
            {themeMeta.descriptor}
          </div>
          <div className={`mt-1 text-lg font-semibold leading-tight ${nameTone} ${nameStyle}`}>
            {data.name}
          </div>
          <div className={`text-xs leading-snug ${titleTone}`}>{data.title}</div>
        </div>

        <div className="flex items-start gap-2">
          {data.logo && (
            <div className={`rounded-lg p-1 border backdrop-blur-md ${logoFrame}`}>
              <img
                src={data.logo}
                alt="Logo"
                className={`w-[44px] h-[44px] object-contain ${monochrome ? "grayscale contrast-125 brightness-125" : isMinimal ? "mix-blend-multiply" : ""}`}
              />
            </div>
          )}

          {data.showQR && (
            <div className={`rounded-lg p-1 border backdrop-blur-md ${qrFrame}`}>
              <QRCodeCanvas
                value={qrValue}
                size={70}
                bgColor={isMinimal && !monochrome ? "#FFFFFF" : "transparent"}
                fgColor={qrForeground}
              />
            </div>
          )}
        </div>
      </div>

      <div className={`relative mt-4 h-px bg-gradient-to-r ${ruleTone}`} />

      <div className={`relative text-[10px] space-y-1 mt-3 ${detailsTone}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="uppercase tracking-[0.24em] text-[9px] opacity-60">Contact</span>
          <span className={`text-[8px] uppercase tracking-[0.24em] ${railTone}`}>{themeMeta.rail}</span>
        </div>
        <div>{data.phone}</div>
        <div>{data.email}</div>
        <div>{data.website}</div>
      </div>

      {signature && (
        <div className="relative flex items-center justify-between gap-3 mt-2 text-[9px]">
          <div className={`rounded-full border px-2 py-1 ${chipTone}`}>
            {themeLabel}
          </div>
          <div className="flex items-center gap-3 text-right">
            <div className={`text-[8px] uppercase tracking-[0.22em] ${isMinimal ? "text-zinc-400" : "text-white/45"}`}>
              {themeMeta.footer}
            </div>
            <div>{signature}</div>
          </div>
        </div>
      )}
    </div>
  )
}
