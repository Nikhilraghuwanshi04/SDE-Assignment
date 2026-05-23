'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredInternships, selectPaginatedInternships } from '@/features/internships/selectors';
import { InternshipCard } from '@/components/molecules/InternshipCard';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Pagination } from '@/components/molecules/Pagination';
import { clearFilters } from '@/features/internships/slice';

export function InternshipList() {
  const dispatch = useDispatch();
  const paginatedInternships = useSelector(selectPaginatedInternships);
  const totalFiltered = useSelector(selectFilteredInternships).length;

  const handleResetFilters = () => {
    dispatch(clearFilters());
  };

  if (totalFiltered === 0) {
    return <EmptyState onReset={handleResetFilters} />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {paginatedInternships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
