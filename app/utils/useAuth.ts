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
            if (token) {
                try {
                    // トークンが問題なければ、トークンからメールアドレスを取り出し保持する。
                    // メールアドレスでアイテム編集、削除、作成の有無をアクセス制御する。
                    // todo: 環境変数のclient-sideとserver-sideを理解しなければならない。
                    console.log(`useAuth.js:🔥🤬🔥🔥:${process.env.NEXT_PUBLIC_JWT_SECRET}`)
                    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
                    const decoedJwt = await jwtVerify(token, secretKey)
                    setLoginUserEmail(decoedJwt.payload.email as string)
                    console.log('payload.email:', decoedJwt.payload.email)
                } catch (error) {
                    router.push("/user/login") // ログイン画面へ
                }
            } else {
                console.log('you donot have token.')
                router.push("/user/login") // ログイン画面へ
            }
        }
        checkToken()
    }, [router])

    return loginUserEmail
}

export default useAuth
