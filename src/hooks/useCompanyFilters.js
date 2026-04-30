import { useDeferredValue, useEffect, useState } from "react";
import { fetchRecordOptions, fetchRecords } from "../api/records";
import { PAGE_SIZE, SORT_OPTIONS } from "../constants/companyOptions";

export function useCompanyFilters() {
  const [records, setRecords] = useState([]);
  const [options, setOptions] = useState({
    countries: [],
    regions: [],
    years: [],
    sections: [],
    totalCount: 0,
    topCountries: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");
  const [sortBy, setSortBy] = useState("year_desc");
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [totalFiltered, setTotalFiltered] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    const controller = new AbortController();

    async function loadOptions() {
      try {
        const data = await fetchRecordOptions(controller.signal);
        setOptions(data);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message);
        }
      }
    }

    loadOptions();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const loadingNextPage = page > 1;

    async function loadRecords() {
      try {
        setError("");

        if (loadingNextPage) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }

        const data = await fetchRecords(
          {
            search: deferredSearchQuery,
            country: selectedCountry,
            region: selectedRegion,
            year: selectedYear,
            section: selectedSection,
            sortBy,
            page,
            limit: PAGE_SIZE,
          },
          controller.signal
        );

        setRecords((currentRecords) =>
          loadingNextPage ? [...currentRecords, ...data.items] : data.items
        );
        setTotalFiltered(data.total);
        setHasMore(data.hasMore);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message);
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    }

    loadRecords();

    return () => controller.abort();
  }, [
    deferredSearchQuery,
    selectedCountry,
    selectedRegion,
    selectedYear,
    selectedSection,
    sortBy,
    page,
    reloadKey,
  ]);

  function resetList() {
    setPage(1);
    setHasMore(false);
  }

  function handleSearch(value) {
    setSearchQuery(value);
    resetList();
  }

  function handleCountry(value) {
    setSelectedCountry(value);
    resetList();
  }

  function handleRegion(value) {
    setSelectedRegion(value);
    resetList();
  }

  function handleYear(value) {
    setSelectedYear(value);
    resetList();
  }

  function handleSection(value) {
    setSelectedSection(value);
    resetList();
  }

  function handleSort(value) {
    setSortBy(value);
    resetList();
  }

  function loadMore() {
    if (!hasMore || isLoadingMore) {
      return;
    }

    setPage((currentPage) => currentPage + 1);
  }

  function clearFilters() {
    setSearchQuery("");
    setSelectedCountry("All");
    setSelectedRegion("All");
    setSelectedYear("All");
    setSelectedSection("All");
    setSortBy("year_desc");
    setPage(1);
    setHasMore(false);
  }

  function retry() {
    setReloadKey((currentKey) => currentKey + 1);
  }

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCountry !== "All" ||
    selectedRegion !== "All" ||
    selectedYear !== "All" ||
    selectedSection !== "All";

  return {
    companies: records,
    totalFiltered,
    totalAll: options.totalCount,
    hasMore,
    visibleCount: records.length,
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
    sortOptions: SORT_OPTIONS,
    viewMode,
    setViewMode,
    loadMore,
    retry,
    clearFilters,
    hasActiveFilters,
  };
}
