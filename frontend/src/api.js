const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getDashboard(userId = 1) {
  const res = await fetch(`${API}/api/dashboard/${userId}`);
  if (!res.ok) throw new Error("Could not load dashboard");
  return res.json();
}

export async function runWhatIf(userId, payload) {
  const res = await fetch(`${API}/api/what-if/${userId}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Could not run scenario");
  return res.json();
}
