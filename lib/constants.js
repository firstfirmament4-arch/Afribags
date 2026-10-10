// Numéro WhatsApp de contact (format international, sans le +, sans espaces)
export const WHATSAPP_NUMBER = "237679692413";

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
