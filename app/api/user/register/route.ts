import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    console.log(reqBody)
    try {
        await connectDB()
        await UserModel.create(reqBody)
        return NextResponse.json({message: "ユーザー登録　成功"})
    } catch (error) {
        return NextResponse.json({message: "ユーザー登録　失敗"})
    }
    
}