'use server';

import { authenticatedAction } from '@/lib/action';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { LessonDetailSchema } from './form/lesson.schema';

const LessonActionEditDetailsSchema = z.object({
  lessonId: z.string(),
  data: LessonDetailSchema,
});

export const lessonActionEditDetails = authenticatedAction(
  LessonActionEditDetailsSchema,
  async (props, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: props.lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: props.data,
    });

    return {
      message: 'Lesson updated successfully',
      lesson,
    };
  }
);

const LessonActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const lessonActionEditContent = authenticatedAction(
  LessonActionEditContentSchema,
  async ({ lessonId, markdown }, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: {
        content: markdown,
      },
    });

    return {
      message: 'Lesson updated successfully',
      lesson,
    };
  }
);
