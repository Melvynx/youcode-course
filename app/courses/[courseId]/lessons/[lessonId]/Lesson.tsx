import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MdxProse } from './MdxProse';
import { LessonType } from './lesson.query';

export const Lesson = ({ lesson }: { lesson: LessonType }) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <MdxProse markdown={lesson.content} />
      </CardContent>
    </Card>
  );
};
