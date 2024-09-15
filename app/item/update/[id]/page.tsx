// 編集ページは
// 1.1つだけのアイテムデータを読み取る
// 2.編集してデータを送る（更新）

"use client"
import useAuth from "@/app/utils/useAuth";
import { useEffect, useState } from "react"

const UpdateItem = ({ params }: { params: { id: string; }; }) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const loginUserEmail  = useAuth()

    // このページはクライアントコンポーネントなのでuseEffect()でページ開始にデータ取得
    useEffect(() => {
        // todo: /item/readsingle/page.tsxがサーバーコンポーネントなので
        // ひとまずコピペして、使う。
        const getSingleItem = async (id: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"})
            const jsonData = await response.json()
            const singleItem = jsonData.singleItem
            
            // set data to UI.
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
        }

        getSingleItem(params.id)
    }, [params])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail
                }),
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("アイテム編集失敗")
        }
    }

    // 現在のユーザーメールアドレスとデータを登録したユーザーのメールアドレスが同じなら編集できる。
    if (loginUserEmail === email) {
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
    
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="name" id="name" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" id="price" placeholder="価格" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" id="image" placeholder="画像URL" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" rows={15} placeholder="説明" required></textarea>
                    <button>編集</button>
                </form>
            </div>
        )
    } else {
        return <h2>権限がありません</h2>
    }
}

export default UpdateItem
