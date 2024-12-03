"use server";

import { ActionError, authenticatedAction } from "@/lib/action";
import { getTheMiddleRank } from "@/lib/getTheMiddleRank";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const SaveLessonMoveSchema = z.object({
  upItemRank: z.string().optional(),
  downItemRank: z.string().optional(),
  lessonId: z.string(),
});

export const saveLessonMoveAction = authenticatedAction
  .schema(SaveLessonMoveSchema)
  .action(
    async ({
      parsedInput: { upItemRank, downItemRank, lessonId },
      ctx: { userId },
    }) => {
      const course = await prisma.course.findFirst({
        where: {
          lessons: {
            some: {
              id: lessonId,
            },
          },
          creatorId: userId,
        },
      });

      if (!course) {
        throw new ActionError("This course doesn't exist");
      }

      const lesson = await prisma.lesson.findFirst({
        where: {
          id: lessonId,
          courseId: course.id,
        },
      });

      if (!lesson) {
        throw new ActionError("This lesson doesn't exist");
      }

      const newRank = getTheMiddleRank(upItemRank, downItemRank);

      await prisma.lesson.update({
        where: {
          id: lessonId,
        },
        data: {
          rank: newRank,
        },
      });

      return newRank;
    }
  );
