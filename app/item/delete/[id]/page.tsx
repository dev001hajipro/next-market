// 削除ページは
// 1.1つだけのアイテムデータを読み取る
// 2.削除する。

"use client"
import useAuth from "@/app/utils/useAuth"
import Image from "next/image"
import { useEffect, useState } from "react"


const DeleteItem = ({ params }: { params: { id: string; }; }) => {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    email: loginUserEmail
                }),
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("アイテム削除失敗")
        }
    }

    if (loginUserEmail === email) {
        return (
            <div>
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <Image src={image} alt="item-image" width={750} height={500} priority/>
                    <h3>\{price}</h3>
                    <p>{description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    } else {
        return <h2>権限がありません</h2>
    }
}

export default DeleteItem
