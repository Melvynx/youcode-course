import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getLesson = async (lessonId: string, userId = '-') => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      state: {
        not: 'HIDDEN',
      },
    },
    select: {
      id: true,
      content: true,
      name: true,
      state: true,
      users: {
        where: {
          id: userId,
        },
        select: {
          id: true,
          progress: true,
        },
      },
    },
  });

  if (!lesson) {
    return null;
  }

  return lesson;
};

export type LessonType = NonNullable<Prisma.PromiseReturnType<typeof getLesson>>;
