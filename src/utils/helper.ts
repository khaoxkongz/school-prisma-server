const getAuthHeader = (authHeader: string): string => {
  return authHeader.replace("Bearer ", "").trim();
};

export { getAuthHeader };
