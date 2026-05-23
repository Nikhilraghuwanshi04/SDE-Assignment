import { Skeleton } from '@/components/atoms/skeleton';
import { Card } from '@/components/atoms/card';

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Skeleton */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-1/3 md:w-1/4 rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Skeleton */}
          <aside className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <Card className="border-none shadow-sm dark:bg-gray-900/60 p-6 space-y-6">
              <div className="flex justify-between items-center pb-2">
                <Skeleton className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
              
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </Card>
          </aside>

          {/* List Skeleton */}
          <main className="w-full md:w-2/3 lg:w-3/4 flex-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="w-full dark:bg-gray-900/60 p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800" />
                </div>
                
                <Skeleton className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800" />
                
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
                
                <hr className="border-gray-100 dark:border-gray-800/80" />
                
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-9 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              </Card>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
