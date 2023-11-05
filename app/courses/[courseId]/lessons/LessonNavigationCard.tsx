'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { CourseType } from '../course.query';
import { LessonItem } from './LessonItem';
import {
  useLessonNavigationState,
  useLessonNavigationStore,
} from './lesson-navigation.store';

export default function LessonNavigationCard({ course }: { course: CourseType }) {
  const setState = useLessonNavigationStore((s) => s.setState);
  const state = useLessonNavigationState();

  if (state === 'sticky') {
    return (
      <Card className="max-w-xs flex-1">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>{course.name}</CardTitle>
          <Button onClick={() => setState('close')} size="sm" variant="ghost">
            <PanelLeftClose />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course.lessons.map((lesson) => (
            <LessonItem lesson={lesson} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Sheet open={state === 'open'} onOpenChange={() => setState('close')}>
      <SheetContent side="left">
        <SheetHeader className="flex-row items-center gap-4 space-y-0">
          <SheetTitle>Lessons</SheetTitle>
          <Button
            onClick={() => setState('sticky')}
            size="sm"
            variant="ghost"
            className="hidden lg:block"
          >
            <PanelLeftOpen />
          </Button>
        </SheetHeader>
        <ul
          className="my-8 flex flex-col gap-2"
          onClick={() => {
            setState('close');
          }}
        >
          {course.lessons.map((lesson) => (
            <LessonItem lesson={lesson} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
