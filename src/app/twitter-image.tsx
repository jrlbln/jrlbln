import Image from "@/app/opengraph-image";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = `${siteConfig.name} preview card`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default Image;
