import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { CoursesCard } from './course.query';

type CourseCardProps = {
  course: CoursesCard;
};

export const CourseCard = (props: CourseCardProps) => {
  return (
    <Link href={`/courses/${props.course.id}`}>
      <Card className="hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar className="h-14 w-14 rounded">
            <AvatarFallback>
              {props.course.name.charAt(0) +
                props.course.name.charAt(props.course.name.length - 1)}
            </AvatarFallback>
            {props.course.image ? <AvatarImage src={props.course.image} /> : null}
          </Avatar>
          <div className="flex flex-col gap-3">
            <CardTitle>{props.course.name}</CardTitle>
            <div className="flex flex-row gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{props.course.name[0]}</AvatarFallback>
                {props.course.creator.image ? (
                  <AvatarImage src={props.course.creator.image} />
                ) : null}
              </Avatar>
              <Typography variant="large" className=" text-muted-foreground">
                {props.course.creator.name}
              </Typography>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};
