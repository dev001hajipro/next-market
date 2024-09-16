# 「Next.jsでつくるフルスタックアプリ」のNext Market をTypeScriptで実装

## 書籍との違い

- TypeScriptで実装
- 開発環境では.env.localファイルを作成

## TypeScriptで実装

### 一覧表示時の型

TypeScriptでは、/app/page.tsxの一覧表示で型情報がないと警告を受けるので、ひとまず型情報を
ファイルに埋め込んで対応。MongoDBは、schemaModels.tsでモデルを定義しているので、
ここで型定義して/app/page.tsxにimportするほうがよさそう。

```TypeScript
type ItemType = {
  _id: string
  title: string
  price: number
  description: string
  image: string
}
```

## 開発環境では.env.localファイルを作成

開発の早い段階で、データーベースのホストをソースコードに書かず、.env.localファイルを作成した。
Next.js14では、クライアントとサーバー側のソースコードがあり、環境変数は、NEXT_PUBLIC_XXXXのように
使い分けが必要。

```bash
NEXT_PUBLIC_JWT_SECRET=next-market-app-book
NEXT_PUBLIC_URL=http://localhost:3000
MONGODB_URI=<データベースのURL>
```

## メモ

- Mongo Atlas(MongoDBのクラウド版) はGoogleアカウントで使える。
- Vercelはダッシュボードから環境変数が設定できる。

## 参考資料

- Next.jsでつくるフルスタックアプリ　前編（バックエンド開発）: 自分ひとりだけで本格アプリを開発できるようになる本 Next.jsフルスタック
- Next.jsでつくるフルスタックアプリ　後編（フロントエンド開発）: 自分ひとりだけで本格アプリを開発できるようになる本 Next.jsフルスタック

## サーバー起動

```bash
npm run dev
```
