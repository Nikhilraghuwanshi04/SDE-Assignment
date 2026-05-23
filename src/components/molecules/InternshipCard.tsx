import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Internship } from '@/types/internship';
import { 
  MapPin, 
  PlayCircle, 
  Calendar, 
  IndianRupee, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { Separator } from '@/components/atoms/separator';

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const [imgError, setImgError] = useState(false);

  // Helper to get initials if company logo is missing or errors
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="w-full hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden group">
      <CardHeader className="pb-3 px-6 pt-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5 flex-1">
            {internship.is_active && (
              <Badge 
                variant="secondary" 
                className="mb-1 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/50 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100/20 px-2 py-0.5 rounded-md inline-flex items-center gap-1"
              >
                <PlayCircle className="w-3.5 h-3.5" /> Actively hiring
              </Badge>
            )}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {internship.title}
            </h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {internship.company_name}
            </p>
          </div>

          {/* Company Logo / Initials Avatar */}
          <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-950 shadow-inner">
            {!imgError && internship.company_logo ? (
              <img 
                src={`https://internshala.com/cached_uploads/logos/${internship.company_logo}`} 
                alt={internship.company_name} 
                className="w-full h-full object-contain p-1.5"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                {getInitials(internship.company_name)}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5 px-6 pb-4">
        {/* Location Info */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 font-medium">
          <MapPin className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
          <span>
            {internship.work_from_home 
              ? 'Work from Home' 
              : internship.location_names && internship.location_names.length > 0
                ? internship.location_names.join(', ')
                : 'India'}
          </span>
        </div>
        
        {/* Internship details row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50/50 dark:bg-gray-950/20 p-4 rounded-xl border border-gray-100/50 dark:border-gray-800/40 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-2.5">
            <PlayCircle className="w-4 h-4 text-blue-500/70" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">Start Date</span>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{internship.start_date}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2.5">
            <Calendar className="w-4 h-4 text-emerald-500/70" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">Duration</span>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{internship.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2.5 col-span-2 md:col-span-1">
            <IndianRupee className="w-4 h-4 text-amber-500/70" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">Stipend</span>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{internship.stipend.salary}</span>
            </div>
          </div>
        </div>
        
        {/* Tags / Meta Info */}
        <div className="flex flex-wrap gap-2">
          {internship.is_ppo && (
            <Badge 
              variant="outline" 
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 font-semibold rounded-lg px-2.5 py-0.5"
            >
              {internship.ppo_label_value || 'With job offer'}
            </Badge>
          )}
          {internship.part_time && (
            <Badge 
              variant="outline" 
              className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30 font-semibold rounded-lg px-2.5 py-0.5"
            >
              Part time
            </Badge>
          )}
          {internship.is_premium_internship && (
            <Badge 
              variant="outline" 
              className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30 font-semibold rounded-lg px-2.5 py-0.5"
            >
              Premium
            </Badge>
          )}
        </div>
      </CardContent>
      
      <Separator className="border-gray-50 dark:border-gray-800" />
      
      <CardFooter className="px-6 py-4 flex justify-between items-center bg-gray-50/30 dark:bg-gray-950/10">
        <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 font-medium">
          <Clock className="w-3.5 h-3.5 mr-1" />
          <span>{internship.posted_by_label || internship.posted_on}</span>
        </div>
        <div className="space-x-2 flex">
          <Button 
            variant="ghost" 
            className="text-xs h-9 px-4 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/80 font-semibold border-none"
          >
            View details
          </Button>
          <Button 
            className="text-xs h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 shadow-sm transition-all duration-200 hover:shadow"
          >
            Apply now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
