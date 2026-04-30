import { colors } from "./theme";

export const cardSx = {
  p: { xs: 2, sm: 2.5 },
  height: "100%",
  minHeight: 0,
  bgcolor: colors.ink800,
  border: `1px solid ${colors.ink600}`,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  gap: { xs: 1.5, sm: 2 },
  transition: "all 160ms ease",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: "rgba(251, 191, 36, 0.45)",
    boxShadow: "0 12px 40px rgba(251, 191, 36, 0.08)",
  },
};

export const avatarSx = {
  width: { xs: 40, sm: 44 },
  height: { xs: 40, sm: 44 },
  borderRadius: 2,
  display: "grid",
  placeItems: "center",
  fontFamily: "'Syne', sans-serif",
  fontWeight: 800,
  fontSize: { xs: 12, sm: 14 },
  flexShrink: 0,
};

export const metaSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(2, minmax(0, 1fr))",
    sm: "repeat(3, minmax(0, 1fr))",
  },
  gap: { xs: 1, sm: 1.25 },
  color: colors.slate500,
};

// Primary chip style for highlighted metadata (e.g., year)
export const primaryChipSx = {
  bgcolor: "rgba(251, 191, 36, 0.1)",
  borderColor: "rgba(251, 191, 36, 0.3)",
  color: colors.amber400,
  fontFamily: "'DM Mono', monospace",
  height: 24,
  fontWeight: 600,
  fontSize: "0.75rem",
  "& .MuiChip-label": {
    px: 0.75,
  },
};

// Secondary chip style for regular metadata (region, country, section)
export const secondaryChipSx = {
  bgcolor: colors.ink700,
  borderColor: colors.ink500,
  color: colors.slate300,
  fontFamily: "'DM Mono', monospace",
  height: 24,
  fontSize: "0.75rem",
  "& .MuiChip-label": {
    px: 0.75,
  },
};
