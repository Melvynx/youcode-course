'use client';

import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from '../ui/button';

export const BackButton = (props: ButtonProps) => {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={(e) => {
        router.back();
        props?.onClick?.(e);
      }}
    />
  );
};
