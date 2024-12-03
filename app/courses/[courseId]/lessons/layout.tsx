import type { PropsWithChildren} from 'react';
import { Suspense } from 'react';
import { LessonsNavigation } from './LessonsNavigation';
import { LessonsNavigationSkeleton } from './LessonsNavigationSkeleton';

export default async function layout(
  props: PropsWithChildren<{
    params: Promise<{
      courseId: string;
    }>;
  }>
) {
  const params = await props.params;

  const {
    children
  } = props;

  return (
    <div className="relative flex items-start gap-4 p-4">
      <Suspense fallback={<LessonsNavigationSkeleton />}>
        <LessonsNavigation courseId={params.courseId} />
      </Suspense>
      {children}
    </div>
  );
}
