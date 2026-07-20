import jwt from "jsonwebtoken";

export default function generateTokens(id) {
    const accessToken= jwt.sign(
        { id },
        process.env.ACCESS_SECRET,
        { expiresIn: "30min" }
    );

    const refreshToken = jwt.sign(
        { id },
        process.env.REFRESH_SECRET,
        { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
}