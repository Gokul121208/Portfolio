import { profile } from "@/content/profile";
import { whatsappOptions } from "@/content/services";

export function buildWhatsAppUrl(serviceId?: string): string {
  const opt = whatsappOptions.find((o) => o.id === serviceId);
  const text = opt
    ? `Hi Gokul! I'm interested in ${opt.title}. Could we talk?`
    : "Hi Gokul! I found your portfolio. Which service would suit me? I'd like to discuss.";
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;
}
