"use server";

import { authenticatedAction } from "@/lib/action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { LessonDetailSchema } from "./form/lesson.schema";

const LessonActionEditDetailsSchema = z.object({
  lessonId: z.string(),
  data: LessonDetailSchema,
});

export const lessonEditDetailsAction = authenticatedAction
  .schema(LessonActionEditDetailsSchema)
  .action(async ({ parsedInput: { lessonId, data }, ctx: { userId } }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: data,
    });

    return {
      message: "Lesson updated successfully",
      lesson,
    };
  });

const LessonActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const lessonEditContentAction = authenticatedAction
  .schema(LessonActionEditContentSchema)
  .action(async ({ parsedInput: { lessonId, markdown }, ctx: { userId } }) => {
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
      message: "Lesson updated successfully",
      lesson,
    };
  });
