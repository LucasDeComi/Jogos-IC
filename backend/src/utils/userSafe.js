export default function userSafe(data) {
  if (Array.isArray(data)) {
    return data.map(({ password, refreshToken, ...user }) => user);
  }

  const { password, refreshToken, ...user } = data;
  return user;
}