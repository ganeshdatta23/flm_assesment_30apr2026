import { colors } from "./theme";

export const statsBarSx = {
  bgcolor: colors.ink950,
  borderBottom: `1px solid ${colors.ink700}`,
  overflowX: "auto",
};

export const statsInnerSx = {
  py: { xs: 1.25, sm: 1.5 },
  display: "flex",
  alignItems: "center",
  gap: 1,
  minWidth: "max-content",
};

export const industryButtonSx = {
  borderColor: colors.ink600,
  color: colors.slate400,
  whiteSpace: "nowrap",
  "&:hover": {
    borderColor: "rgba(251, 191, 36, 0.45)",
    color: colors.slate200,
  },
};

export const activeIndustryButtonSx = {
  bgcolor: colors.amber400,
  borderColor: colors.amber400,
  color: colors.ink950,
  "&:hover": {
    bgcolor: colors.amber300,
    borderColor: colors.amber300,
  },
};
