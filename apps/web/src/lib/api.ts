/**
 * In dev, Vite proxies /auth to the API so OAuth cookies can be first-party.
 * Use relative URLs when VITE_API_URL is empty.
 */
export function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_URL ?? "";
  if (!base) return path;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function fetchMe(): Promise<MeResponse | null> {
  const res = await fetch(apiUrl("/auth/me"), {
    credentials: "include",
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`auth/me failed: ${res.status}`);
  return (await res.json()) as MeResponse;
}

export interface MeResponse {
  id: string;
  githubId: string;
  username: string;
  avatarUrl: string | null;
  githubBio: string | null;
  elo: number;
  matchesPlayed: number;
  matchesWon: number;
  createdAt: string;
}
