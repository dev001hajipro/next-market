import Link from "next/link"
import Image from "next/image"

// todo: this type for production build errror. Itshould be related to schemaModels.
type ItemType = {
  _id: string
  title: string
  price: number
  description: string
  image: string
}

const getAllItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"})
  const jsonData = await response.json()
  const allItems = jsonData.allItems
  return allItems
}
const ReadAllItems = async () => {
  const allItems = await getAllItems()
  return (
    <div className="grid-container-in">
      {allItems.map((item : ItemType) =>
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} alt={item.title} width={750} height={500} priority/>
          <div>
            <h2>\{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default ReadAllItems