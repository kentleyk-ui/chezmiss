import { NextResponse } from "next/server"

type AppleWalletPassPayload = {
  name?: string
  title?: string
  company?: string
  phone?: string
  email?: string
  website?: string
  theme?: "executive" | "minimal" | "luxe"
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

  try {
    const upstreamResponse = await fetch(passServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(passServiceToken ? { Authorization: `Bearer ${passServiceToken}` } : {}),
      },
      body: JSON.stringify(payload),
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
