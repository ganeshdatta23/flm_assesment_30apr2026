import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import { filterBarPropTypes } from "../props/componentPropTypes";
import { activeChipSx, filterBarSx, filterInnerSx, filterRowSx, searchSx, selectSx, viewToggleSx } from "../styles/filterBarStyles";
import { monoTextSx, pageContainerSx } from "../styles/commonStyles";
import { colors } from "../styles/theme";

export default function FilterBar({
  searchQuery,
  handleSearch,
  selectedCountry,
  handleCountry,
  selectedRegion,
  handleRegion,
  selectedYear,
  handleYear,
  selectedSection,
  handleSection,
  options,
  sortBy,
  handleSort,
  sortOptions,
  viewMode,
  setViewMode,
  clearFilters,
  hasActiveFilters,
  totalFiltered,
}) {
  return (
    <Box sx={filterBarSx}>
      <Container maxWidth={false} sx={{ ...pageContainerSx, ...filterInnerSx }}>
        <Box sx={filterRowSx}>
          <TextField
            size="small"
            placeholder="Search organization, question or row..."
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value)}
            sx={searchSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: colors.slate500 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => handleSearch("")} aria-label="Clear search">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          <ToggleButtonGroup
            exclusive
            value={viewMode}
            onChange={(_, value) => value && setViewMode(value)}
            aria-label="View mode"
            sx={viewToggleSx}
          >
            <ToggleButton value="grid" aria-label="Grid view">
              <GridViewIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="table" aria-label="Table view">
              <TableRowsIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={filterRowSx}>
          <TuneIcon fontSize="small" sx={{ color: colors.slate500, display: { xs: "none", sm: "block" } }} />

          <FilterSelect
            label="All Countries"
            value={selectedCountry}
            onChange={handleCountry}
            options={options.countries || []}
          />
          <FilterSelect
            label="All Regions"
            value={selectedRegion}
            onChange={handleRegion}
            options={options.regions || []}
          />
          <FilterSelect
            label="All Years"
            value={selectedYear}
            onChange={handleYear}
            options={(options.years || []).map((year) => String(year))}
          />
          <FilterSelect
            label="All Sections"
            value={selectedSection}
            onChange={handleSection}
            options={options.sections || []}
          />
          <FilterSelect
            value={sortBy}
            onChange={handleSort}
            options={sortOptions.map((option) => option.value)}
            labels={sortOptions.reduce((labels, option) => ({ ...labels, [option.value]: option.label }), {})}
          />

          {hasActiveFilters && (
            <Button variant="outlined" size="small" startIcon={<CloseIcon />} onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </Box>

        {hasActiveFilters && (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
            {searchQuery && <FilterChip label={`"${searchQuery}"`} onDelete={() => handleSearch("")} />}
            {selectedCountry !== "All" && <FilterChip label={selectedCountry} onDelete={() => handleCountry("All")} />}
            {selectedRegion !== "All" && <FilterChip label={selectedRegion} onDelete={() => handleRegion("All")} />}
            {selectedYear !== "All" && <FilterChip label={selectedYear} onDelete={() => handleYear("All")} />}
            {selectedSection !== "All" && <FilterChip label={selectedSection} onDelete={() => handleSection("All")} />}
            <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate500 }}>
              {totalFiltered} result{totalFiltered !== 1 ? "s" : ""}
            </Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

function FilterSelect({ label, value, onChange, options, labels = {} }) {
  const firstOption = label ? "All" : options[0];

  return (
    <FormControl size="small" sx={selectSx}>
      <Select value={value} onChange={(event) => onChange(event.target.value)} displayEmpty>
        {label && <MenuItem value={firstOption}>{label}</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {labels[option] || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function FilterChip({ label, onDelete }) {
  return <Chip size="small" label={label} onDelete={onDelete} sx={activeChipSx} variant="outlined" />;
}

FilterBar.propTypes = filterBarPropTypes;
