interface IObject {
    [key: string]: any
}

export default function only(obj: IObject, ...keys: any) {
    const cleanObj: any = {}
    var cleanKeys: any = []    
    for (var k of keys) {
        if (k.indexOf(' ') >= 0) {
            cleanKeys = cleanKeys.concat(k.split(' '))
        } else {
            cleanKeys = cleanKeys.concat(k)
        }
    }
    
    for(var k of cleanKeys) {
        if (obj.hasOwnProperty(k)) {
            cleanObj[k] = obj[k]
        }
    }
    return cleanObj;
}