import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if(isFalsy(value)){
            // @ts-ignore
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