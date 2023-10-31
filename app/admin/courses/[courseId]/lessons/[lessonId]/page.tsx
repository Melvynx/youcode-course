/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LessonDetail } from './form/LessonDetailsForm';
import { getAdminLesson } from './lesson.query';

export default async function CourseLessonsPage({
  params,
}: {
  params: {
    lessonId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const lesson = await getAdminLesson(params.lessonId, session.user.id);

  if (!lesson) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link
          className={buttonVariants({
            size: 'sm',
            variant: 'secondary',
          })}
          href={`/admin/courses/${lesson.courseId}/lessons`}
        >
          Back
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonDetail defaultValue={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}