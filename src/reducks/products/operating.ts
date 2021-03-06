import { push } from 'connected-react-router'
import { db, FirebaseTimestamp, firestore } from '../../firebase'
import {
  deleteProductAction,
  fetchProductAction,
  resetProduct,
  updateProduct,
} from './actions'

const productsrRef = db.collection('products')

export const addComment = (comment: Partial<Comment>) => {
  const { id, contributor, rating, title, review } = comment
  return async (dispatch) => {
    if (!title) {
      alert('タイトルを入力してください')
    }
    const commentRef = productsrRef.doc(id)
    commentRef.update({
      comments: firestore.FieldValue.arrayUnion({
        contributor: contributor,
        rating: rating,
        title: title,
        review: review,
      }),
    })
  }
}

export const editProduct = (id: string) => {
  return async (dispatch) => {
    productsrRef
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data()
        return data
      })
  }
}

export const deleteProduct = (id: string) => {
  return async (dispatch, getState) => {
    productsrRef
      .doc(id)
      .delete()
      .then(() => {
        const products = getState().products.list
        const newProducts = products.filter((product) => product.id !== id)
        dispatch(deleteProductAction(newProducts))
      })
  }
}

export const fetchProducts = (category?: any) => {
  return async (dispatch: any): Promise<void> => {
    let query = productsrRef.orderBy('updated_at', 'desc')
    query = category ? productsrRef.where('category', '==', category) : query
    query.get().then((snapshots) => {
      const productsList: any = []
      snapshots.forEach((snapshot) => {
        const data = snapshot.data()
        productsList.push(data)
      })
      dispatch(fetchProductAction(productsList))
    })
  }
}

export const saveProduct = (
  category,
  description,
  images,
  name,
  prices,
  stores,
  storeName,
  id,
) => {
  return async (dispatch) => {
    if (
      category === '' ||
      description === '' ||
      images === '' ||
      name === '' ||
      prices === ''
    ) {
      alert('未入力の欄があります')
      return false
    } else if (storeName === '') {
      storeName = 'no data'
    }

    const timestamp = FirebaseTimestamp.now()
    const data: any = {
      category: category,
      description: description,
      images: images,
      name: name,
      prices: prices,
      stores: stores,
      storeName: storeName,
      updated_at: timestamp,
    }

    if (!id) {
      const ref = productsrRef.doc()
      id = ref.id
      data.id = id
      data.updated_at = timestamp
    }

    productsrRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => dispatch(push('/')))
      .catch((e) => {
        console.log('エラー', e)
      })
  }
}

export const searchProduct = (keyword) => {
  //検索機能
  return async (dispatch, getState) => {
    const products = getState().products.searchList
    console.log(products)
    if (keyword === '') {
      dispatch(resetProduct(products))
    }
    const updateList = products.filter((product) => {
      return product.name.toLowerCase().search(keyword.toLowerCase()) !== -1
    })
    console.log(updateList)
    dispatch(updateProduct(updateList))
  }
}

export const shareProduct = () => {
  if (navigator.share) {
    navigator
      .share({
        title: '食べ物図鑑',
        text: 'おいしい食べ物をたくさん知ろう！',
        url: 'https://cook-site.web.app/',
      })
      .then(() => {
        console.log('success')
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
