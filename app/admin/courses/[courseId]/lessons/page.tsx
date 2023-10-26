/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { AdminLessonItem } from './AdminLessonItem';
import { getCourseLessons } from './lessons.query';

export default async function CourseLessonsPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const course = await getCourseLessons({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons · {course.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => (
              <AdminLessonItem key={lesson.id} lesson={lesson} />
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
