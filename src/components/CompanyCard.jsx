import { Box, Chip, Divider, Paper, Stack, Typography, Tooltip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { companyCardPropTypes } from "../props/componentPropTypes";
import { getAvatarColors, getCompanyInitials } from "../utils/companyDisplay";
import { avatarSx, cardSx, metaSx, primaryChipSx, secondaryChipSx } from "../styles/companyCardStyles";
import { monoTextSx, tagChipSx } from "../styles/commonStyles";
import { colors } from "../styles/theme";

// Helper function to detect state labels (not actual data responses)
const isStateLabel = (text) => {
  if (!text) return false;
  const stateLabels = [
    "question not applicable",
    "not applicable",
    "n/a",
    "implementation",
    "not available",
    "not reported",
    "not specified",
  ];
  return stateLabels.includes(String(text).toLowerCase());
};

export default function CompanyCard({ company }) {
  const [bg, fg] = getAvatarColors(company.organization);

  return (
    <Paper component="article" elevation={0} sx={cardSx}>
      {/* Header Section - Organization Info with stronger hierarchy */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1.5}>
        <Stack direction="row" spacing={1.5} alignItems="center" minWidth={0} flex={1}>
          <Box sx={{ ...avatarSx, bgcolor: bg, color: fg }}>
            {getCompanyInitials(company.organization)}
          </Box>
          <Box minWidth={0}>
            <Tooltip title={company.organization} arrow>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2 }} noWrap>
                {company.organization}
              </Typography>
            </Tooltip>
            <Typography variant="caption" sx={{ color: colors.slate500, lineHeight: 1 }}>
              Account #{company.accountNumber || "-"}
            </Typography>
          </Box>
        </Stack>

        {/* Primary metadata - Country & Year */}
        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" justifyContent="flex-end">
          {/* <Chip label={company.country || "Not reported"} size="small" variant="outlined" sx={secondaryChipSx} /> */}
          {/* {company.yearReported && <Chip label={String(company.yearReported)} size="small" sx={primaryChipSx} />} */}
        </Stack>
      </Stack>

      {/* Content Section - Grows to fill available space */}
      <Stack sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.75, minHeight: 0 }}>
        {/* Category Tags with visual weight */}
        <Stack direction="row" spacing={0.75} alignItems="center" useFlexGap flexWrap="wrap">
          {company.region && (
            <Chip 
              label={company.region} 
              size="small" 
              variant="outlined" 
              sx={secondaryChipSx} 
            />
          )}
          {/* {company.section && (
            <Chip 
              label={company.section} 
              size="small" 
              variant="outlined" 
              sx={secondaryChipSx} 
            />
          )} */}
        </Stack>

        {/* Question & Answer Content with improved hierarchy */}
        <Stack sx={{ gap: 1 }}>
          <Tooltip title={company.questionName || ""} arrow placement="top">
            <Typography
              variant="body2"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.5,
                fontWeight: 700,
                color: colors.slate200,
              }}
            >
              {company.questionName || "(No question text)"}
            </Typography>
          </Tooltip>

          <Tooltip title={company.responseAnswer || "Not reported"} arrow placement="top">
            <Typography
              variant="body2"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.5,
                fontWeight: 600,
                color: isStateLabel(company.responseAnswer) ? colors.slate400 : colors.amber400,
              }}
            >
              {company.responseAnswer || "Not reported"}
            </Typography>
          </Tooltip>
        </Stack>

        {/* Meta Information Grid with friendly labels */}
        <Box sx={metaSx}>
          <MetaItem 
            icon={<CalendarMonthIcon fontSize="inherit" />} 
            label={String(company.yearReported || "Not specified")} 
            title={company.yearReported ? `Reported in ${company.yearReported}` : "Year not specified"}
          />
          <MetaItem 
            icon={<HelpOutlineOutlinedIcon fontSize="inherit" />} 
            label={company.columnName || "Not available"}
            title={company.columnName ? `Column: ${company.columnName}` : "Column information not available"}
          />
          <MetaItem 
            icon={<AccountTreeIcon fontSize="inherit" />} 
            label={company.rowName || "Not available"}
            title={company.rowName ? `Row: ${company.rowName}` : "Row information not available"}
          />
        </Box>

        {/* Parent Section with visibility check */}
        {company.parentSection && (
          <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
            {/* <Chip label={company.parentSection} size="small" sx={secondaryChipSx} /> */}
          </Stack>
        )}
      </Stack>

      {/* Footer Section - Always at bottom */}
      <Stack sx={{ gap: 1.25, marginTop: "auto" }}>
        <Divider sx={{ borderColor: colors.ink600, my: 0 }} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate600, fontSize: "0.7rem" }}>
            Last update
          </Typography>
          <Tooltip title={company.lastUpdate || "Not available"} arrow>
            <Typography variant="caption" sx={{ fontWeight: 700, color: colors.amber400, fontSize: "0.75rem" }}>
              {company.lastUpdate || "—"}
            </Typography>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}

function MetaItem({ icon, label, title }) {
  return (
    <Tooltip title={title || label} arrow enterDelay={300}>
      <Stack direction="row" spacing={0.5} alignItems="flex-start" minWidth={0} sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", color: colors.slate600, flexShrink: 0, fontSize: "0.875rem", pt: 0.25 }}>
          {icon}
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            ...monoTextSx, 
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            whiteSpace: "nowrap",
            minWidth: 0,
            color: colors.slate400,
            fontSize: "0.75rem",
            flex: 1,
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

CompanyCard.propTypes = companyCardPropTypes;
