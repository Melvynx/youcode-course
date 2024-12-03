import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Course } from "./Course";
import { getCourse } from "./course.query";

export default async function CoursePage(props: {
  params: Promise<{
    courseId: string;
  }>;
}) {
  const params = await props.params;
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: params.courseId,
    userId: session?.user?.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Course course={course} userId={session?.user?.id} />
      </LayoutContent>
    </Layout>
  );
}
