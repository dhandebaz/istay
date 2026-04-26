import { useCallback, useEffect, useState } from "preact/hooks";

// ── Toast Notification System (shared pattern) ───────────────

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

let toastId = 0;

function ToastContainer(
  { toasts, onDismiss }: {
    toasts: ToastItem[];
    onDismiss: (id: number) => void;
  },
) {
  const colorMap: Record<ToastType, string> = {
    success: "bg-emerald-500",
    error: "bg-rose-500",
    info: "bg-gray-900",
  };

  const iconMap: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div class="fixed top-8 right-8 z-[9999] flex flex-col gap-4 max-w-[380px]">
      {toasts.map((t) => (
        <div
          key={t.id}
          class={`${colorMap[t.type]} text-white px-6 py-4 shadow-premium-lg rounded-2xl flex items-center gap-4 text-xs font-bold uppercase tracking-widest cursor-pointer hover:-translate-y-0.5 transition-all`}
          style={{
            animation: t.exiting
              ? "toast-exit 0.2s ease-in forwards"
              : "toast-enter 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
          onClick={() => onDismiss(t.id)}
        >
          <span class="text-lg font-bold shrink-0">{iconMap[t.type]}</span>
          <span class="flex-1">{t.message}</span>
        </div>
      ))}
      <style>
        {`
        @keyframes toast-enter { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes toast-exit { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100px); } }
      `}
      </style>
    </div>
  );
}

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div class="fixed inset-0 z-[9998] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
      <div class="bg-white border border-gray-100 shadow-premium rounded-[2.5rem] max-w-md w-full p-10 space-y-8 animate-slide-up">
        <div class="text-center space-y-4">
          <div class="w-20 h-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-sm">
            ⚠️
          </div>
          <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Confirm Action</h3>
          <p class="text-sm font-medium text-gray-400 leading-relaxed">{message}</p>
        </div>
        <div class="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            class="w-full py-5 bg-rose-500 text-white font-bold rounded-2xl shadow-premium hover:bg-rose-600 transition-all uppercase tracking-widest text-[11px]"
          >
            Remove Member
          </button>
          <button
            onClick={onCancel}
            class="w-full py-5 bg-gray-50 text-gray-900 font-bold rounded-2xl border border-gray-100 hover:bg-white transition-all uppercase tracking-widest text-[11px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────

interface TeamMember {
  email: string;
  role: "owner" | "manager" | "staff" | "accountant";
  emailVerified: boolean;
  name?: string;
}

export default function TeamManagement({ hostId }: { hostId: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<
    {
      message: string;
      onConfirm: () => void;
    } | null
  >(null);

  // ── Toast helpers ─────────────────────────────────────────
  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => t.id === id ? { ...t, exiting: true } : t)
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((t) => t.id === id ? { ...t, exiting: true } : t)
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const showConfirm = useCallback(
    (message: string): Promise<boolean> =>
      new Promise((resolve) => {
        setConfirmState({
          message,
          onConfirm: () => {
            setConfirmState(null);
            resolve(true);
          },
        });
      }),
    [],
  );

  // ── Data fetching ─────────────────────────────────────────
  const fetchTeam = async () => {
    try {
      const res = await fetch(`/api/host/team?hostId=${hostId}`);
      const data = await res.json();
      if (data.members) setMembers(data.members);
    } catch (_err) {
      console.error("Failed to fetch team:", _err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleInvite = async (e: Event) => {
    e.preventDefault();
    setInviting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/host/team/invite", {
        method: "POST",
        body: JSON.stringify({
          hostId,
          email: formData.get("email"),
          role: formData.get("role"),
          name: formData.get("name"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.ok) {
        form.reset();
        await fetchTeam();
        showToast("Team member invited successfully", "success");
      } else {
        showToast(data.error || "Failed to invite member", "error");
      }
    } catch (_err) {
      showToast("Network error. Please try again.", "error");
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (email: string) => {
    const confirmed = await showConfirm(
      `Remove ${email} from the team? They will lose access to all properties.`,
    );
    if (!confirmed) return;

    try {
      const res = await fetch("/api/host/team/remove", {
        method: "POST",
        body: JSON.stringify({ hostId, email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        await fetchTeam();
        showToast("Team member removed", "info");
      } else {
        showToast("Failed to remove member", "error");
      }
    } catch (_err) {
      showToast("Failed to remove member. Please try again.", "error");
    }
  };

  return (
    <div class="space-y-6">
      {/* Toast Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Confirm Modal */}
      {confirmState && (
        <ConfirmModal
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState(null)}
        />
      )}

      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-premium overflow-hidden">
        <div class="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div>
            <h2 class="text-xl font-bold text-gray-900 tracking-tight">Team Members</h2>
            <p class="text-sm font-medium text-gray-400 mt-1">
              Manage who has access to your properties and earnings
            </p>
          </div>
          <span class="px-4 py-1.5 rounded-full bg-white border border-gray-100 text-[11px] font-bold text-emerald-600 uppercase tracking-widest shadow-sm">
            {members.length} Members
          </span>
        </div>

        <div class="divide-y divide-gray-50">
          {loading
            ? (
              <div class="p-16 text-center text-gray-400 text-sm font-medium animate-pulse">
                Loading team...
              </div>
            )
            : members.length === 0
            ? (
              <div class="p-16 text-center text-gray-400 text-sm font-medium">
                No team members found
              </div>
            )
            : (
              members.map((member) => (
                <div
                  key={member.email}
                  class="p-6 flex items-center justify-between hover:bg-emerald-50/30 transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm shadow-sm">
                      {(member.name || member.email).slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div class="flex items-center gap-3">
                        <p class="text-sm font-bold text-gray-900 tracking-tight">
                          {member.name || "Unnamed User"}
                        </p>
                        <span
                          class={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                            member.role === "owner"
                              ? "bg-amber-50 text-amber-700 border-amber-100"
                              : member.role === "manager"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-gray-50 text-gray-500 border-gray-100"
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>
                      <p class="text-xs font-medium text-gray-400 mt-0.5">{member.email}</p>
                    </div>
                  </div>

                  {member.role !== "owner" && (
                    <button
                      type="button"
                      onClick={() => handleRemove(member.email)}
                      class="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all group"
                      title="Remove Member"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
        </div>
      </div>

      {/* Invite Form */}
      <div class="bg-gray-900 rounded-[2.5rem] p-10 shadow-premium-lg border border-gray-900 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
        <div class="relative z-10">
          <h3 class="text-lg font-bold text-white tracking-tight mb-2">Invite Team Member</h3>
          <p class="text-xs font-medium text-gray-400 mb-8 max-w-sm">
            Add team members to help manage your properties. They will receive an invitation via email.
          </p>

          <form
            onSubmit={handleInvite}
            class="grid grid-cols-1 sm:grid-cols-4 gap-4"
          >
            <div class="sm:col-span-2">
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                class="w-full px-6 py-4 rounded-2xl bg-gray-800/50 border border-gray-800 text-white text-sm font-medium focus:border-emerald-500 focus:bg-gray-800 outline-none transition-all placeholder:text-gray-500"
              />
            </div>
            <div>
              <select
                name="role"
                required
                class="w-full px-6 py-4 rounded-2xl bg-gray-800/50 border border-gray-800 text-white text-sm font-bold focus:border-emerald-500 focus:bg-gray-800 outline-none appearance-none cursor-pointer"
              >
                <option value="staff" class="bg-gray-900 text-white">Staff</option>
                <option value="manager" class="bg-gray-900 text-white">Manager</option>
                <option value="accountant" class="bg-gray-900 text-white">Accountant</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={inviting}
              class="px-6 py-4 rounded-2xl bg-emerald-500 text-white text-sm font-bold shadow-premium hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
            >
              {inviting ? "Inviting..." : "Invite Member"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
