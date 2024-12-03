Always use the `PageParams` in page.tsx and `LayoutParams` in layout.tsx.

```ts
import type { PageParams } from "@/types/next";

export default async function Page(props: PageParams<{ courseId: string }>) {
  // If needed...
  const params = await props.params;

  // If needed...
  const searchParams = await props.searchParams;

  // ... Rest of the code ...
}
```
