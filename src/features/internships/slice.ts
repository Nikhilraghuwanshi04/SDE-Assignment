import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Internship } from '@/types/internship';

export interface Filters {
  profile: string;
  location: string;
  duration: string[]; // e.g. ["1", "2", "3", "4", "5", "6"] months
  stipend: number;
}

interface InternshipsState {
  data: Internship[];
  filters: Filters;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: InternshipsState = {
  data: [],
  filters: {
    profile: '',
    location: '',
    duration: [],
    stipend: 0,
  },
  currentPage: 1,
  itemsPerPage: 5, // We can set to 5 or 10. Let's set 5 items per page for mock data to make pagination very usable
};

const internshipsSlice = createSlice({
  name: 'internships',
  initialState,
  reducers: {
    setInternships: (state, action: PayloadAction<Internship[]>) => {
      state.data = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
      state.currentPage = 1; // Reset to page 1 on filter change
    },
    updateFilter: <K extends keyof Filters>(
      state: InternshipsState,
      action: PayloadAction<{ key: K; value: Filters[K] }>
    ) => {
      state.filters[action.payload.key] = action.payload.value;
      state.currentPage = 1; // Reset to page 1 on filter update
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1; // Reset to page 1 on clear
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { 
  setInternships, 
  setFilters, 
  updateFilter, 
  clearFilters, 
  setCurrentPage, 
  setItemsPerPage 
} = internshipsSlice.actions;

export default internshipsSlice.reducer;
