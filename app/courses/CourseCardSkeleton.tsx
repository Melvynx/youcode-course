import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Skeleton } from '@/components/ui/skeleton';

export const CourseCardSkeleton = () => {
  return (
    <Card className="hover:bg-accent">
      <CardHeader className="flex flex-row gap-3 space-y-0">
        <Avatar className="h-14 w-14 rounded">
          <AvatarFallback>
            <Loader />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-32" />
          <div className="flex flex-row gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <Loader />
              </AvatarFallback>
            </Avatar>
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
