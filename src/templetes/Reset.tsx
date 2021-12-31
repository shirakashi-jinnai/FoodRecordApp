import { TextField } from '@material-ui/core'
import { push } from 'connected-react-router'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonBox } from '../components/Uikit'
import { resetPassword } from '../reducks/users/operating'

const Reset = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email],
  )

  return (
    <div className="section-container">
      <h1>パスワードの再設定</h1>
      <TextField
        value={email}
        onChange={inputEmail}
        label="email" //
        margin="dense"
        type="email"
        fullWidth={true}
      />
      <div className="center">
        <ButtonBox
          color={'primary'}
          onClick={() => dispatch(resetPassword(email))}
          label={'送信'}
        />
      </div>
      <p onClick={() => dispatch(push('/signin'))}>
        アカウントをお持ちの方はこちら
      </p>
      <p onClick={() => dispatch(push('/signup'))}>サインアップの方はこちら</p>
    </div>
  )
}

export default Reset
