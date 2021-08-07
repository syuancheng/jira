import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

// don't change the import object
export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        //@ts-ignore
        const value = result[key]
        //undefined, null, 0
        if(isFalsy(value)) {
            //@ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

//TODO use flood type to update this in future
export const useDebounce = (value: unknown, delay?: number): any => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}