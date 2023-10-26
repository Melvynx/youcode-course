import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/typography';
import { Lesson } from '@prisma/client';

export type LessonItemProps = {
  lesson: Lesson;
};

export const LessonItem = (props: LessonItemProps) => {
  return (
    <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <Typography variant="large">{props.lesson.name}</Typography>
      <Badge className="ml-auto">{props.lesson.state}</Badge>
    </div>
  );
};
