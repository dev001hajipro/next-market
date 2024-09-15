// アクセス制御
// 未ログインユーザー, ログインユーザー
// ログイン画面     oo
// ユーザー登録画面  oo
// アイテム一覧     oo
// アイテム登録     xo
// アイテム詳細     oo
// アイテム更新     xo
// アイテム削除     xo

import { jwtVerify } from "jose"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("")

    const router = useRouter()

    // ページが表示される前に処理をする。
    useEffect(() => { // asyncを定義できないので内部でasyncを行う。
        const checkToken = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                router.push("/user/login") // ログイン画面へ
            }
        
            try {
                // トークンが問題なければ、トークンからメールアドレスを取り出し保持する。
                // メールアドレスでアイテム編集、削除、作成の有無をアクセス制御する。
                // todo: 環境変数のclient-sideとserver-sideを理解しなければならない。
                console.log(`useAuth.js:🔥🤬🔥🔥:${process.env.NEXT_PUBLIC_JWT_SECRET}`)
                const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
                const decoedJwt = await jwtVerify(token, secretKey)
                setLoginUserEmail(decoedJwt.payload.email)
                console.log('payload.email:', decoedJwt.payload.email)
            } catch (error) {
                router.push("/user/login") // ログイン画面へ
            }
        }
        checkToken()
    }, [router])

    return loginUserEmail
}

export default useAuth

