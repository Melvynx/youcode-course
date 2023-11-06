import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const COUNT_BY_PAGE = 10;

export const getCourses = async ({
  userId,
  page = 0,
}: {
  userId?: string;
  page?: number;
}) => {
  const whereQuery = (
    userId
      ? {
          users: {
            some: {
              userId,
              canceledAt: null,
            },
          },
        }
      : {
          state: 'PUBLISHED',
        }
  ) satisfies Prisma.CourseWhereInput;

  const totalCourses = await prisma.course.count({
    where: whereQuery,
  });

  const courses = await prisma.course.findMany({
    where: whereQuery,
    select: {
      name: true,
      image: true,
      presentation: true,
      id: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    take: COUNT_BY_PAGE,
    skip: Math.max(0, page * COUNT_BY_PAGE),
  });

  return {
    courses,
    totalCourses: Math.floor(totalCourses / COUNT_BY_PAGE),
  };
};

export type CoursesCard = Prisma.PromiseReturnType<
  typeof getCourses
>['courses'][number];
