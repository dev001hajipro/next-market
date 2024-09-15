import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string; }; }) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(params.id)
        if (singleItem.email === reqBody.email) {
            await ItemModel.deleteOne({_id: params.id})
            return NextResponse.json({ message: "アイテム削除成功" })
        } else {
            return NextResponse.json({ message: "アイテム削除失敗：不正なリクエスト" })
        }
    } catch (error) {
        return NextResponse.json({ message: "アイテム削除失敗" })
    }
}
