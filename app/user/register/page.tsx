"use client"

import { useState } from "react"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("ユーザー登録失敗")
        }
    }
    return (
        <div>
            <h1 className="page-title">ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder="名前" required/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="メールアドレス" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="パスワード" required/>
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register