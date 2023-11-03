import { LessonSkeleton } from './[lessonId]/LessonSkeleton';
import { LessonsNavigationSkeleton } from './LessonsNavigationSkeleton';

export default function LessonLoading() {
  return (
    <div className="flex items-start gap-4 p-4">
      <LessonsNavigationSkeleton />
      <LessonSkeleton />
    </div>
  );
}
