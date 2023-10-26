import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCourses = async (userId?: string) => {
  return await prisma.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              userId,
            },
          },
        }
      : undefined,
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
  });
};

export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];
