import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = ( object: {[key: string]: unknown }) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(isVoid(value)){
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()  // eslint-disable-next-line 
    },[])
}

export const useDebounce = <T,>(param: T, delay?: number) => {
    const [debouncedParam, setDebouncedParam] = useState(param)

    useEffect(() => { 
        const timer = setTimeout(() => setDebouncedParam(param), delay)
        return () => clearTimeout(timer)
    },[param, delay])

    return debouncedParam
}


export const useDocumentTitle = (title: string,keepOnmount: boolean = true) => {
    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    },[title])

    useEffect(() => {
        return () => {
            if(!keepOnmount){
                document.title = oldTitle
            }
        }
    },[keepOnmount,oldTitle])
}