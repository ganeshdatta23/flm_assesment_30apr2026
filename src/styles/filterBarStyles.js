import { colors } from "./theme";

export const filterBarSx = {
  bgcolor: colors.ink900,
  borderBottom: `1px solid ${colors.ink700}`,
};

export const filterInnerSx = {
  py: 2,
  display: "grid",
  gap: 1.5,
};

export const filterRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  flexWrap: "wrap",
};

export const searchSx = {
  flex: "1 1 320px",
  maxWidth: 560,
};

export const selectSx = {
  minWidth: 150,
};

export const viewToggleSx = {
  bgcolor: colors.ink800,
  border: `1px solid ${colors.ink600}`,
  borderRadius: 2,
  p: 0.5,
  "& .MuiToggleButton-root": {
    border: 0,
    color: colors.slate400,
    px: 1.25,
    py: 1,
  },
  "& .Mui-selected": {
    bgcolor: `${colors.amber400} !important`,
    color: `${colors.ink950} !important`,
  },
};

export const activeChipSx = {
  bgcolor: "rgba(251, 191, 36, 0.1)",
  borderColor: "rgba(251, 191, 36, 0.25)",
  color: colors.amber300,
  fontFamily: "'DM Mono', monospace",
};
