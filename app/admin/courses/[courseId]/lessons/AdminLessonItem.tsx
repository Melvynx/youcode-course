import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { AdminLessonItemType } from './lessons.query';

import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Menu } from 'lucide-react';

export type LessonItemProps = {
  lesson: AdminLessonItemType;
  index: number;
};

export const AdminLessonItem = ({ lesson }: LessonItemProps) => {
  return (
    <Link href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Typography variant="large">{lesson.name}</Typography>
        <Badge className="ml-auto">{lesson.state}</Badge>
      </div>
    </Link>
  );
};

export function AdminLessonItemSortable({ lesson, index }: LessonItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, activeIndex } =
    useSortable({
      id: lesson.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: index === activeIndex ? 999 : undefined,
  };

  return (
    <Link href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div ref={setNodeRef} style={style} {...attributes}>
        <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
          <Typography variant="large">{lesson.name}</Typography>
          <Badge className="ml-auto">{lesson.state}</Badge>
          <div
            onClickCapture={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Button size="sm" variant="ghost" className="cursor-move" {...listeners}>
              <Menu size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
