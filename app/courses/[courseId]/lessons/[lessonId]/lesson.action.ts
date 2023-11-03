'use server';

import { authenticatedAction } from '@/lib/action';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const handleLessonState = authenticatedAction(
  z.object({
    lessonId: z.string(),
    progress: z.enum(['COMPLETED', 'IN_PROGRESS']),
  }),
  async ({ lessonId, progress }, { userId }) => {
    const updatedLessonOnUser = await prisma.lessonOnUser.update({
      where: {
        userId_lessonId: {
          lessonId,
          userId,
        },
      },
      data: {
        progress,
      },
      select: {
        lesson: {
          select: {
            rank: true,
            courseId: true,
            id: true,
          },
        },
      },
    });

    const nextLesson = await prisma.lesson.findFirst({
      where: {
        courseId: updatedLessonOnUser.lesson.courseId,
        rank: {
          gt: updatedLessonOnUser.lesson.rank,
        },
        state: {
          not: 'HIDDEN',
        },
      },
      orderBy: {
        rank: 'asc',
      },
    });

    revalidatePath(
      `/courses/${updatedLessonOnUser.lesson.courseId}/lessons/${lessonId}`
    );

    if (!nextLesson) {
      return;
    }

    redirect(
      `/courses/${updatedLessonOnUser.lesson.courseId}/lessons/${nextLesson.id}`
    );
  }
);
