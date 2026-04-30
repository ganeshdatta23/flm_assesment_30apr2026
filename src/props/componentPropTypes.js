import PropTypes from "prop-types";

export const companyPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  yearReported: PropTypes.number,
  accountNumber: PropTypes.number,
  parentSection: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  questionNumber: PropTypes.string.isRequired,
  questionName: PropTypes.string.isRequired,
  columnName: PropTypes.string.isRequired,
  rowName: PropTypes.string.isRequired,
  responseAnswer: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
});

export const filterBarPropTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  handleCountry: PropTypes.func.isRequired,
  selectedRegion: PropTypes.string.isRequired,
  handleRegion: PropTypes.func.isRequired,
  selectedYear: PropTypes.string.isRequired,
  handleYear: PropTypes.func.isRequired,
  selectedSection: PropTypes.string.isRequired,
  handleSection: PropTypes.func.isRequired,
  options: PropTypes.shape({
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    regions: PropTypes.arrayOf(PropTypes.string).isRequired,
    years: PropTypes.arrayOf(PropTypes.number).isRequired,
    sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  sortBy: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  viewMode: PropTypes.oneOf(["grid", "table"]).isRequired,
  setViewMode: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  totalFiltered: PropTypes.number.isRequired,
};

export const headerPropTypes = {
  totalAll: PropTypes.number.isRequired,
  totalFiltered: PropTypes.number.isRequired,
};

export const statsBarPropTypes = {
  topCountries: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedCountry: PropTypes.string.isRequired,
  handleCountry: PropTypes.func.isRequired,
};

export const emptyStatePropTypes = {
  clearFilters: PropTypes.func.isRequired,
};

export const companyTablePropTypes = {
  companies: PropTypes.arrayOf(companyPropType).isRequired,
};

export const companyCardPropTypes = {
  company: companyPropType.isRequired,
};
