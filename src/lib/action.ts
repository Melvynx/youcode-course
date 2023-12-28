import { getAuthSession } from "./auth";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export class ServerError extends Error {}

export const authenticatedAction = createSafeActionClient({
  handleReturnedServerError: (error) => {
    if (error instanceof ServerError) {
      return {
        serverError: error.message,
      };
    }

    return {
      serverError: "An unexpected error occurred",
    };
  },
  middleware: async () => {
    const session = await getAuthSession();

    const user = session?.user;
    const userId = user?.id;

    if (!userId) {
      throw new ServerError("You must be logged in to perform this action");
    }

    return {
      userId,
      user,
    };
  },
});
