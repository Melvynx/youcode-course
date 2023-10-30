import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { getRequiredAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Account settings</LayoutTitle>
      </LayoutHeader>

      <LayoutContent>
        <Card className="bg-background">
          <CardContent className="mt-6">
            <form
              action={async (formData) => {
                'use server';

                const userSession = await getRequiredAuthSession();

                const image = formData.get('image');
                const name = formData.get('name');

                const safeData = FormSchema.safeParse({
                  image,
                  name,
                });

                if (!safeData.success) {
                  const searchParams = new URLSearchParams();
                  searchParams.set(
                    'error',
                    'Invalid data. Image must be an URL and name must be between 3 and 40 characters.'
                  );
                  redirect(`/account/settings?${searchParams.toString()}`);
                }

                await prisma.user.update({
                  where: {
                    id: userSession.user.id,
                  },
                  data: safeData.data,
                });

                revalidatePath('/account');
                redirect('/account');
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image URL</Label>
                <Input defaultValue={session.user.image} name="image" id="image" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input defaultValue={session.user.name} name="name" id="name" />
              </div>
              {searchParams.error && (
                <Typography>Error: {searchParams.error as string}</Typography>
              )}
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
