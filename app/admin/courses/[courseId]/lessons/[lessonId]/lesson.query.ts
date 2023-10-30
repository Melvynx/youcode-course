import { prisma } from '@/lib/prisma';

export const getAdminLesson = async (lessonId: string, userId: string) => {
  return await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      course: {
        creatorId: userId,
      },
    },
  });
};
