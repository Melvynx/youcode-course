"use server";

import { authenticatedAction } from "@/lib/action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseEditAction = authenticatedAction
  .schema(CourseActionEditProps)
  .action(async ({ parsedInput: { courseId, data }, ctx: { userId } }) => {
    const course = await prisma.course.update({
      where: {
        id: courseId,
        creatorId: userId,
      },
      data: data,
    });

    return {
      message: "Course updated successfully",
      course,
    };
  });

export const courseCreateAction = authenticatedAction
  .schema(CourseFormSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const course = await prisma.course.create({
      data: {
        ...parsedInput,
        creatorId: userId,
      },
    });

    return {
      message: "Course created successfully",
      course,
    };
  });
