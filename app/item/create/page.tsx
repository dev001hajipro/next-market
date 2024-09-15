"use client"
import { useState } from "react"
import useAuth from "@/app/utils/useAuth"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const loginUserEmail  = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("アイテム作成失敗")
        }
    }

    if (loginUserEmail) {
        return (
            <div>
                <h1 className="page-title">アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" id="price" placeholder="価格" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" id="image" placeholder="画像URL" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    } else {
        console.log('ログイン情報がありません。')
    }
}

export default CreateItem