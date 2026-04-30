import { Box, Button, Container, Stack, Typography } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { statsBarPropTypes } from "../props/componentPropTypes";
import { pageContainerSx, monoTextSx } from "../styles/commonStyles";
import {
  activeIndustryButtonSx,
  industryButtonSx,
  statsBarSx,
  statsInnerSx,
} from "../styles/statsBarStyles";
import { colors } from "../styles/theme";

export default function StatsBar({ topCountries = [], selectedCountry, handleCountry }) {
  if (!topCountries || topCountries.length === 0) {
    return null;
  }

  return (
    <Box sx={statsBarSx}>
      <Container maxWidth={false} sx={{ ...pageContainerSx, ...statsInnerSx }}>
        <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate600, mr: 0.5 }}>
          Top countries:
        </Typography>

        {topCountries.map(({ country, count }) => {
          const selected = selectedCountry === country;

          return (
            <Button
              key={country}
              variant="outlined"
              size="small"
              startIcon={<PublicIcon fontSize="inherit" />}
              onClick={() => handleCountry(selected ? "All" : country)}
              sx={selected ? activeIndustryButtonSx : industryButtonSx}
            >
              <Stack direction="row" spacing={0.75} alignItems="center">
                <span>{country}</span>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ ...monoTextSx, color: selected ? colors.ink700 : colors.slate600 }}
                >
                  {count}
                </Typography>
              </Stack>
            </Button>
          );
        })}
      </Container>
    </Box>
  );
}

StatsBar.propTypes = statsBarPropTypes;
