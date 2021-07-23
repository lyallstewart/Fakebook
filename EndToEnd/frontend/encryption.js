/*
We need to encrypt messages and achieve end to end encryption.
I am going to impliment RSA. Probably not 2048 bits though.
It would be quite cool to fit the public key onto a QR code, and use that as the way to establish a connection
*/
function isPrime(n,k) {
    /*We need to be able to check if something is prime. 
    This is the algorithm that I am following: https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test#Miller%E2%80%93Rabin_test
    */
    if (n<4) {return n>1}
    if (n%2 === 0) {return false}
    let d=n-1
    let r=0
    while (d % 2 === 0) {
        d/=2
        r++
    }
    for (let i=0; i<k;i++) {
        let a = Math.floor(Math.random()*(n-3))+2
        let x = Math.pow(a,d)%n
        if (x===1 || x===n-1) {
            continue
        }
        let continueBigLoop = false
        for (let j = r - 1; j--;) {
            x = (x*x) % n
            if (x===1) {
                return false
            }
            if (x===n-1) {
                continueBigLoop = true
                break
            }
        }
        if (continueBigLoop) {continue}
        return false
    }
    return true
}
function gcd(a,b) {
    if (a==0){return b}
    if (b==0){return a}
    while (a % b > 0) {
        let remainder = a % b
        a = b
        b = remainder
    }
    return b
}
function extended_gcd(a,b) {
    let old_r = a
    let r = b
    let old_s = 1
    let s = 0
    let old_t = 0
    let t = 1
    while(r!==0) {
        let quotient = Math.floor(old_r/r);
        //console.log(r,s,t);
        let temp = r
        r = old_r - (quotient*r)
        old_r = temp;
        temp = s            
        s = old_s - (quotient*s)
        old_s = temp;           
        temp = t            
        t = old_t - (quotient*t)
        old_t = temp;           
    }
    return old_s
}

class RSAEncryption {
    constructor() {

    }
    generateKeySet=()=>{
        let p = 0
        while (true) {
            if (isPrime(p,100)) {break}
            p=Math.floor(Math.random()*100)
        }
        let q = 0
        while (true) {
            if (isPrime(q,100)) {break}
            q=Math.floor(Math.random()*100)
        }
        let n = p*q
        let lambda_n = ((p-1)*(q-1))
        console.log(lambda_n)
        let e=0
        while (true) {
            if (gcd(e,lambda_n)===1) {break}
            e=Math.floor(Math.random()*(lambda_n-2))
            console.log(e)
        }
        let d=extended_gcd(e,lambda_n)
        console.log(d,e,n)
    }
}

a = new RSAEncryption
a.generateKeySet()
