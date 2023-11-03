import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Skeleton } from '@/components/ui/skeleton';
import { LessonItemPlaceholder } from './lessons/LessonItemPlaceholder';

export const CoursePlaceholder = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
        <Card className="flex-[2] hover:bg-accent">
          <CardHeader className="flex flex-row gap-3 space-y-0">
            <Avatar className="h-14 w-14 rounded">
              <AvatarFallback>
                <Loader size={24} />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-56" />
              <div className="flex flex-row gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Loader size={16} />
                  </AvatarFallback>
                </Avatar>
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/2" />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <LessonItemPlaceholder key={i} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
