export const AVATAR_COLORS = [
  ["#1E3A5F", "#60A5FA"],
  ["#1F2D1A", "#4ADE80"],
  ["#2D1A2F", "#C084FC"],
  ["#2D1F0A", "#FB923C"],
  ["#1A2D2D", "#2DD4BF"],
  ["#2D1A1A", "#F87171"],
  ["#2D2A0A", "#FDE047"],
  ["#1A1A2D", "#818CF8"],
];

export function getAvatarColors(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function getCompanyInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function getStatusTone(status) {
  const tones = {
    Public: "success",
    Private: "info",
    Startup: "warning",
  };

  return tones[status] || "default";
}
