'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { CourseType } from '../../../courses/[courseId]/course.query';

export type CourseDialogProps = PropsWithChildren<{
  course: CourseType;
}>;

export const CourseDialog = (props: CourseDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCoursePage = pathname?.split('/').filter(Boolean).length === 2;

  return (
    <Dialog
      open={isCoursePage}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>{props.course.name}</DialogTitle>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
