import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import React from 'react';
import { LoginButton } from '../auth/LoginButton';

export const UnknownError = () => {
  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>You need to be logged in to view this page</CardTitle>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  );
};
