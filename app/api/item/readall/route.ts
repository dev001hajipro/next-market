import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB()
        const allItems = await ItemModel.find()
        return NextResponse.json({ message: "アイテム読み取り 成功（オール）", allItems:allItems })
    } catch (error) {
        return NextResponse.json({ message: "アイテム読み取り 失敗（オール）" })
    }
}

export const revalidate = 0