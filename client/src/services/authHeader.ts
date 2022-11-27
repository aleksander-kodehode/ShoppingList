export const authHeader = () => {
  const storedToken = localStorage.getItem("accessToken");
  let token: string | null = null;
  if (storedToken) token = JSON.parse(storedToken);

  if (token) {
    return token;
  } else {
    return null;
  }
};
