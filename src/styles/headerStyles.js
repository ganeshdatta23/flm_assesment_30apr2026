import { colors } from "./theme";

export const headerSx = {
  position: "sticky",
  top: 0,
  zIndex: 20,
  bgcolor: "rgba(10, 10, 15, 0.88)",
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${colors.ink700}`,
};

export const headerInnerSx = {
  py: { xs: 1.5, sm: 2 },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
};

export const logoSx = {
  width: { xs: 32, sm: 36 },
  height: { xs: 32, sm: 36 },
  bgcolor: colors.amber400,
  color: colors.ink950,
  borderRadius: 2,
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
};
