# Next Safe Action v7 - Usage Guide

## Action Return Type Changes

In next-safe-action v7, the return value of an action is optional. Here's how to properly handle action results:

### Old Usage (v6)

```ts
const { data, serverError } = await anyAction({
  // some params
});

if (serverError) {
  // Show error
  return;
}

// Handle the data
```

### New Usage (v7)

First, create a utility function to type-check action results:

```ts:lib/actions/actions.utils.ts
import { ActionReturn } from "next-safe-action";

export const isActionSuccessful = <TOutput>(
  result: ActionReturn<TOutput, { serverError: string }>
): result is { data: TOutput } => {
  if (!result) return false;
  return !("serverError" in result);
};
```

Then use it in your components:

```ts
import { isActionSuccessful } from "@/lib/safe-actions.utils";

const result = await someAction({
  // params
});

if (!isActionSuccessful(result)) {
  toast.error(result?.serverError ?? "Something went wrong");
  return;
}

// Now TypeScript knows result.data is safe to use
router.refresh();
form.reset(result.data);
```

## Benefits

1. Type Safety: The `isActionSuccessful` utility provides proper TypeScript type narrowing
2. Error Handling: Cleaner error handling with optional chaining
3. Runtime Safety: Ensures the action result exists before accessing data

## Common Patterns

### With React Hook Form

```ts
const form = useForm<FormSchema>();

const onSubmit = async (data: FormSchema) => {
  const result = await someAction(data);

  if (!isActionSuccessful(result)) {
    toast.error(result?.serverError ?? "Something went wrong");
    return;
  }

  form.reset(result.data);
  router.refresh();
};
```

### With Loading State

```ts
const [isPending, startTransition] = useTransition();

const handleAction = () => {
  startTransition(async () => {
    const result = await someAction(data);

    if (!isActionSuccessful(result)) {
      toast.error(result?.serverError ?? "Something went wrong");
      return;
    }

    toast.success("Action completed successfully");
  });
};
```
