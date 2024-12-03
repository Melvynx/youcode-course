import { baseAuth } from "./next-auth";

export const getAuthSession = async () => {
  const session = await baseAuth();
  return session;
};

export const getRequiredAuthSession = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  return session as {
    user: {
      email: string;
      image?: string;
      name?: string;
      id: string;
    };
  };
};
