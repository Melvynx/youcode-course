import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

/**
 * ActionError message will be returned to the client.
 * You can use it to display a message to the user.
 *
 *
 * @param message Error message.
 */
export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

// This function will be called when our actions throw error.
const handleServerError = (error: unknown): string => {
  if (error instanceof ActionError) {
    return error.message;
  }

  return "Something went wrong!";
};

export const action = createSafeActionClient({
  handleServerError: handleServerError,
});

export const authenticatedAction = action.use(async ({ next }) => {
  const session = await getAuthSession();

  const userId = session?.user?.id;

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
