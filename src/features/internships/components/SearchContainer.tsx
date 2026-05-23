'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Internship } from '@/types/internship';
import { setInternships } from '@/features/internships/slice';
import { SearchLayout } from '@/components/templates/SearchLayout';
import { SearchHeader } from '@/components/organisms/SearchHeader';
import { FilterSidebar } from '@/components/organisms/FilterSidebar';
import { InternshipList } from '@/components/organisms/InternshipList';
import { ReduxProvider } from '@/store/redux/provider';

interface SearchContainerProps {
  initialData: Internship[];
}

function SearchContainerInner({ initialData }: SearchContainerProps) {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(setInternships(initialData));
      initialized.current = true;
    }
  }, [dispatch, initialData]);

  return (
    <SearchLayout
      header={<SearchHeader />}
      sidebar={<FilterSidebar />}
      content={<InternshipList />}
    />
  );
}

export function SearchContainer({ initialData }: SearchContainerProps) {
  return (
    <ReduxProvider>
      <SearchContainerInner initialData={initialData} />
    </ReduxProvider>
  );
}
