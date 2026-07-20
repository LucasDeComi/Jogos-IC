export default function userSafe(user){
    const{ password, refreshToken, ...userSafe } = user;

    return userSafe;
}