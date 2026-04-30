import { colors } from "./theme";

export const appSx = {
  minHeight: "100vh",
  bgcolor: colors.ink950,
  display: "flex",
  flexDirection: "column",
};

export const mainSx = {
  flex: 1,
  py: { xs: 2, sm: 3 },
};

export const cardGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    md: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
    xl: "repeat(4, minmax(0, 1fr))",
  },
  gap: { xs: 1.5, sm: 2 },
};

export const footerSx = {
  borderTop: `1px solid ${colors.ink700}`,
  py: 2.5,
};

export const loadMoreSx = {
  minHeight: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
