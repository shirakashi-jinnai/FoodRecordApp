import { FastForward } from "@material-ui/icons";
import { AvatarGroup } from "@material-ui/lab";
import { push } from "connected-react-router"
import { useDispatch } from "react-redux";
import { auth, db, FirebaseTimestamp, firestore } from "../firebase"
import { addFavoriteItem, addFavoriteLists, deleteFavoriteItem, signinAction, updateProfileAction, usersLogout } from "./actions";
import { getUserFavorites } from "./selectors";

export const addFavoriteStock = (stockName) => {
    return async (dispatch, getState) => {
        if (stockName === '') {
            return alert('リスト名を入力してください')
        }
        const uid = getState().users.id;
        const favoriteRef = db.collection('users').doc(uid).collection('favorites').doc();
        const timestamp = FirebaseTimestamp.now()
        favoriteRef.set({
            id: favoriteRef.id,
            name: stockName,
            timestamp: timestamp,
            favoriteList: []
        })
    }
}

export const addProductsToFavorite = (product, listsId) => {
    return async (dispatch, getState) => {
        const uid = getState().users.id;
        listsId.forEach((listId) => {
            const favoriteRef = db.collection('users').doc(uid).collection('favorites').doc(listId);
            favoriteRef.update({
                favoriteList: firestore.FieldValue.arrayUnion(product)
            })
        })
        // dispatch(addProductsToFavoriteAction())
    }
}

export const deleteUser = () => {
    return async (dispath) => {
        console.log('click')
        const user = auth.currentUser;
        user.delete().then(()=>{
            dispath(usersLogout(),push('/signin'))
        }).then(()=>{
            alert('ユーザーを削除しました。')
        })
    }
}

export const deleteProductsToFavorite = (product, listId) => {
    return async (dispatch, getState) => {
        const uid = getState().users.id;
        const favoritelists = getState().users.favoriteLists;
        const favoriteRef = db.collection('users').doc(uid).collection('favorites').doc(listId);
        favoriteRef.update({
            favoriteList: firestore.FieldValue.arrayRemove(product)
        })
        const newFavoriteList = favoritelists[0].favoriteList.filter(item => item.id !== product.id)
        console.log(favoritelists[0])
        console.log(favoritelists)
        // console.log(newFavoriteList)
        dispatch(deleteFavoriteItem(newFavoriteList))
    }
}

export const fetchFavoriteList = (category) => {
    return async (dispatch, getState) => {
        const uid = getState().users.id;
        const favoriteRef = db.collection('users').doc(uid).collection('favorites');
        let query = favoriteRef.orderBy('timestamp', 'desc');
        query = category ? favoriteRef.where('name', '==', decodeURI(category)) : query;
        query.get().then(snapshots => {
            let list = []
            snapshots.forEach(snapshot => {
                const data = snapshot.data()
                list.push(data)//category毎のオブジェクトが入っている
            })
            dispatch(addFavoriteLists(list))
        })
    }
}


export const listenAuthState = () => {//現在ログインしているユーザーを取得
    return async (dispatch) => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                const uid = user.uid;
                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        dispatch(signinAction({
                            username: data.username,
                            uid: data.uid,
                            avatar: data.avatar
                        }))
                    })
                // dispatch(signinAction(user))

            } else {
                // No user is signed in.
                dispatch(push('/signup'))
                // dispatch(signinAction({
                //     username:'ゲストユーザー',
                //     uid
                // }))
            }
        });
    }

}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (!email) {
            alert('入力してください')
            return false
        } else {
            auth.sendPasswordResetEmail(email).then(() => {
                alert('送信しました')
                dispatch(push('/signin'))
            }).catch(e => {
                console.log(e)
            })
        }
    }
}

export const update_Profile = (name, avatar) => {
    return async (dispatch, getState) => {
        avatar = avatar ? avatar : ''
        const uid = getState().users.id;
        const updateData = { username: name, avatar: avatar }
        db.collection('users').doc(uid).set(updateData, { merge: true }).then(() => {
            dispatch(updateProfileAction(updateData))
            console.log('update success')
        })
    }
}


export const signup = (username, email, password, confirmpassword) => {
    return async (dispatch) => {

        if (username == "" || email == "" || password == "" || confirmpassword == "") {
            alert('必須項目が未入力です。')
            console.log(username, email, password, confirmpassword)
            return false
        } else if (password !== confirmpassword) {
            alert('パスワードをご確認ください')
            return false
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((createuser) => {
                const user = createuser.user;
                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now()
                    const userInitialData = {
                        uid: uid,
                        username: username,
                        role: 'customer',
                        email: email,
                        avatar: '',
                        created_at: timestamp
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/'));
                            // dispatch(signinAction(user))//listenAuthStateがあるのでいらない
                            console.log('signup', user.username);
                        })
                }
            }).catch(e => {
                console.log('エラーメッセージ', e)
            })
    }
}

export const signin = (email, password) => {
    if (email === "" || password === '') {
        alert('メールアドレスとパスワードを入力してください');
        return false;
    }

    return async (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                if (user) {
                    const uid = user.uid;
                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data();
                            dispatch(signinAction({
                                username: data.username,
                                uid: data.uid,
                                avatar: data.avatar
                            }));
                            dispatch(push('/'));
                        })
                } else {
                    alert('パスワードかメールアドレスが違います');
                }
            }).catch(e => {
                console.log('エラー発生', e);
                alert('メールアドレスもしくはパスワードが違います。')
            })
    }
}

export const signout = () => {
    return async (dispatch, getState) => {
        auth.signOut()
            .then(() => {
                dispatch(usersLogout())
                // console.log(avatar, signdin)
                dispatch(push('/signin'))
            })
    }
}