import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Loader } from "lucide-react";

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
