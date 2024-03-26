export type AuthPayload = {
  userId: string;
  username: string;
};

export type AuthStatus = {
  payload: AuthPayload;
};
