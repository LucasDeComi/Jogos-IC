import { randomBytes } from "node:crypto";

export default function generateQRToken() {
    return randomBytes(16).toString("hex").toUpperCase();
}