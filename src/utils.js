const sortObjectByKeys = obj => {
    return Object.keys(obj).sort().reduce((newObj, key)=> {
        newObj[key] = obj[key];
        return newObj;
    },{});
}
export default sortObjectByKeys
