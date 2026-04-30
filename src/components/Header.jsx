import { Box, Container, Stack, Typography } from "@mui/material";
import DatasetLinkedIcon from "@mui/icons-material/DatasetLinked";
import { headerPropTypes } from "../props/componentPropTypes";
import { headerInnerSx, headerSx, logoSx } from "../styles/headerStyles";
import { pageContainerSx, monoTextSx } from "../styles/commonStyles";
import { colors } from "../styles/theme";

export default function Header({ totalAll, totalFiltered }) {
  return (
    <Box component="header" sx={headerSx}>
      <Container maxWidth={false} sx={{ ...pageContainerSx, ...headerInnerSx }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={logoSx}>
            <DatasetLinkedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography
              component="h1"
              variant="h6"
              sx={{ fontWeight: 800, lineHeight: 1, color: colors.slate200 }}
            >
              CDP<Box component="span" sx={{ color: colors.amber400 }}>Records</Box>
            </Typography>
            <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate500 }}>
              Climate disclosure browser
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={{ xs: 1.5, sm: 3 }}
          alignItems="center"
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography component="span" variant={{ xs: "subtitle1", sm: "h5" }} sx={{ fontWeight: 800, color: colors.amber400 }}>
              {(totalFiltered || 0).toLocaleString()}
            </Typography>
            <Typography component="span" variant="caption" sx={{ ...monoTextSx, color: colors.slate500, ml: { xs: 0.5, sm: 1 } }}>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>/ </Box>
              {totalAll || 0}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

Header.propTypes = headerPropTypes;
