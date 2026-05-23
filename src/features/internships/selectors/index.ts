import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/redux/store';

const selectInternshipsData = (state: RootState) => state.internships.data;
export const selectFilters = (state: RootState) => state.internships.filters;

export const selectFilteredInternships = createSelector(
  [selectInternshipsData, selectFilters],
  (internships, filters) => {
    return internships.filter((internship) => {
      // 1. Profile Filter (Case insensitive partial match)
      if (filters.profile && filters.profile.trim() !== '') {
        const profileMatch = internship.profile_name?.toLowerCase().includes(filters.profile.toLowerCase()) || 
                             internship.title?.toLowerCase().includes(filters.profile.toLowerCase());
        if (!profileMatch) return false;
      }

      // 2. Location Filter (Case insensitive partial match)
      if (filters.location && filters.location.trim() !== '') {
        const locationQuery = filters.location.toLowerCase();
        // Check location names array or if it's WFH
        const matchesLocation = internship.location_names.some((loc) => loc.toLowerCase().includes(locationQuery));
        const isWfhQuery = locationQuery.includes('work from home') || locationQuery.includes('remote');
        if (!matchesLocation && !(isWfhQuery && internship.work_from_home)) {
          return false;
        }
      }

      // 3. Duration Filter (Max Duration)
      // duration is usually formatted like "3 Months"
      if (filters.duration && filters.duration.length > 0) {
        // Find the max allowed duration from the selected filters
        // e.g., if user selects ["1", "2"], max allowed is 2.
        const maxDurationAllowed = Math.max(...filters.duration.map(d => parseInt(d)));
        
        // Extract number from "3 Months"
        const durationMatch = internship.duration.match(/\d+/);
        if (durationMatch) {
          const internshipDuration = parseInt(durationMatch[0]);
          if (internshipDuration > maxDurationAllowed) {
            return false;
          }
        }
      }

      // 4. Stipend Filter (Minimum Stipend)
      if (filters.stipend > 0) {
        const internshipStipend = internship.stipend?.salaryValue1 || 0;
        if (internshipStipend < filters.stipend) {
          return false;
        }
      }

      return true;
    });
  }
);

export const selectCurrentPage = (state: RootState) => state.internships.currentPage;
export const selectItemsPerPage = (state: RootState) => state.internships.itemsPerPage;

export const selectPaginatedInternships = createSelector(
  [selectFilteredInternships, selectCurrentPage, selectItemsPerPage],
  (filteredInternships, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredInternships.slice(startIndex, endIndex);
  }
);

export const selectTotalFilteredResults = createSelector(
  [selectFilteredInternships],
  (filteredInternships) => filteredInternships.length
);
