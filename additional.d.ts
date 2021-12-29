interface Comment {
  contributor: string
  rating: number
  review: string
  title: string
}

interface Image {
  id: string
  path: string
}

interface Price {
  price: string
  size: string
}

interface Category {
  id: string
  name: string
  order: string
}

type Product = {
  category: string
  comments: Comment[]
  description: string
  id: string
  images: Image[]
  name: string
  prices: Price[]
  storeName: string
  stores: any[]
  updated_at: Date
}

interface Store {
  endTime: string
  startTime: string
  place: string
}

interface Favorite {
  favoriteList: Product[]
  id: string
  name: string
  timestame: Date
}

interface ProductType {
  category: string
  comments: Comment[]
  description: string
  id: string
  images: Image[]
  name: string
  prices: Price[]
  storeName: string
  stores: Store[]
  updated_at: Date
}

interface User {
  avater?: string
  created_at: Date
  email: string
  role: string
  uid: string
  username: string
}
