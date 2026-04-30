import { colors } from "./theme";

export const pageContainerSx = {
  maxWidth: "1280px",
  mx: "auto",
  px: { xs: 2, sm: 3 },
};

export const panelSx = {
  bgcolor: colors.ink800,
  border: `1px solid ${colors.ink600}`,
  borderRadius: 2,
};

export const monoTextSx = {
  fontFamily: "'DM Mono', monospace",
};

export const statusChipSx = {
  Public: {
    bgcolor: "rgba(74, 222, 128, 0.1)",
    color: "#4ADE80",
    borderColor: "rgba(74, 222, 128, 0.2)",
  },
  Private: {
    bgcolor: "rgba(96, 165, 250, 0.1)",
    color: "#60A5FA",
    borderColor: "rgba(96, 165, 250, 0.2)",
  },
  Startup: {
    bgcolor: "rgba(251, 191, 36, 0.1)",
    color: colors.amber400,
    borderColor: "rgba(251, 191, 36, 0.2)",
  },
};

export const tagChipSx = {
  bgcolor: colors.ink700,
  borderColor: colors.ink500,
  color: colors.slate300,
  fontFamily: "'DM Mono', monospace",
  height: 24,
};
