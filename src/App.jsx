import { useRef } from "react";
import { Alert, Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import FilterBar from "./components/FilterBar";
import CompanyCard from "./components/CompanyCard";
import CompanyTable from "./components/CompanyTable";
import { LoadingState, EmptyState } from "./components/LoadingState";
import { useCompanyFilters } from "./hooks/useCompanyFilters";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { appSx, cardGridSx, footerSx, loadMoreSx, mainSx } from "./styles/appStyles";
import { pageContainerSx, monoTextSx } from "./styles/commonStyles";
import { colors } from "./styles/theme";

export default function App() {
  const loadMoreRef = useRef(null);

  const {
    companies,
    totalFiltered,
    totalAll,
    hasMore,
    visibleCount,
    isLoading,
    isLoadingMore,
    error,
    options,
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
    sortBy,
    handleSort,
    sortOptions,
    viewMode,
    setViewMode,
    clearFilters,
    hasActiveFilters,
    loadMore,
    retry,
  } = useCompanyFilters();

  useInfiniteScroll({
    targetRef: loadMoreRef,
    enabled: !isLoading && !isLoadingMore && hasMore,
    onLoadMore: loadMore,
  });

  return (
    <Box sx={appSx}>
      <Header totalAll={totalAll} totalFiltered={totalFiltered} />
      <StatsBar
        topCountries={options.topCountries}
        selectedCountry={selectedCountry}
        handleCountry={handleCountry}
      />
      <FilterBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        selectedCountry={selectedCountry}
        handleCountry={handleCountry}
        selectedRegion={selectedRegion}
        handleRegion={handleRegion}
        selectedYear={selectedYear}
        handleYear={handleYear}
        selectedSection={selectedSection}
        handleSection={handleSection}
        options={options}
        sortBy={sortBy}
        handleSort={handleSort}
        sortOptions={sortOptions}
        viewMode={viewMode}
        setViewMode={setViewMode}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        totalFiltered={totalFiltered}
      />

      <Container component="main" maxWidth={false} sx={{ ...pageContainerSx, ...mainSx }}>
        {error && (
          <Alert
            severity="error"
            onClose={retry}
            sx={{ mb: 2, bgcolor: "rgba(127, 29, 29, 0.22)", border: "1px solid rgba(248, 113, 113, 0.25)" }}
          >
            {error}
          </Alert>
        )}

        {isLoading && <LoadingState />}

        {!isLoading && companies.length === 0 && <EmptyState clearFilters={clearFilters} />}

        {!isLoading && companies.length > 0 && viewMode === "grid" && (
          <Box sx={cardGridSx}>
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </Box>
        )}

        {!isLoading && companies.length > 0 && viewMode === "table" && (
          <CompanyTable companies={companies} />
        )}

        {!isLoading && companies.length > 0 && (
          <Box ref={loadMoreRef} sx={loadMoreSx}>
            {hasMore || isLoadingMore ? (
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: colors.slate500 }}>
                <CircularProgress size={18} color="primary" />
                <Typography variant="caption" sx={monoTextSx}>
                  {isLoadingMore ? "Loading more" : "Scroll for more"}
                </Typography>
              </Stack>
            ) : (
              <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate500 }}>
                Showing {visibleCount} of {totalFiltered} records
              </Typography>
            )}
          </Box>
        )}
      </Container>

      <Box component="footer" sx={footerSx}>
        <Container maxWidth={false} sx={pageContainerSx}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate500 }}>
              Built with React, Vite, MUI and MongoDB
            </Typography>
            <Typography variant="caption" sx={{ ...monoTextSx, color: colors.slate500 }}>
              {totalAll} records - {new Date().getFullYear()} CDP browser
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
