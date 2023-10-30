'use server';

import { authenticatedAction } from '@/lib/action';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { CourseFormSchema } from './course.schema';

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authenticatedAction(
  CourseActionEditProps,
  async (props, { userId }) => {
    await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });

    return 'Course updated successfully';
  }
);
