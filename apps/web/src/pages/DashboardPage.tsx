import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiUrl, fetchMe } from "../lib/api";

export function DashboardPage() {
  const qc = useQueryClient();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const logout = useMutation({
    mutationFn: async () => {
      await fetch(apiUrl("/auth/logout"), {
        method: "POST",
        credentials: "include",
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["me"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-zinc-500">
        Loading…
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
        <p className="mb-6 text-zinc-400">
          You need to sign in to view the dashboard.
        </p>
        <Link
          to="/"
          className="text-emerald-400 underline hover:text-emerald-300"
        >
          ← Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <button
          type="button"
          className="rounded border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-900"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          {logout.isPending ? "Signing out…" : "Sign out"}
        </button>
      </div>

      <div className="flex gap-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="h-20 w-20 rounded-full border border-zinc-700"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-mono text-xl text-zinc-500">
            {user.username.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-mono text-lg text-white">{user.username}</p>
          <p className="text-sm text-zinc-500">ELO {user.elo}</p>
          <p className="mt-2 text-sm text-zinc-400">
            Matches: {user.matchesPlayed} played · {user.matchesWon} won
          </p>
          {user.githubBio ? (
            <p className="mt-3 text-sm italic text-zinc-500">{user.githubBio}</p>
          ) : null}
        </div>
      </div>

      <p className="mt-8 font-mono text-sm text-zinc-600">
        Game loop, rooms, and Socket.IO — next milestones. See proposal in the
        repo.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-sm text-emerald-500 hover:text-emerald-400"
      >
        ← Home
      </Link>
    </div>
  );
}
