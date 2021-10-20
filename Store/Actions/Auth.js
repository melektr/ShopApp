import AsyncStorage from '@react-native-community/async-storage'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT = "LOGOUT"

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch( { type: AUTHENTICATE, userId: userId, token: token })
    }

    
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWoN8N9ar8NcVwmtEEJhQyWx3iuVXhkyM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something is going wrong ! '
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email already exists , Try again ! '
            } else if (errorId === 'WEAK_PASSWORD') {
                message = 'Password should be at least 6 characters'
            }
            console.log(errorId);
            throw new Error(message)
        }
        const resData = await response.json()
        console.log(resData);
        dispatch(authenticate(resData.idToken, resData.localId, parseInt((resData.expiresIn) * 1000)))
        const expirationDate = new Date(new Date().getTime() + parseInt((resData.expiresIn) * 1000))
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}


export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWoN8N9ar8NcVwmtEEJhQyWx3iuVXhkyM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something is going wrong ! '
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found , Try again ! '
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Password Invalid !'
            }
            console.log(errorId);
            throw new Error(message)
        }
        const resData = await response.json()
        console.log(resData);
        dispatch(authenticate(resData.idToken, resData.localId, parseInt((resData.expiresIn) * 1000)))
        const expirationDate = new Date(new Date().getTime() + parseInt((resData.expiresIn) * 1000))
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}


export const logout = () => {
    return dispatch => {
        clearLogoutTimer()
        AsyncStorage.removeItem('userData')
    }
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)

    }
}
const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime / 1000)
    }

}


const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        }))
}
