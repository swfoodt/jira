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

export const resetRoute = () => window.location.href = window.location.origin

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};