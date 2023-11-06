import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getAuthSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Course } from '../../../courses/[courseId]/Course';
import { CoursePlaceholder } from '../../../courses/[courseId]/CoursePlaceholder';
import { getCourse } from '../../../courses/[courseId]/course.query';
import { CourseDialog } from './CourseDialog';

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  if (!params.courseId) {
    notFound();
  }

  return (
    <CourseDialog>
      <Suspense
        fallback={
          <>
            <DialogHeader>
              <DialogTitle>Loading...</DialogTitle>
            </DialogHeader>
            <CoursePlaceholder />
          </>
        }
      >
        <CourseWithData courseId={params.courseId} />
      </Suspense>
    </CourseDialog>
  );
}

const CourseWithData = async ({ courseId }: { courseId: string }) => {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: courseId,
    userId: session?.user.id,
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (!course) {
    notFound();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{course.name}</DialogTitle>
      </DialogHeader>
      <Course course={course} userId={session?.user.id} />
    </>
  );
};
