/*
We need to encrypt messages and achieve end to end encryption.
I am going to impliment RSA. Probably not 2048 bits though. Yeah let's go 512 bits. still secure, i think...
*/
var CryptoJS = require("crypto-js")

//Get ready for compressed code! It is just because I need this in quite a few places.
function SHA256(string){return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(string))}function B64ToStr(base64){return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(base64))}function StrToB64(string){return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(string))}function NumToB64(number){return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(number.toString(16)))}function B64ToNum(base64){return parseInt("0x00"+CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(base64)))}function B64ToBigInt(base64){return BigInt("0x00"+CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(base64)))}
var forge = require('node-forge');
//Apparently it is quite hard to find chonky primes, and my testing with small primes confirms this.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
    let old_s = 1n
    let s = 0n
    let old_t = 0n
    let t = 1n
    while(r!==0n) {
        let quotient = old_r/r
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
function powmod(b,e,mod) {
    if(mod===1n){return 0n}
    let r=1n
    b%=mod
    while(e>0n){if(e%2n==1n){r=(r*b)%mod}e=e/2n;b=(b*b)%mod}
    return r
}
 
class RSAEncryption {
    constructor() {
        this.type=""
        this.generateKeySet = this.generateKeySet.bind(this)
        this.fromPrivateKey = this.fromPrivateKey.bind(this)
        this.fromPublicKey = this.fromPublicKey.bind(this)
        this.encrypt = this.encrypt.bind(this)
        this.decrypt = this.decrypt.bind(this)
    }
    async generateKeySet(){
        if(this.type){throw "Already declared encryption"}
        var self = this;
        let promise = new Promise(function(myResolve, myReject) {
          forge.prime.generateProbablePrime(256, (err, p_obj) => {
            if(err){throw err}
              forge.prime.generateProbablePrime(256, (err, q_obj) => {
                if(err){throw err}
                let p = BigInt(p_obj.toString(10))
                let q = BigInt(q_obj.toString(10))
                console.log("FOUND PRIMES")
                let n = p*q
                let lambda_n = ((p-1n)*(q-1n))/gcd(p-1n,q-1n)
                let e=65537n
                while (true) {
                    if (gcd(e,lambda_n)===1n) {break}
                    e++
                }
                console.log("FOUND E")
                let d=extended_gcd(e,lambda_n)
                d = d % lambda_n;
                if(d < 0)
                    d += lambda_n;
                self.d = d
                self.e = e
                self.n = n
                self.public = {e,n}
                self.private = {d,e,n}
                self.type = "private"
                myResolve()
              });
          })
          
        });
        await promise

          
        
    }
    fromPublicKey(pub){
        if(this.type){throw "Already declared encryption"}
        this.public = pub
        this.e = pub.e
        this.n = pub.n
        this.type = "public"
    }
    fromPrivateKey(priv){
        if(this.type){throw "Already declared encryption"}
        this.private = priv
        this.public = {e:priv.e,n:priv.n}
        this.d = priv.d
        this.e = priv.e
        this.n = priv.n
        this.type = "private"
    }
    encrypt(m){
        return powmod(m,this.e,this.n)
    }
    decrypt(m){
        return powmod(m,this.d,this.n)
    }
    bigIntToBase64(n){
        return n.toString(8).match(/..?(?=(?:..)*$)/g).map(x=>"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/"[parseInt(x,8)]).join('')
    }
}
main = async ()=>{
    a = new RSAEncryption()
    await a.generateKeySet()
    console.log(a.private)
    start = new Date().getTime()
    b=a.encrypt(3524627427n)
    c=a.decrypt(b)
    console.log(a.p)
    console.log(a.bigIntToBase64(a.n))
    end=new Date().getTime()
    console.log(`TIME:${end-start}ms`)
}
main()