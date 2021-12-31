import React from 'react'

type ImagePreview = {
  id: string
  path: string
  delete: (id: any) => void
}

const ImagePreview = (props: ImagePreview) => (
  <div className="preview-area">
    <img
      alt="プレビュー画像"
      src={props.path}
      onClick={() => props.delete(props.id)}
    />
  </div>
)

export default ImagePreview
