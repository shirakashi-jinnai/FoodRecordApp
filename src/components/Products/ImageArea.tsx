import React, { useCallback, useState } from 'react'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import { Icon, IconButton } from '@material-ui/core'
import shortid from 'shortid'
import { storage } from '../../firebase'
import ImagePreview from './ImagePreview'

const ImageArea = (props: any) => {
  const deleteImage = useCallback(
    (id) => {
      const result = window.confirm('削除しますか')
      if (result) {
        const newImages = props.images.filter((image: any) => image.id !== id)
        props.setImages(newImages)
        storage.ref('images').child(id).delete()
      }
    },
    [props.images],
  )

  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files
      if (file === '') {
        return false
      }
      let blob = new Blob(file, { type: 'image/jpeg' }) //blob形式に変換

      //ファイル名を作成する
      const fileName = shortid.generate() //ランダムな文字列

      //ファイルをFB上にupload(put)
      const uploadTask = storage.ref('images').child(fileName).put(blob)
      // fileref.put(blob).then(() => console.log('soccess'))
      uploadTask.then(() => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((DownloadURL) => {
            const newImage = { id: fileName, path: DownloadURL }
            props.setImages((prevState: any) => [...prevState, newImage])
          })
          .catch((e) => {
            console.log('error message', e)
          })
      })
    },
    [props.setImages],
  )

  return (
    <div>
      <div>
        <div className="preview">
          {props.images.length > 0 &&
            props.images.map((image: any) => (
              <ImagePreview
                key={image.id}
                id={image.id}
                path={image.path}
                delete={deleteImage}
              />
            ))}
        </div>
        <IconButton onInput={uploadImage}>
          <label>
            <AddToPhotosIcon />
            <input type="file" className="display-none" />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
