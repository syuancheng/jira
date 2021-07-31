export const isFalsy = (value) => value === 0 ? false : !value

// don't change the import object
export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        //undefinedn, null, 0
        if(isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}