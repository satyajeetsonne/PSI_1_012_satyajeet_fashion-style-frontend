import { API_BASE_URL } from "../config/api";

const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");

export function normalizeImageUrl(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  // Preserve data URIs
  if (/^data:/i.test(s)) return s;

  // If backend returned a dev absolute URL (http://localhost:8000/...), rewrite to production base
  const devMatch = s.match(/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(\/.*)$/i);
  if (devMatch && devMatch[1]) return `${baseUrl}${devMatch[1]}`;

  // Keep absolute https/http URLs
  if (/^https?:\/\//i.test(s)) return s;

  // Paths starting with / (e.g. /uploads/...) -> prepend base
  if (s.startsWith("/")) return `${baseUrl}${s}`;

  // Relative paths -> prepend base with slash
  return `${baseUrl}/${s}`;
}

export default normalizeImageUrl;
