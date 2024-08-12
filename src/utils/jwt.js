import jwt from "jsonwebtoken";

export const JWT_SECRET = "cl4v3Sup3rS3cr3t4";

export function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "5m",
    });
    return token;
};

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return false;
    }
};