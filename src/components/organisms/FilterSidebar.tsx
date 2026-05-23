'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '@/features/internships/slice';
import { RootState } from '@/store/redux/store';
import { Input } from '@/components/atoms/input';
import { Checkbox } from '@/components/atoms/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { FilterGroup } from '@/components/molecules/FilterGroup';
import { useEffect } from 'react';
import { SlidersHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/atoms/button';

const filterSchema = z.object({
  profile: z.string().optional(),
  location: z.string().optional(),
  duration: z.array(z.string()).optional(),
  stipend: z.number().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

const DURATION_OPTIONS = [
  { id: '1', label: '1 Month' },
  { id: '2', label: '2 Months' },
  { id: '3', label: '3 Months' },
  { id: '4', label: '4 Months' },
  { id: '6', label: '6 Months' },
];

export function FilterSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.internships.filters);

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      profile: filters.profile,
      location: filters.location,
      duration: filters.duration,
      stipend: filters.stipend,
    },
  });

  const { control, watch, reset, setValue } = form;

  // Watch all form fields and dispatch to Redux on change
  useEffect(() => {
    const subscription = watch((value) => {
      const parsedValue = {
        profile: value.profile || '',
        location: value.location || '',
        duration: value.duration ? (value.duration as string[]) : [],
        stipend: value.stipend || 0,
      };
      dispatch(setFilters(parsedValue));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const handleClearFilters = () => {
    reset({
      profile: '',
      location: '',
      duration: [],
      stipend: 0,
    });
    dispatch(clearFilters());
  };

  const isAnyFilterActive = 
    !!watch('profile') || 
    !!watch('location') || 
    (watch('duration')?.length || 0) > 0 || 
    (watch('stipend') || 0) > 0;

  return (
    <Card className="sticky top-6 border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm h-fit rounded-2xl overflow-hidden transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-50 dark:border-gray-800/80 px-6 py-5">
        <CardTitle className="text-base flex items-center font-bold text-gray-800 dark:text-gray-100">
          <SlidersHorizontal className="w-4 h-4 mr-2.5 text-blue-600 dark:text-blue-400" />
          Filters
        </CardTitle>
        {isAnyFilterActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 px-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Profile Filter Group */}
        <FilterGroup 
          title="Profile" 
          tooltip="Enter keywords such as Data Science, Marketing, or Web Developer"
          showClear={!!watch('profile')}
          onClear={() => setValue('profile', '')}
        >
          <Controller
            control={control}
            name="profile"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="e.g. Marketing"
                className="w-full h-10 px-3 border border-gray-200 dark:border-gray-800/80 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-950 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            )}
          />
        </FilterGroup>

        {/* Location Filter Group */}
        <FilterGroup 
          title="Location" 
          tooltip="Filter by cities (e.g. Delhi, Bangalore) or search 'remote' / 'work from home'"
          showClear={!!watch('location')}
          onClear={() => setValue('location', '')}
        >
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="e.g. Delhi"
                className="w-full h-10 px-3 border border-gray-200 dark:border-gray-800/80 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-950 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            )}
          />
        </FilterGroup>

        {/* Duration Filter Group */}
        <FilterGroup 
          title="Max Duration (Months)" 
          tooltip="Filters out internships that require longer commitments than checked"
          showClear={(watch('duration')?.length || 0) > 0}
          onClear={() => setValue('duration', [])}
        >
          <Controller
            control={control}
            name="duration"
            render={({ field }) => {
              const currentValues = field.value || [];
              return (
                <div className="space-y-2.5">
                  {DURATION_OPTIONS.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 group/item">
                      <Checkbox
                        id={`duration-${option.id}`}
                        checked={currentValues.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...currentValues, option.id]);
                          } else {
                            field.onChange(currentValues.filter((v) => v !== option.id));
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:bg-gray-950"
                      />
                      <label
                        htmlFor={`duration-${option.id}`}
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover/item:text-gray-900 dark:group-hover/item:text-gray-200 cursor-pointer transition-colors"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </FilterGroup>

        {/* Stipend Filter Group */}
        <FilterGroup 
          title="Minimum Stipend" 
          tooltip="Select the minimum stipend amount you wish to receive per month"
          showClear={(watch('stipend') || 0) > 0}
          onClear={() => setValue('stipend', 0)}
        >
          <Controller
            control={control}
            name="stipend"
            render={({ field }) => (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-950 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800/60">
                  <span className="text-xs text-gray-400 dark:text-gray-500">Stipend:</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                    ₹ {field.value || 0} /month
                  </span>
                </div>
                <div className="pt-1.5 px-1">
                  <input
                    type="range"
                    min="0"
                    max="40000"
                    step="2000"
                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                    value={field.value || 0}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-600 mt-2 font-medium">
                    <span>₹0</span>
                    <span>₹20k</span>
                    <span>₹40k</span>
                  </div>
                </div>
              </div>
            )}
          />
        </FilterGroup>
      </CardContent>
    </Card>
  );
}
