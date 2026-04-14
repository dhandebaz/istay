import { useState, useEffect } from "preact/hooks";

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
  const [error, setError] = useState("");

  const fetchTeam = async () => {
    try {
      const res = await fetch(`/api/host/team?hostId=${hostId}`);
      const data = await res.json();
      if (data.members) setMembers(data.members);
    } catch (err) {
      console.error("Failed to fetch team:", err);
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
    setError("");
    
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
      } else {
        setError(data.error || "Failed to invite member");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the team?`)) return;
    
    try {
      const res = await fetch("/api/host/team/remove", {
        method: "POST",
        body: JSON.stringify({ hostId, email }),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) await fetchTeam();
    } catch (err) {
      alert("Failed to remove member");
    }
  };

  return (
    <div class="space-y-6">
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
            disabled={inviting}
            class="px-4 py-2.5 rounded-xl bg-istay-900 text-white text-sm font-800 hover:bg-istay-800 active:scale-95 transition-all disabled:opacity-50"
          >
            {inviting ? "Inviting..." : "Invite"}
          </button>
        </form>
        {error && <p class="mt-2 text-xs text-rose-500 font-600">{error}</p>}
      </div>
    </div>
  );
}
