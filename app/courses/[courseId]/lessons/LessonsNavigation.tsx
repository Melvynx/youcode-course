import { getAuthSession } from '@/lib/auth';
import { getCourse } from '../course.query';
import LessonNavigationCard from './LessonNavigationCard';

export type LessonsNavigationProps = {
  courseId: string;
};

export const LessonsNavigation = async (props: LessonsNavigationProps) => {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: props.courseId,
    userId: session?.user.id,
  });

  if (!course) {
    return null;
  }

  return <LessonNavigationCard course={course} />;
};
