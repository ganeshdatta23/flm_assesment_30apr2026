import { Box, Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { emptyStatePropTypes } from "../props/componentPropTypes";
import { cardGridSx } from "../styles/appStyles";
import { emptyIconSx, emptyStateSx, skeletonCardSx } from "../styles/loadingStateStyles";
import { colors } from "../styles/theme";

export function LoadingState() {
  return (
    <Box sx={cardGridSx}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Paper key={index} elevation={0} sx={skeletonCardSx}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5}>
              <Skeleton variant="rounded" width={44} height={44} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="72%" />
                <Skeleton width="48%" />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rounded" width={86} height={24} />
              <Skeleton variant="rounded" width={68} height={24} />
            </Stack>
            <Box>
              <Skeleton />
              <Skeleton width="86%" />
              <Skeleton width="64%" />
            </Box>
            <Stack direction="row" spacing={1}>
              <Skeleton width="33%" />
              <Skeleton width="33%" />
              <Skeleton width="33%" />
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export function EmptyState({ clearFilters }) {
  return (
    <Box sx={emptyStateSx}>
      <Box>
        <Box sx={emptyIconSx}>
          <SearchOffIcon fontSize="large" />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          No records found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 340, mb: 3 }}>
          Your filters did not match any MongoDB records. Try a broader search or clear the filters.
        </Typography>
        <Button variant="contained" onClick={clearFilters} sx={{ color: colors.ink950 }}>
          Clear all filters
        </Button>
      </Box>
    </Box>
  );
}

EmptyState.propTypes = emptyStatePropTypes;
