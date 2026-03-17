import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = `${siteConfig.name} preview card`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function getLogoDataUrl() {
  const logoPath = path.join(process.cwd(), "public", "BLN_LOGO_WHITE.svg");
  const logoMarkup = await readFile(logoPath, "utf8");
  const embeddedPngMatch = logoMarkup.match(/href="(data:image\/png;base64,[^"]+)"/);

  if (embeddedPngMatch) {
    return embeddedPngMatch[1];
  }

  return `data:image/svg+xml;base64,${Buffer.from(logoMarkup).toString("base64")}`;
}

export default async function Image() {
  const logoSrc = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#111111",
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          position: "relative",
        }}
      >
        <img src={logoSrc} alt="" width="320" height="320" />
      </div>
    ),
    size,
  );
}
