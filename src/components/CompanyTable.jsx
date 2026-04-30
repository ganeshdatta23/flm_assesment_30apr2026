import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { TABLE_COLUMNS } from "../constants/companyOptions";
import { companyTablePropTypes } from "../props/componentPropTypes";
import { getAvatarColors, getCompanyInitials } from "../utils/companyDisplay";
import { avatarSx } from "../styles/companyCardStyles";
import { rowSx, tableCellSx, tableContainerSx, tableHeadCellSx } from "../styles/companyTableStyles";
import { monoTextSx, tagChipSx } from "../styles/commonStyles";
import { colors } from "../styles/theme";

export default function CompanyTable({ companies }) {
  return (
    <TableContainer sx={tableContainerSx}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <TableCell key={column || "actions"} sx={tableHeadCellSx}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => {
            const [bg, fg] = getAvatarColors(company.organization);

            return (
              <TableRow key={company.id} sx={rowSx}>
                <TableCell sx={tableCellSx}>
                  <Stack direction="row" spacing={1.5} alignItems="center" minWidth={240}>
                    <Box sx={{ ...avatarSx, width: 34, height: 34, fontSize: 12, bgcolor: bg, color: fg }}>
                      {getCompanyInitials(company.organization)}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {company.organization}
                      </Typography>
                      <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate500 }}>
                        {company.questionNumber}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={tableCellSx}>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: colors.slate400, whiteSpace: "nowrap" }}>
                    <PublicIcon sx={{ fontSize: 15, color: colors.slate600 }} />
                    <Typography variant="caption" sx={monoTextSx}>
                      {company.country}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ ...tableCellSx, ...monoTextSx, color: colors.slate400 }}>
                  {company.yearReported || "-"}
                </TableCell>
                <TableCell sx={{ ...tableCellSx, ...monoTextSx, color: colors.slate400 }}>
                  {company.region || "-"}
                </TableCell>
                <TableCell sx={tableCellSx}>
                  <Chip label={company.section || "-"} size="small" variant="outlined" sx={tagChipSx} />
                </TableCell>
                <TableCell sx={tableCellSx}>
                  <Typography
                    variant="body2"
                    sx={{
                      minWidth: 280,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {company.questionName}
                  </Typography>
                </TableCell>
                <TableCell sx={tableCellSx}>
                  <Typography
                    variant="body2"
                    sx={{
                      minWidth: 240,
                      color: colors.amber400,
                      fontWeight: 700,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {company.responseAnswer || "-"}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CompanyTable.propTypes = companyTablePropTypes;
