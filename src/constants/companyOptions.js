export const PAGE_SIZE = 20;

export const SORT_OPTIONS = [
  { value: "year_desc", label: "Newest Year" },
  { value: "year_asc", label: "Oldest Year" },
  { value: "organization_asc", label: "Organization (A to Z)" },
  { value: "organization_desc", label: "Organization (Z to A)" },
  { value: "country_asc", label: "Country (A to Z)" },
];

export const TABLE_COLUMNS = [
  "Organization",
  "Country",
  "Year",
  "Region",
  "Section",
  "Question",
  "Answer",
];
