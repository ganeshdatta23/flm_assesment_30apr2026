import { colors } from "./theme";

export const tableContainerSx = {
  bgcolor: colors.ink800,
  border: `1px solid ${colors.ink600}`,
  borderRadius: 2,
  overflowX: "auto",
};

export const tableHeadCellSx = {
  color: colors.slate500,
  fontFamily: "'DM Mono', monospace",
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
  borderColor: colors.ink600,
  whiteSpace: "nowrap",
};

export const tableCellSx = {
  borderColor: colors.ink700,
};

export const rowSx = {
  "&:hover": {
    bgcolor: "rgba(30, 30, 53, 0.72)",
  },
};
