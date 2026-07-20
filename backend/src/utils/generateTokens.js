import jwt from "jsonwebtoken";

export default function generateTokens(id) {
    return {
        accessToken: jwt.sign(
            { id },
            process.env.ACCESS_SECRET,
            { expiresIn: "30min" }
        ),

        refreshToken: jwt.sign(
            { id },
            process.env.REFRESH_SECRET,
            { expiresIn: "30d" }
        )
    };
}