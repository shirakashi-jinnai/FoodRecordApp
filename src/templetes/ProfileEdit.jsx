import { Avatar, IconButton, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ButtonBox } from '../components/Uikit';
import { db, storage } from '../firebase';
import { getUserAvatar, getUserId, getUserName } from '../users/selectors';
import image from '../asetts/img/building.png'
import shortid from 'shortid';
import { deleteUser, update_Profile } from '../users/operating';

const useStyles = makeStyles({
    avatar: {
        margin: '0 auto',
    },
    icon: {
        maxWidth: 200,
        maxHeight: 200,
        width: '100%',
        height: '100%',
    }

})

const ProfileEdit = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const useravatar = getUserAvatar(selector)
    const username = getUserName(selector);
    const [name, setName] = useState(username),
        [avatar, setAavatar] = useState(useravatar),
        [open, setOpen] = useState(false);
    console.log(avatar)

    const handleClick = useCallback(() => {
        const result = window.confirm('アカウントを削除しますか？');
        console.log(result)
        result && dispatch(deleteUser())
    }, []);

    const inputName = useCallback((e) => {
        setName(e.target.value)
    }, [setName])


    const uploadAvatar = useCallback(e => {
        const file = e.target.files;
        if (file === "") { return false }
        let blob = new Blob(file, { type: 'image/jpeg' })//blob形式に変換

        //ファイル名を作成する
        const fileName = shortid.generate()//ランダムな文字列

        //ファイルをFB上にupload(put)
        const uploadTask = storage.ref('images').child(fileName).put(blob)
        // fileref.put(blob).then(() => console.log('soccess'))
        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((DownloadURL) => {
                const newImage = { id: fileName, path: DownloadURL }
                setAavatar(newImage.path)
            }).catch(e => { console.log('error message', e) })
        })
    }, [setAavatar])


    return (
        <div className='section-wrapin'>
            <h1>アカウント情報</h1>
            <div className='update-area'>
                <h1>アイコン</h1>
                <IconButton className={classes.avatar} onInput={uploadAvatar} >
                    <label>
                        <Avatar className={classes.icon} alt='userAvatar' src={avatar} />
                        <input type="file" className='display-none' />
                    </label>
                </IconButton>
                <div className='module-space--medium' />
                <h1>ユーザー名</h1>
                <TextField value={name} onChange={inputName} />
                <div className='module-space--small' />
                <ButtonBox label={'更新'} color={'primary'} onClick={() => dispatch(update_Profile(name, avatar))} />
                <div className='module-space--large' />
                <ButtonBox label={'アカウントを削除'} color={'secondary'} onClick={handleClick} />
            </div>
        </div >
    )
}

export default ProfileEdit