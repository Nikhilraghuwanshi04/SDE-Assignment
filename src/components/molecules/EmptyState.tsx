import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/atoms/button';

interface EmptyStateProps {
  onReset: () => void;
  title?: string;
  description?: string;
}

export function EmptyState({
  onReset,
  title = 'No Internships Found',
  description = 'We couldn\'t find any internships matching your current search criteria. Try modifying your filters or clearing them to start over.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-2xl shadow-sm text-center max-w-xl mx-auto my-4 transition-all duration-300">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl opacity-50 scale-125 animate-pulse" />
        <div className="relative p-5 bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-full border border-blue-100/50 dark:border-blue-900/30">
          <SearchX className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
        {title}
      </h3>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      
      <div className="pt-6">
        <Button
          onClick={onReset}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm flex items-center gap-2 px-5 py-2.5 rounded-xl border-none"
        >
          <RotateCcw className="w-4 h-4" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
