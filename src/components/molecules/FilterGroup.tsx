import { ReactNode } from 'react';
import { Button } from '@/components/atoms/button';
import { HelpCircle, X } from 'lucide-react';

interface FilterGroupProps {
  title: string;
  children: ReactNode;
  className?: string;
  tooltip?: string;
  onClear?: () => void;
  showClear?: boolean;
}

export function FilterGroup({
  title,
  children,
  className = '',
  tooltip,
  onClear,
  showClear = false,
}: FilterGroupProps) {
  return (
    <div className={`space-y-3 pb-6 border-b border-gray-100/80 last:border-0 last:pb-0 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 group">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
            {title}
          </label>
          {tooltip && (
            <div className="relative flex items-center justify-center text-gray-300 dark:text-gray-600 hover:text-gray-500 cursor-help group/tooltip">
              <HelpCircle className="w-3.5 h-3.5" />
              <div className="absolute left-1/2 bottom-full mb-1.5 hidden group-hover/tooltip:block -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-md z-10 font-normal normal-case tracking-normal">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        {showClear && onClear && (
          <Button
            type="button"
            variant="ghost"
            onClick={onClear}
            className="h-5 px-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded flex items-center gap-0.5"
          >
            <X className="w-2.5 h-2.5" /> Clear
          </Button>
        )}
      </div>
      <div className="pt-1.5 transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}
