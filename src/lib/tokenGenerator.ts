export const numbers = [0,1,2,3,4,5,6,7,8,9]
export const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
export default function tokenGenerator(length: number = 64) {
    var token = ''
    for (var i: number = 0; i < length; i++) {
        if (i % 2 == 0) {
            token += numbers[Math.floor(Math.random() * numbers.length)]
        } else {
            token += words[Math.floor(Math.random() * words.length)]
        }
    }
    return token;
}