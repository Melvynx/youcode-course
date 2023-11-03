import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const LessonSkeleton = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="m-auto flex max-w-3xl flex-col gap-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/2" />
      </CardContent>
    </Card>
  );
};
