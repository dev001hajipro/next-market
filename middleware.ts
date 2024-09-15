import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("middleware🀄")
    console.log(request.headers.get("Authorization"))
                                          
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    console.log("token", token)
    if (!token) {
        //return NextResponse.redirect(new URL("/login", request.url))
        return NextResponse.json({ message: "トークンがありません" })
    }
    try {
        console.log(`🔥🤬:${process.env.JWT_SECRET}`)
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
        const decodedJwt = await jwtVerify(token, secretKey)
        console.log("decodedJwt", decodedJwt)

        return NextResponse.next()
    } catch (error) {
        return NextResponse.json({ message: "トークンが正しくありません。" })
    }
}

export const config = {
    matcher: [
        "/api/item/create",
        "/api/item/update/:path*",
        "/api/item/delete/:path*"
    ]
}