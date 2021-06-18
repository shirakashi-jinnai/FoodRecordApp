import { TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ButtonBox } from '../components/Uikit';
import { resetPassword } from '../users/operating';

const Reset = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const inputEmail = useCallback(e => {
        setEmail(e.target.value);
    }, [email])

    return (
        <div className='section-container'>
            <h1>パスワードの再設定</h1>
            <TextField
                value={email} onChange={inputEmail} label='email'//
                margin='dense' type='email' fullWidth={true}
            />
            <ButtonBox color={'primary'} onClick={() => dispatch(resetPassword(email))} label={'送信'} />
        </div>
    )
}

export default Reset