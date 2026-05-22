import { NextResponse } from "next/server"

export async function GET() {
  const checks = {
    passServiceUrl: Boolean(process.env.APPLE_WALLET_PASS_URL),
    passTypeIdentifier: Boolean(process.env.APPLE_WALLET_PASS_TYPE_IDENTIFIER),
    teamIdentifier: Boolean(process.env.APPLE_WALLET_TEAM_IDENTIFIER),
    passTokenConfigured: Boolean(process.env.APPLE_WALLET_PASS_TOKEN),
  }

  const ready = checks.passServiceUrl && checks.passTypeIdentifier && checks.teamIdentifier

  return NextResponse.json({
    ready,
    checks,
    generatedAt: new Date().toISOString(),
  })
}
