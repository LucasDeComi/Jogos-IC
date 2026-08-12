import jwt from "jsonwebtoken";

export default function generateTokens(id, additionalData = {}) {
    const accessToken= jwt.sign(
        { id, ...additionalData },
        process.env.ACCESS_SECRET,
        { expiresIn: "30min" }
    );

    const refreshToken = jwt.sign(
        { id, ...additionalData },
        process.env.REFRESH_SECRET,
        { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
}