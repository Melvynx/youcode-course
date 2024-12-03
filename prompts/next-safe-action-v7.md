You are an expert coding assistant that is required to rewrite the "action" file with the new next-safe-action.

next-safe-action just upgrade from v6 to v7 and here is the changes :

## NEXT-SAFE-ACTION V6 :

```ts
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";

// Base client
export const baseActionClient = createSafeActionClient();

// Auth client
export const authenticatedAction = createSafeActionClient({
  async middleware(parsedInput) {
    const session = cookies().get("session")?.value;

    if (!session) {
      throw new Error("Session not found!");
    }

    const userId = await getUserIdFromSessionId(session);

    if (!userId) {
      throw new Error("Session is not valid!");
    }

    return { userId };
  },
});
```

### Usage v6

```ts
"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const editProfile = authenticatedAction(
  z.object({ username: z.string() }),
  async ({ username }, { ctx: { userId } }) => {
    await saveNewUsernameInDb(userId, username);

    return {
      updated: true,
    };
  }
);
```

## NEXT-SAFE-ACTION V7 :

```ts
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";

// Base client
export const actionClient = createSafeActionClient();

// Auth client
export const authenticatedAction = actionClient.use(async ({ next, ctx }) => {
  const session = cookies().get("session")?.value;

  if (!session) {
    throw new Error("Session not found!");
  }

  const userId = await getUserIdFromSessionId(session);

  if (!userId) {
    throw new Error("Session is not valid!");
  }

  return next({ ctx: { userId } });
});
```

### Usage v7

```ts
"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const editProfile = authenticatedAction
  .schema(z.object({ username: z.string() }))
  .action(async ({ parsedInput: { username }, ctx: { userId } }) => {
    await saveNewusernameInDb(userId, username);

    return {
      updated: true,
    };
  });
```

### Usage v7

In v7 there is only 2 parameters :

1. parsedInput : the input of the action
2. ctx : the context of the action

The context contain everything you need to use in the action.

```ts
export const reorderLessonAction = editorAction
  .schema(
    z.object({
      upsideRank: z.string().optional(),
      downsideRank: z.string().optional(),
      lessonId: z.string(),
      newSectionId: z.string().optional().nullable(),
    })
  )
  .action(
    async ({
      parsedInput: { upsideRank, downsideRank, lessonId, newSectionId },
      ctx: { userId },
    }) => {

export const createLessonAction = editorAction
  .schema(CreateLessonSchema) // We can use the schema from the zod schema
  .action(async ({parsedInput: params, ctx: context}) => {
    const { userId, user } = context;
```

MY ACTION FILE :

I just update my action file to follow the new next-safe-action v7 version :

<server-action-code>
```ts
import { getAuthSession } from "@/lib/next-auth";
import { createSafeActionClient } from "next-safe-action";

/\*\*

- ActionError message will be returned to the client.
- You can use it to display a message to the user.
-
-
- @param message Error message.
  \*/
  export class ActionError extends Error {
  constructor(message: string) {
  super(message);
  this.name = "ActionError";
  }
  }

// This function will be called when our actions throw error.
const handleServerError = (error: unknown): { serverError: string } => {
if (error instanceof ActionError) {
return {
serverError: error.message,
};
}

return {
// The default error, in case we don't know what happened.
serverError: "Something went wrong!",
};
};

export const action = createSafeActionClient({
handleServerError: handleServerError,
});

export const authenticatedAction = action.use(async ({ next }) => {
const session = await getAuthSession();

const userId = session?.user.id;

if (!userId) {
throw new ActionError("You're not logged in. Please log in to continue.");
}

return next({
ctx: {
userId: userId,
...session.user,
},
});
});

```
</server-action-code>

## Response format

You need to return the VALID TypeScript file ready to be used in the app. Your output will be used to update the file, do not add any comment or explanation. Return a valid runable TypeScript file.

```
