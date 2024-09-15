import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";


export async function POST(request: NextRequest) {
    // todo: SyntaxError: Unexpected end of JSON input. when post without json data.
    const reqBody = await request.json()
    console.log(reqBody)
    try {
        await connectDB()
        // todo : check only email now.
        // await UserModel.findOne({email: reqBody.email, password: reqBody.password})
        const savedUserData = await UserModel.findOne({email: reqBody.email})
        if (savedUserData) {
            if (savedUserData.password === reqBody.password) {

                // リクエストにトークンを常につけて、それが正しいかサーバ側が判断してログイン状態を維持する。
                // JSON Web Token(JWT)のライブラリjoseを使う。
                // トークンの有効性検証はverifyJWTを使う。
                // SignJWTを使ってトークンを発行する
                const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
                const payload = {email: reqBody.email}
                const token = await new SignJWT(payload)
                .setProtectedHeader({alg: "HS256", typ: "JWT"})
                .setExpirationTime("1d")
                .sign(secretKey)

                return NextResponse.json({
                    message: "ログイン　成功",
                    token: token
                })
            } else {
                return NextResponse.json({message: "ログイン　失敗：パスワードが違います。"})
            }
        } else {
            return NextResponse.json({message: "ログイン　失敗：ユーザー登録してください。"})
        }

    } catch (error) {
        return NextResponse.json({message: "ログイン　失敗"})
    }
    
}