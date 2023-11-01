import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCourse = async ({
  courseId,
  userId = '-',
}: {
  courseId: string;
  userId?: string;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        where: {
          userId,
        },
        select: {
          canceledAt: true,
          id: true,
        },
      },
      lessons: {
        where: {
          state: {
            in: ['PUBLIC', 'PUBLISHED'],
          },
        },
        orderBy: {
          rank: 'asc',
        },
        select: {
          name: true,
          id: true,
          courseId: true,
          state: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
        },
      },

      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  const lessons = course.lessons.map((lesson) => {
    const progress = lesson.users[0]?.progress ?? 'NOT_STARTED';
    return {
      ...lesson,
      progress,
    };
  });

  return {
    ...course,
    isEnrolled: course.users.length > 0 && !course.users[0].canceledAt,
    isCanceled: course.users.length > 0 && !!course.users[0].canceledAt,
    lessons,
  };
};

export type CourseType = NonNullable<Prisma.PromiseReturnType<typeof getCourse>>;

export type CourseLessonItem = CourseType['lessons'][0];
