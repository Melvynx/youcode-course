/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { BookCheck, Presentation, User2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { NewUsersStats } from './NewUsersStats';
import { QuickStats } from './QuickStats';

export default async function CoursesPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link href={'/admin/courses'} className={buttonVariants()}>
          Courses
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4">
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>Quick stats</CardTitle>
              </CardHeader>
              <CardContent>
                <Typography className="flex items-center gap-2">
                  <User2 className="inline" size={16} />{' '}
                  <Skeleton className="inline-block h-4 w-10" />
                </Typography>
                <Typography className="flex items-center gap-2">
                  <BookCheck className="inline" size={16} />{' '}
                  <Skeleton className="inline-block h-4 w-10" />
                </Typography>
                <Typography className="flex items-center gap-2">
                  <Presentation className="inline" size={16} />{' '}
                  <Skeleton className="inline-block h-4 w-10" />
                </Typography>
              </CardContent>
            </Card>
          }
        >
          <QuickStats />
        </Suspense>
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>Users course activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-60 w-full" />
              </CardContent>
            </Card>
          }
        >
          <NewUsersStats />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
