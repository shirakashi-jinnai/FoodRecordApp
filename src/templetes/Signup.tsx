import { Button, TextField } from '@material-ui/core';
import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { signup } from '../users/operating';
import eximg from '../asetts/img/exsignup.png'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail])

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword])

    const inputConfirmpassword = useCallback((e) => {
        setConfirmpassword(e.target.value);
    }, [setConfirmpassword])

    const inputUsername = useCallback((e) => {
        setUsername(e.target.value);
    }, [setUsername])

    return (
        <div>
            <div className='section-container'>
                <TextField
                    value={username} onChange={inputUsername} label='アカウント名を入力'//
                    margin='dense' type='text' fullWidth={true}
                />
                <TextField
                    value={email} onChange={inputEmail} label='emailを入力'//
                    margin='dense' placeholder='example@ex.com' type='text' fullWidth={true}
                />
                {password.length <= 6 ? (
                    <TextField
                        value={password} onChange={inputPassword} label='パスワードを入力'//
                        margin='dense' type='password' fullWidth={true} error helperText='パスワードは6文字以上にしてください'
                    />
                ) : (
                    <TextField
                        value={password} onChange={inputPassword} label='パスワードを入力'//
                        margin='dense' type='password' fullWidth={true} 
                    />
                )}
                {password === confirmpassword ? (
                    <TextField
                        value={confirmpassword} onChange={inputConfirmpassword} label='確認用パスワードを入力'//
                        margin='dense' type='password' fullWidth={true}
                    />
                ) : (
                    <TextField
                        value={confirmpassword} onChange={inputConfirmpassword} label='確認用パスワードを入力'//
                        margin='dense' type='password' fullWidth={true} error variant='outlined' helperText="パスワードが一致しません"
                    />
                )}
                <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
            </div>
            <div className="center">
                <Button color="primary" variant="contained" onClick={() => dispatch(signup(username, email, password, confirmpassword))}>
                    アカウントを登録
                </Button>
            </div>
            <div className="module-space--medium" />
            <div className='infomation'>
                <p>架空のメールアドレスを使っていただいても使用可能です</p>
                <img src={eximg} alt="イメージ画像" />
            </div>
        </div>
    )
}

export default Signup

