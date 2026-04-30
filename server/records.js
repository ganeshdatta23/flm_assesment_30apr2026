const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export function parseRecordQuery(searchParams) {
  const page = Math.max(Number.parseInt(searchParams.page || "1", 10), 1);
  const limit = Math.min(
    Math.max(Number.parseInt(searchParams.limit || String(DEFAULT_LIMIT), 10), 1),
    MAX_LIMIT
  );

  return {
    search: (searchParams.search || "").trim(),
    country: normalizeFilterValue(searchParams.country),
    region: normalizeFilterValue(searchParams.region),
    section: normalizeFilterValue(searchParams.section),
    year: normalizeYear(searchParams.year),
    sortBy: searchParams.sortBy || "year_desc",
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

export function buildRecordMatch(filters) {
  const match = {};

  if (filters.country) {
    match.Country = filters.country;
  }

  if (filters.region) {
    match.CDP_Region = filters.region;
  }

  if (filters.section) {
    match.Section = filters.section;
  }

  if (filters.year) {
    match.Year_Reported_to_CDP = filters.year;
  }

  if (filters.search) {
    match.$text = { $search: filters.search };
  }

  return match;
}

export function getRecordSort(sortBy) {
  switch (sortBy) {
    case "organization_asc":
      return { Organization: 1, _id: 1 };
    case "organization_desc":
      return { Organization: -1, _id: -1 };
    case "country_asc":
      return { Country: 1, Organization: 1, _id: 1 };
    case "year_asc":
      return { Year_Reported_to_CDP: 1, _id: 1 };
    default:
      return { Year_Reported_to_CDP: -1, _id: -1 };
  }
}

export function normalizeRecord(record) {
  return {
    id: String(record._id),
    organization: record.Organization || "",
    country: record.Country || "",
    region: record.CDP_Region || "",
    yearReported: record.Year_Reported_to_CDP || null,
    accountNumber: record.Account_Number || null,
    parentSection: record.Parent_Section || "",
    section: record.Section || "",
    questionNumber: record.Question_Number || "",
    questionName: record.Question_Name || "",
    columnName: record.Column_Name || "",
    rowName: record.Row_Name || "",
    responseAnswer: record.Response_Answer || "",
    lastUpdate: record.Last_update || "",
  };
}

function normalizeFilterValue(value) {
  if (!value || value === "All") {
    return "";
  }

  return value;
}

function normalizeYear(value) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) ? parsed : null;
}
