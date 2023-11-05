import { useMediaQuery } from '@/hooks/useMediaQuery';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LessonNavigationState = 'open' | 'close' | 'sticky';

type LessonNavigationStore = {
  state: LessonNavigationState;
  setState: (state: LessonNavigationState) => void;
};

export const useLessonNavigationStore = create(
  persist<LessonNavigationStore>(
    (set, get) => ({
      state: 'sticky',
      setState: (state) => {
        set({ state });
      },
    }),
    {
      name: 'lesson-navigation-storage', // name of the item in the storage (must be unique)
    }
  )
);

export const useLessonNavigationState = (): LessonNavigationState => {
  const state = useLessonNavigationStore((state) => state.state);
  const isLg = useMediaQuery('(min-width: 1024px)');

  if (isLg) {
    return state;
  }

  if (state === 'sticky') {
    return 'close';
  }

  return state;
};
