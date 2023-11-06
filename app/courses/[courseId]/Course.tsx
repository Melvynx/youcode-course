import { SubmitButton } from '@/components/form/SubmitButton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { MarkdownProse } from '@/features/mdx/MarkdownProse';
import { getRequiredAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AlertTriangle } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CourseType } from './course.query';
import { LessonItem } from './lessons/LessonItem';

export type CourseProps = {
  course: CourseType;
  userId?: string;
};

export const Course = ({ course, userId }: CourseProps) => {
  const isLogin = Boolean(userId);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
        <Card className="flex-[2] hover:bg-accent">
          <CardHeader className="flex flex-row gap-3 space-y-0">
            <Avatar className="h-14 w-14 rounded">
              <AvatarFallback>{course.name[0]}</AvatarFallback>
              {course.image ? <AvatarImage src={course.image} /> : null}
            </Avatar>
            <div className="flex flex-col gap-3">
              <CardTitle>{course.name}</CardTitle>
              <div className="flex flex-row gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{course.name[0]}</AvatarFallback>
                  {course.creator.image ? (
                    <AvatarImage src={course.creator.image} />
                  ) : null}
                </Avatar>
                <Typography variant="large" className=" text-muted-foreground">
                  {course.creator.name}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MarkdownProse markdown={course.presentation} />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => (
              <LessonItem lesson={lesson} key={lesson.id} />
            ))}
            {course.lessons.length === 0 ? (
              <Alert>
                <AlertTriangle />
                <AlertTitle>
                  There are no lessons yet. Please come back later.
                </AlertTitle>
              </Alert>
            ) : null}
          </CardContent>
        </Card>
      </div>
      {course.isCanceled ? <p>You can't join this course.</p> : null}
      {!course.isCanceled && !course.isEnrolled && isLogin ? (
        <div>
          <form>
            <SubmitButton
              formAction={async () => {
                'use server';

                const session = await getRequiredAuthSession();

                const toLinkCourse = await prisma.course.findUnique({
                  where: {
                    id: course.id,
                    state: 'PUBLISHED',
                  },
                  select: {
                    id: true,
                    lessons: {
                      orderBy: {
                        rank: 'asc',
                      },
                      take: 1,
                      select: {
                        id: true,
                      },
                    },
                  },
                });

                if (!toLinkCourse) {
                  return;
                }

                await prisma.courseOnUser.create({
                  data: {
                    userId: session.user.id,
                    courseId: course.id,
                  },
                  select: {
                    id: true,
                  },
                });

                const lesson = toLinkCourse.lessons[0];

                revalidatePath(`/courses/${course.id}`);

                if (!lesson) {
                  return;
                }

                redirect(`/courses/${course.id}/lessons/${lesson.id}`);
              }}
            >
              Join
            </SubmitButton>
          </form>
        </div>
      ) : null}
    </div>
  );
};
