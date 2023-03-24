//提供用户认真相关函数，发送请求存储token
import { User } from "types/User"

const LocalStorageKey = '__auth_provider_token__'

const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(LocalStorageKey)

export const handleUserResponse = ({user}:{ user: User }) => {
    window.localStorage.setItem(LocalStorageKey, user.token || "")
    return user
}

export const login = (data:{username:string,password:string}) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(async response => {
        if(response.ok){
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(await response.json())
        }
    })
}

export const register = (data:{username:string,password:string}) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(async response => {
        if(response.ok){
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(await response.json())
        }
    })
}

export const logout = async () => window.localStorage.removeItem(LocalStorageKey)