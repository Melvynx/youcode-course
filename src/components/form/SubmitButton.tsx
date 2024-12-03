'use client';

import { useFormStatus } from 'react-dom';
import type { ButtonProps } from '../ui/button';
import { Button } from '../ui/button';

export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={pending} />;
};
