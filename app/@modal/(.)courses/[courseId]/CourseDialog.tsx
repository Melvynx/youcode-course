'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export type CourseDialogProps = PropsWithChildren;

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
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
