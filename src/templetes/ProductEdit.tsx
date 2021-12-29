import _ from 'lodash'
import { TextField } from '@material-ui/core'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ImageArea, SetPriceArea, SetStoresArea } from '../components/Products'
import { ButtonBox, SelectBox } from '../components/Uikit'
import { saveProduct } from '../reducks/products/operating'
import { db } from '../firebase'

const ProductEdit = () => {
  const dispatch = useDispatch()

  let id = window.location.pathname.split('/product/edit')[1]

  if (id !== '') {
    id = id.split('/')[1]
  }

  const [product, setProduct] = useReducer(
    (state: any, data: any) => _.merge({}, state, data),
    {
      name: '',
      images: [],
      description: '',
      category: '',
      prices: [],
      storeName: '',
      stores: [],
    },
  )

  const [name, setName] = useState(''),
    [images, setImages] = useState<Image[]>([]),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [prices, setPrices] = useState([]),
    [storeName, setStoreName] = useState(''),
    [stores, setStores] = useState([])

  const onValueChange = ({ target }) =>
    setProduct({ [target.name]: target.value })

  const inputName = useCallback(
    (e) => {
      setName(e.target.value)
    },
    [setName],
  )

  const inputDescription = useCallback(
    (e) => {
      setDescription(e.target.value)
    },
    [setDescription],
  )

  const inputCategory = useCallback(
    (e) => {
      setCategory(e.target.value)
      console.log(e.target.value)
    },
    [setCategory],
  )

  const inputStoreName = useCallback(
    (e) => {
      setStoreName(e.target.value)
    },
    [setStoreName],
  )

  const foodcategory = [
    { name: '飲み物', id: 'drink' },
    { name: '麺類', id: 'noodle' },
    { name: '揚げ物', id: 'frideFood' },
    { name: '鍋料理', id: 'casserole' },
    { name: 'その他', id: 'other' },
  ]

  useEffect(() => {
    if (id) {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data()
          setName(data?.name)
          setCategory(data?.category)
          setDescription(data?.description)
          setImages(data?.images)
          setPrices(data?.prices)
          setStores(data?.stores)
          setStoreName(data?.storeName)
          console.log(prices?.length)
        })
    }
  }, [])

  return (
    <section>
      <div className="section-container">
        <h2>登録ページ</h2>
        <ImageArea images={images} setImages={setImages} />

        <TextField
          value={name}
          name="name"
          onChange={inputName}
          label="商品名を入力" //
          margin="dense"
          type="text"
          fullWidth={true}
        />
        <TextField
          value={description}
          name="description"
          onChange={inputDescription}
          label="商品説明" //
          margin="dense"
          type="text"
          fullWidth={true}
          multiline={true}
          rows={3}
        />
        <SelectBox
          label={'カテゴリー'}
          name="category"
          value={category}
          onChange={inputCategory}
          required={true}
          options={foodcategory}
        />

        <SetPriceArea setPrices={setPrices} prices={prices} />
        <div className="module-space--large" />
        <h2>店情報を入力（任意）</h2>

        <TextField
          value={storeName}
          name="storeName"
          onChange={inputStoreName}
          label="店名" //
          margin="dense"
          type="text"
        />

        <SetStoresArea setStores={setStores} stores={stores} />
        <div className="module-space--small" />
        <div className="center">
          <ButtonBox
            label={'商品登録'}
            color={'secondary'}
            onClick={() =>
              dispatch(
                saveProduct(
                  category,
                  description,
                  images,
                  name,
                  prices,
                  stores,
                  storeName,
                  id,
                ),
              )
            }
          />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit
