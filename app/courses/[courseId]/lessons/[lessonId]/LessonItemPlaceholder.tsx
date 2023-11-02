import { Skeleton } from '@/components/ui/skeleton';
import { CircleDashed } from 'lucide-react';

export const LessonItemPlaceholder = () => {
  return (
    <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <CircleDashed size={16} />

      <Skeleton className="h-6 w-full" />
    </div>
  );
};
