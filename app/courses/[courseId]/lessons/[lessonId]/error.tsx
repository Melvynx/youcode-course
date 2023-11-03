'use client';

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LessonError() {
  const params = useParams();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>
          You need to be enrolled in this course to view this lesson.
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Link href={`/courses/${params?.courseId}`} className={buttonVariants()}>
          Join now
        </Link>
      </LayoutContent>
    </Layout>
  );
}
