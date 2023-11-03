import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { buttonVariants } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lesson } from './Lesson';
import { LessonsNavigation } from './LessonsNavigation';
import { getLesson } from './lesson.query';

export default async function LessonPage({
  params,
}: {
  params: {
    lessonId: string;
    courseId: string;
  };
}) {
  const session = await getAuthSession();
  const lesson = await getLesson(params.lessonId, session?.user.id);

  if (!lesson) {
    notFound();
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      users: {
        where: {
          userId: session?.user.id ?? '-',
          canceledAt: null,
        },
      },
    },
  });

  if (lesson.state !== 'PUBLIC' && !isAuthorized?.users.length) {
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>
            You need to be enrolled in this course to view this lesson.
          </LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Link href={`/courses/${params.courseId}`} className={buttonVariants()}>
            Join now
          </Link>
        </LayoutContent>
      </Layout>
    );
  }

  return (
    <div className="flex items-start gap-4 p-4">
      <LessonsNavigation courseId={params.courseId} />
      <Lesson lesson={lesson} />
    </div>
  );
}
