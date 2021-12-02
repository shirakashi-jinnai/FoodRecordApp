import React from 'react'

const ImagePreview = (props:any) => (
    <div className='preview-area'  >
        <img alt="プレビュー画像" src={props.path} onClick={() => props.delete(props.id)} />
    </div>
)

export default ImagePreview