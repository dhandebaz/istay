import { useState, useEffect, useCallback } from "preact/hooks";

// ── Toast Notification System (shared pattern) ───────────────

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

let toastId = 0;

function ToastContainer({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  const colorMap: Record<ToastType, string> = {
    success: "bg-emerald-500",
    error: "bg-rose-500",
    info: "bg-gray-800",
  };

  const iconMap: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div
      style={{ position: "fixed", top: 16, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: "8px", maxWidth: "380px" }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          class={`${colorMap[t.type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-600`}
          style={{
            animation: t.exiting ? "toast-exit 0.3s ease-in forwards" : "toast-enter 0.35s ease-out",
            cursor: "pointer",
          }}
          onClick={() => onDismiss(t.id)}
        >
          <span class="text-base font-800 shrink-0">{iconMap[t.type]}</span>
          <span class="flex-1">{t.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes toast-enter { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes toast-exit { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(80px); } }
      `}</style>
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
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div class="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4" style={{ animation: "toast-enter 0.25s ease-out" }}>
        <p class="text-sm text-gray-700 mb-5 leading-relaxed">{message}</p>
        <div class="flex gap-3 justify-end">
          <button type="button" onClick={onCancel} class="px-4 py-2 rounded-xl text-sm font-600 text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button type="button" onClick={onConfirm} class="px-4 py-2 rounded-xl text-sm font-700 text-white bg-rose-500 hover:bg-rose-600 transition-colors">Confirm</button>
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
  const [confirmState, setConfirmState] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // ── Toast helpers ─────────────────────────────────────────
  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, 300);
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, 300);
  }, []);

  const showConfirm = useCallback(
    (message: string): Promise<boolean> =>
      new Promise((resolve) => {
        setConfirmState({
          message,
          onConfirm: () => { setConfirmState(null); resolve(true); },
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
        headers: { "Content-Type": "application/json" }
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
    const confirmed = await showConfirm(`Remove ${email} from the team? They will lose access to all properties.`);
    if (!confirmed) return;
    
    try {
      const res = await fetch("/api/host/team/remove", {
        method: "POST",
        body: JSON.stringify({ hostId, email }),
        headers: { "Content-Type": "application/json" }
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

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 class="text-base font-700 text-gray-900">Team Members</h2>
            <p class="text-xs text-gray-400">Manage who has access to your properties and earnings</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-700 text-gray-500 uppercase tracking-wider">
            {members.length} Members
          </span>
        </div>

        <div class="divide-y divide-gray-50">
          {loading ? (
            <div class="p-12 text-center text-gray-400 text-sm italic">Loading team...</div>
          ) : members.length === 0 ? (
            <div class="p-12 text-center text-gray-400 text-sm italic">No team members found</div>
          ) : (
            members.map((member) => (
              <div key={member.email} class="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-istay-50 border border-istay-100 flex items-center justify-center text-istay-600 font-800 text-xs">
                    {(member.name || member.email).slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                       <p class="text-sm font-700 text-gray-900">{member.name || "Unnamed User"}</p>
                       <span class={`px-2 py-0.5 rounded-md text-[9px] font-800 uppercase tracking-tight ${
                         member.role === 'owner' ? 'bg-amber-100 text-amber-700' :
                         member.role === 'manager' ? 'bg-blue-100 text-blue-700' :
                         'bg-gray-100 text-gray-600'
                       }`}>
                         {member.role}
                       </span>
                    </div>
                    <p class="text-xs text-gray-400">{member.email}</p>
                  </div>
                </div>
                
                {member.role !== "owner" && (
                  <button 
                    type="button"
                    onClick={() => handleRemove(member.email)}
                    class="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    title="Remove Member"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
      <div class="bg-gray-50 rounded-2xl border border-gray-100 p-6">
        <h3 class="text-sm font-800 text-gray-900 mb-1">Invite Team Member</h3>
        <p class="text-xs text-gray-400 mb-4">New members will be able to log in with their email.</p>

        <form onSubmit={handleInvite} class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="sm:col-span-2">
            <input 
              name="email" 
              type="email" 
              placeholder="Email address" 
              required 
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-istay-500/10 focus:border-istay-500 transition-all outline-none"
            />
          </div>
          <div>
            <select 
              name="role" 
              required 
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-istay-500/10 focus:border-istay-500 transition-all outline-none appearance-none"
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="accountant">Accountant</option>
            </select>
          </div>
          <button 
            type="submit"
            disabled={inviting}
            class="px-4 py-2.5 rounded-xl bg-istay-900 text-white text-sm font-800 hover:bg-istay-800 active:scale-95 transition-all disabled:opacity-50"
          >
            {inviting ? "Inviting..." : "Invite"}
          </button>
        </form>
      </div>
    </div>
  );
}
