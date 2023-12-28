import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CoursePaginationButton } from "@/features/pagination/PaginationButton";
import { AlertTriangle } from "lucide-react";
import { CourseCard } from "../courses/CourseCard";
import { getCourses } from "../courses/course.query";

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0) ?? 0;
  const { courses, totalCourses } = await getCourses({ page });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
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
            <AlertTitle>
              There are no courses yet. Please come back later.
            </AlertTitle>
            <AlertDescription>
              We are working hard to bring you the best courses.
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
