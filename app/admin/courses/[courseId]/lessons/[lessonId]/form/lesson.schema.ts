import { z } from 'zod';

export const LESSON_STATE = ['HIDDEN', 'PUBLIC', 'PUBLISHED'] as const;

export const LessonDetailSchema = z.object({
  name: z.string().min(1).max(255),
  state: z.enum(LESSON_STATE),
});

export type LessonDetailSchema = z.infer<typeof LessonDetailSchema>;
