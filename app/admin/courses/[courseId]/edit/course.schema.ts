import { z } from 'zod';

export const COURSE_STATE = ['DRAFT', 'PUBLISHED'] as const;

export const CourseFormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string(),
  state: z.enum(COURSE_STATE),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;
