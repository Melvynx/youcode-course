import { SubmitButton } from '@/components/form/SubmitButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MdxProse } from './MdxProse';
import { OpenLessonNavigationButton } from './OpenLessonNavigationButton';
import { handleLessonState } from './lesson.action';
import { getLesson } from './lesson.query';

export default async function LessonPage({
  params: { lessonId, courseId },
}: {
  params: {
    lessonId: string;
    courseId: string;
  };
}) {
  const session = await getAuthSession();
  const lesson = await getLesson(lessonId, session?.user.id);

  if (!lesson) {
    notFound();
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: courseId,
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
    throw new Error('Unauthorized');
  }

  if (lesson.users.length === 0 && session?.user.id) {
    await prisma.lessonOnUser.create({
      data: {
        userId: session?.user.id,
        lessonId: lesson.id,
      },
    });
  }

  return (
    <Card className="flex-1">
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <OpenLessonNavigationButton />
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <MdxProse markdown={lesson.content} />

        <form className="m-auto flex max-w-2xl flex-row-reverse">
          <SubmitButton
            formAction={async () => {
              'use server';

              await handleLessonState({
                lessonId: lesson.id,
                progress:
                  lesson.progress === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED',
              });
            }}
          >
            {lesson.progress === 'COMPLETED' ? 'Mark as in progress' : 'Completed'}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
