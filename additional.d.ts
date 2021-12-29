interface Comment {
  id?: string
  contributor: string
  rating: number
  review: string
  title: string
}

type CheckBox = {
  checked?: boolean
  handlechange: (event: any) => any
  color?: 'default' | 'primary' | 'secondary'
  label: string
  id: string
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

interface Products {
  list: Product[]
  searchList: Product[]
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
  favoriteLists: Favorite[]
  isSigndin: boolean
  username: string
  id: string
  signinTime: string
  avatar?: string
}

interface InitialState {
  products: Products
  users: User
}
