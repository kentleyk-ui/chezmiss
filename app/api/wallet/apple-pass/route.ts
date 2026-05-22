import { NextResponse } from "next/server"

type AppleWalletPassPayload = {
  name?: string
  title?: string
  company?: string
  phone?: string
  email?: string
  website?: string
  theme?: "executive" | "minimal" | "luxe"
  mode?: "standard" | "team" | "a4" | "hologram" | "mobile"
  signature?: "chezmiss" | "kentley" | "none"
  showQR?: boolean
  monochrome?: boolean
  watchOptimized?: boolean
  logo?: string
  profileName?: string
}

type ThemePalette = {
  backgroundColor: string
  foregroundColor: string
  labelColor: string
}

function normalizeTheme(theme: AppleWalletPassPayload["theme"]): "executive" | "minimal" | "luxe" {
  if (theme === "executive" || theme === "minimal" || theme === "luxe") {
    return theme
  }
  return "luxe"
}

function getThemePalette(theme: "executive" | "minimal" | "luxe"): ThemePalette {
  if (theme === "executive") {
    return {
      backgroundColor: "rgb(10, 18, 30)",
      foregroundColor: "rgb(234, 244, 255)",
      labelColor: "rgb(140, 187, 255)",
    }
  }

  if (theme === "minimal") {
    return {
      backgroundColor: "rgb(245, 245, 245)",
      foregroundColor: "rgb(20, 20, 20)",
      labelColor: "rgb(96, 96, 96)",
    }
  }

  return {
    backgroundColor: "rgb(18, 11, 24)",
    foregroundColor: "rgb(245, 231, 184)",
    labelColor: "rgb(212, 175, 55)",
  }
}

function buildVCardMessage(payload: Required<Pick<AppleWalletPassPayload, "name" | "title" | "company" | "phone">> & Partial<AppleWalletPassPayload>): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${payload.name}`,
    `ORG:${payload.company}`,
    `TITLE:${payload.title}`,
    `TEL;TYPE=WORK,VOICE:${payload.phone}`,
  ]

  if (payload.email?.trim()) {
    lines.push(`EMAIL;TYPE=INTERNET:${payload.email.trim()}`)
  }
  if (payload.website?.trim()) {
    lines.push(`URL:${payload.website.trim()}`)
  }

  lines.push("END:VCARD")
  return `${lines.join("\\n")}\\n`
}

function buildPassServicePayload(payload: AppleWalletPassPayload) {
  const name = payload.name!.trim()
  const title = payload.title!.trim()
  const company = payload.company!.trim()
  const phone = payload.phone!.trim()
  const email = payload.email?.trim() ?? ""
  const website = payload.website?.trim() ?? ""
  const theme = normalizeTheme(payload.theme)
  const mode = payload.mode ?? "standard"
  const signature = payload.signature ?? "chezmiss"
  const showQR = payload.showQR !== false
  const monochrome = Boolean(payload.monochrome)
  const watchOptimized = payload.watchOptimized !== false
  const hasLogo = Boolean(payload.logo)
  const profileName = payload.profileName?.trim() || "Carte principale"
  const palette = getThemePalette(theme)

  const passTypeIdentifier = process.env.APPLE_WALLET_PASS_TYPE_IDENTIFIER ?? ""
  const teamIdentifier = process.env.APPLE_WALLET_TEAM_IDENTIFIER ?? ""
  const organizationName = process.env.APPLE_WALLET_ORGANIZATION_NAME ?? "CHEZMISS"
  const webServiceURL = process.env.APPLE_WALLET_WEB_SERVICE_URL
  const authenticationToken = process.env.APPLE_WALLET_AUTH_TOKEN

  const secondaryFields = [
    {
      key: "title",
      label: "Title",
      value: title,
    },
    {
      key: "phone",
      label: "Phone",
      value: phone,
    },
  ]

  if (email) {
    secondaryFields.push({
      key: "email",
      label: "Email",
      value: email,
    })
  }

  const backFields = [
    {
      key: "company",
      label: "Company",
      value: company,
    },
    {
      key: "theme",
      label: "Theme",
      value: theme,
    },
    {
      key: "mode",
      label: "Mode",
      value: mode,
    },
    {
      key: "signature",
      label: "Signature",
      value: signature,
    },
    {
      key: "visual",
      label: "Visual",
      value: monochrome ? "monochrome" : "color",
    },
    {
      key: "qr",
      label: "QR",
      value: showQR ? "enabled" : "disabled",
    },
    {
      key: "logo",
      label: "Logo",
      value: hasLogo ? "custom" : "none",
    },
    {
      key: "profile",
      label: "Profile",
      value: profileName,
    },
  ]

  if (website) {
    backFields.push({
      key: "website",
      label: "Website",
      value: website,
    })
  }

  const watchSecondaryFields = [
    {
      key: "watchTitle",
      label: "Role",
      value: title,
    },
    {
      key: "watchPhone",
      label: "Phone",
      value: phone,
    },
  ]

  const watchAuxiliaryFields = [
    {
      key: "watchCompany",
      label: "Company",
      value: company,
    },
  ]

  if (email) {
    watchAuxiliaryFields.push({
      key: "watchEmail",
      label: "Email",
      value: email,
    })
  }

  return {
    pass: {
      formatVersion: 1,
      passTypeIdentifier,
      teamIdentifier,
      organizationName,
      serialNumber: `chezmiss-${crypto.randomUUID()}`,
      description: "CHEZMISS digital business card",
      logoText: company,
      suppressStripShine: true,
      backgroundColor: palette.backgroundColor,
      foregroundColor: palette.foregroundColor,
      labelColor: palette.labelColor,
      barcode: {
        format: "PKBarcodeFormatQR",
        message: buildVCardMessage({ name, title, company, phone, email, website }),
        messageEncoding: "iso-8859-1",
      },
      generic: {
        primaryFields: [
          {
            key: "name",
            label: "Name",
            value: name,
          },
        ],
        secondaryFields: watchOptimized ? watchSecondaryFields : secondaryFields,
        auxiliaryFields: watchOptimized
          ? watchAuxiliaryFields
          : [
              {
                key: "companyAux",
                label: "Company",
                value: company,
              },
            ],
        backFields,
      },
      metadata: {
        theme,
        mode,
        signature,
        monochrome,
        watchOptimized,
        showQR,
        hasLogo,
        profileName,
        source: "chezmiss-staff",
      },
      ...(webServiceURL && authenticationToken ? { webServiceURL, authenticationToken } : {}),
    },
  }
}

function hasRequiredFields(payload: AppleWalletPassPayload): boolean {
  return Boolean(payload.name?.trim() && payload.title?.trim() && payload.company?.trim() && payload.phone?.trim())
}

export async function POST(req: Request) {
  let payload: AppleWalletPassPayload

  try {
    payload = (await req.json()) as AppleWalletPassPayload
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "Invalid payload." },
      { status: 400 }
    )
  }

  if (!hasRequiredFields(payload)) {
    return NextResponse.json(
      { error: "missing_required_fields", message: "name, title, company, and phone are required." },
      { status: 400 }
    )
  }

  const passServiceUrl = process.env.APPLE_WALLET_PASS_URL
  const passServiceToken = process.env.APPLE_WALLET_PASS_TOKEN

  if (!passServiceUrl) {
    return NextResponse.json(
      {
        error: "apple_wallet_not_configured",
        message: "APPLE_WALLET_PASS_URL is not configured on the server.",
      },
      { status: 501 }
    )
  }

  const passTypeIdentifier = process.env.APPLE_WALLET_PASS_TYPE_IDENTIFIER
  const teamIdentifier = process.env.APPLE_WALLET_TEAM_IDENTIFIER
  if (!passTypeIdentifier || !teamIdentifier) {
    return NextResponse.json(
      {
        error: "apple_wallet_missing_identifiers",
        message: "APPLE_WALLET_PASS_TYPE_IDENTIFIER and APPLE_WALLET_TEAM_IDENTIFIER are required.",
      },
      { status: 501 }
    )
  }

  try {
    const passPayload = buildPassServicePayload(payload)

    const upstreamResponse = await fetch(passServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(passServiceToken ? { Authorization: `Bearer ${passServiceToken}` } : {}),
      },
      body: JSON.stringify(passPayload),
      cache: "no-store",
    })

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error: "apple_wallet_service_error",
          message: `Wallet service failed with status ${upstreamResponse.status}.`,
        },
        { status: 502 }
      )
    }

    const contentType = upstreamResponse.headers.get("content-type") || ""
    if (!contentType.includes("application/vnd.apple.pkpass")) {
      return NextResponse.json(
        {
          error: "invalid_pass_content_type",
          message: "Wallet service did not return a pkpass file.",
        },
        { status: 502 }
      )
    }

    const passBuffer = await upstreamResponse.arrayBuffer()

    return new NextResponse(passBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": 'attachment; filename="chezmiss-card.pkpass"',
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return NextResponse.json(
      {
        error: "apple_wallet_proxy_error",
        message: "Could not reach Apple Wallet pass service.",
      },
      { status: 502 }
    )
  }
}
