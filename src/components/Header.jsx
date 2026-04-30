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
          spacing={3}
          alignItems="center"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography component="span" variant="h5" sx={{ fontWeight: 800, color: colors.amber400 }}>
              {(totalFiltered || 0).toLocaleString()}
            </Typography>
            <Typography component="span" variant="caption" sx={{ ...monoTextSx, color: colors.slate500, ml: 1 }}>
              / {totalAll || 0} records
            </Typography>
          </Box>
          {/* <Box sx={{ width: 1, height: 32, bgcolor: colors.ink600 }} /> */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4ADE80" }} /> */}
            {/* <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate400 }}>
              MongoDB
            </Typography> */}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

Header.propTypes = headerPropTypes;
