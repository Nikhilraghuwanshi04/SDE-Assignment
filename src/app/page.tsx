import { SearchContainer } from '@/features/internships/components/SearchContainer';
import { mockInternships } from '@/features/internships/api/mockData';

// Simulate an asynchronous server fetch (like calling an API or DB)
async function getInternships() {
  return new Promise<typeof mockInternships>((resolve) => {
    setTimeout(() => {
      resolve(mockInternships);
    }, 500); // 500ms delay to simulate network
  });
}

export default async function Home() {
  const data = await getInternships();

  return (
    <main>
      <SearchContainer initialData={data} />
    </main>
  );
}
