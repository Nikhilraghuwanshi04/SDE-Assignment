'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, selectTotalFilteredResults } from '@/features/internships/selectors';
import { updateFilter, clearFilters } from '@/features/internships/slice';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { 
  Search, 
  Moon, 
  Sun, 
  GraduationCap, 
  X, 
  SlidersHorizontal 
} from 'lucide-react';

export function SearchHeader() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const totalResults = useSelector(selectTotalFilteredResults);
  
  const [isDark, setIsDark] = useState(() => (
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  ));

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilter({ key: 'profile', value: e.target.value }));
  };

  const removeChip = (key: 'profile' | 'location' | 'duration' | 'stipend', valueToRemove?: string) => {
    if (key === 'profile') {
      dispatch(updateFilter({ key: 'profile', value: '' }));
    } else if (key === 'location') {
      dispatch(updateFilter({ key: 'location', value: '' }));
    } else if (key === 'stipend') {
      dispatch(updateFilter({ key: 'stipend', value: 0 }));
    } else if (key === 'duration' && valueToRemove) {
      const remainingDurations = filters.duration.filter((d) => d !== valueToRemove);
      dispatch(updateFilter({ key: 'duration', value: remainingDurations }));
    }
  };

  // Check if any filter is active
  const hasActiveFilters = 
    !!filters.profile || 
    !!filters.location || 
    filters.duration.length > 0 || 
    filters.stipend > 0;

  return (
    <div className="space-y-6">
      {/* Brand Navigation Bar */}
      <nav className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 py-4 px-6 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md flex items-center justify-center text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              INTERNSHALA
            </span>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 block -mt-1 tracking-wider uppercase">
              Clone Platform
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-all">Internships</span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-all">Jobs</span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-all">Courses</span>
          </div>

          <span className="h-5 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:inline" />

          {/* Theme Switcher Button */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="w-10 h-10 p-0 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-center border-none"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500" />
            )}
          </Button>
        </div>
      </nav>

      {/* Main Banner Search Card */}
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl p-6 md:p-8 border border-blue-100/30 dark:border-blue-900/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {totalResults} {totalResults === 1 ? 'internship' : 'internships'} matching
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            Find high-paying internships instantly. Refine using the filters or search profiles below.
          </p>
        </div>

        {/* Live Profile Search Input */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            value={filters.profile}
            onChange={handleSearchChange}
            placeholder="Search profiles (e.g. Developer, Web)"
            className="w-full h-11 pl-10 pr-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 p-1">
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3 h-3" /> Active:
          </span>

          {filters.profile && (
            <Badge 
              variant="secondary" 
              className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 rounded-lg flex items-center gap-1 border border-blue-100/50 dark:border-blue-900/30 font-medium"
            >
              Profile: {filters.profile}
              <Button 
                onClick={() => removeChip('profile')}
                className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center justify-center border-none"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            </Badge>
          )}

          {filters.location && (
            <Badge 
              variant="secondary" 
              className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 rounded-lg flex items-center gap-1 border border-blue-100/50 dark:border-blue-900/30 font-medium"
            >
              Location: {filters.location}
              <Button 
                onClick={() => removeChip('location')}
                className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center justify-center border-none"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            </Badge>
          )}

          {filters.duration.map((dur) => (
            <Badge 
              key={`chip-${dur}`}
              variant="secondary" 
              className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 rounded-lg flex items-center gap-1 border border-blue-100/50 dark:border-blue-900/30 font-medium"
            >
              Duration: {dur} {parseInt(dur) === 1 ? 'Month' : 'Months'}
              <Button 
                onClick={() => removeChip('duration', dur)}
                className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center justify-center border-none"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            </Badge>
          ))}

          {filters.stipend > 0 && (
            <Badge 
              variant="secondary" 
              className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 rounded-lg flex items-center gap-1 border border-blue-100/50 dark:border-blue-900/30 font-medium"
            >
              Stipend: ≥ ₹{filters.stipend}/mo
              <Button 
                onClick={() => removeChip('stipend')}
                className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center justify-center border-none"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            </Badge>
          )}

          <Button
            onClick={() => dispatch(clearFilters())}
            variant="ghost"
            className="text-xs h-7 px-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
