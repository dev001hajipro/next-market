import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
