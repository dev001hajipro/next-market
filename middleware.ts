import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
        return NextResponse.json({ message: "トークンがありません" })
    }
    try {
        const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
        await jwtVerify(token, secretKey)
        return NextResponse.next()
    } catch (error) {
        return NextResponse.json({ message: "トークンが正しくありません。" })
    }
}

export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"]
}