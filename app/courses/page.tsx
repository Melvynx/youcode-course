import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { NotAuthenticatedCard } from '@/features/errors/NotAuthentificatedCard';
import { CoursePaginationButton } from '@/features/pagination/PaginationButton';
import { getAuthSession } from '@/lib/auth';
import { AlertTriangle } from 'lucide-react';
import { CourseCard } from '../courses/CourseCard';
import { getCourses } from '../courses/course.query';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return <NotAuthenticatedCard />;
  }

  const page = Number(searchParams.page ?? 0) ?? 0;
  const { courses, totalCourses } = await getCourses({
    userId: session.user.id,
    page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
        {courses.length === 0 ? (
          <Alert>
            <AlertTriangle />
            <AlertTitle>You are not enrolled in any courses yet.</AlertTitle>
            <AlertDescription>
              Please go to the explorer page to find a course.
            </AlertDescription>
          </Alert>
        ) : (
          <CoursePaginationButton
            baseUrl={`/courses`}
            page={page}
            totalPage={totalCourses}
          />
        )}
      </LayoutContent>
    </Layout>
  );
}
