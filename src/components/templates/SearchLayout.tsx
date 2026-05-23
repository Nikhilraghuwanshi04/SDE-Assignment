import { ReactNode } from 'react';

interface SearchLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

export function SearchLayout({ header, sidebar, content }: SearchLayoutProps) {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {header}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <aside className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            {sidebar}
          </aside>
          <main className="w-full md:w-2/3 lg:w-3/4 flex-1">
            {content}
          </main>
        </div>
      </div>
    </div>
  );
}
