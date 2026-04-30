import { colors } from "./theme";

export const skeletonCardSx = {
  p: { xs: 2, sm: 2.5 },
  bgcolor: colors.ink800,
  border: `1px solid ${colors.ink600}`,
  borderRadius: 2,
};

export const emptyStateSx = {
  minHeight: 420,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

export const emptyIconSx = {
  width: 64,
  height: 64,
  mx: "auto",
  mb: 2,
  display: "grid",
  placeItems: "center",
  bgcolor: colors.ink800,
  border: `1px solid ${colors.ink600}`,
  borderRadius: 2,
  color: colors.slate600,
};
