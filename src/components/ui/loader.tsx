import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ className, ...props }: LucideProps) => {
  return <Loader2 className={cn('animate-spin', className)} {...props} />;
};
