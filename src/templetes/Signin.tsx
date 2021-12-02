import { Button, TextField } from '@material-ui/core';
import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signin, signout } from '../users/operating';

const Signin = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail])

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword])

    useEffect(() => {
        dispatch(signout())
    }, [])

    return (
        <div className='section-container'>
            <TextField
                value={email} onChange={inputEmail} label='emailを入力'//
                margin='dense' placeholder='example@ex.com' type='text' fullWidth={true}
            />
            <TextField
                value={password} onChange={inputPassword} label='パスワードを入力'//
                margin='dense' type='password' fullWidth={true}
            />
            <div className='center'>
                <Button color="primary" variant="contained" onClick={() => dispatch(signin(email, password))} >
                    ログイン
                </Button>
            </div>
            <p onClick={() => dispatch(push('/reset'))} >パスワードを忘れた方はこちら</p>
            <p onClick={() => dispatch(push('/signup'))} >サインアップの方はこちら</p>
        </div>
    )
}

export default Signin