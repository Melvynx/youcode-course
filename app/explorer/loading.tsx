import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { CourseCardSkeleton } from '../courses/CourseCardSkeleton';

export default async function LoadingPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
