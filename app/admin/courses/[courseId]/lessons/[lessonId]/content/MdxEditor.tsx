'use client';

import { Badge, BadgeProps } from '@/components/ui/badge';
import { useDebounceFn } from '@/hooks/useDebounceFn';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { lessonActionEditContent } from '../lesson.action';
import InitializedMDXEditor from './InitializedMDXEditor';

export type MdxEditorProps = {
  markdown: string;
  lessonId: string;
};

type SyncState = 'sync' | 'not-sync' | 'syncing';

const getBadgeVariant = (syncState: SyncState): BadgeProps['variant'] => {
  if (syncState === 'not-sync') {
    return 'destructive';
  }

  if (syncState === 'syncing') {
    return 'default';
  }

  return 'secondary';
};

export const MdxEditor = ({ lessonId, markdown }: MdxEditorProps) => {
  const [syncState, setSyncState] = useState<SyncState>('sync');

  const onChange = useDebounceFn(async (value: string) => {
    setSyncState('syncing');

    const { data, serverError } = await lessonActionEditContent({
      lessonId,
      markdown: value,
    });

    if (serverError) {
      toast.error(serverError);
      setSyncState('not-sync');
      return;
    }

    setSyncState('sync');
  });

  useEffect(() => {
    if (syncState === 'sync') return;

    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        'Are you sure you want to leave? All unsaved changes will be lost.';
    };

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [syncState]);

  return (
    <div className="relative">
      <div className="absolute bottom-2 right-2">
        <Badge variant={getBadgeVariant(syncState)}>{syncState}</Badge>
      </div>
      <InitializedMDXEditor
        onChange={(v) => {
          setSyncState('not-sync');
          onChange(v);
        }}
        markdown={markdown}
      />
    </div>
  );
};
