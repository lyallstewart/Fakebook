/*
We need to encrypt messages and achieve end to end encryption.
I am going to impliment RSA. Probably not 2048 bits though.
It would be quite cool to fit the public key onto a QR code, and use that as the way to establish a connection
*/

// If this breaks I have absolutely no idea how this works -Lyall

var forge = require('node-forge');
//Apparently it is quite hard to find chonky primes, and my testing with small primes confirms this.

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
          forge.prime.generateProbablePrime(1024, (err, p_obj) => {
            if(err){throw err}
              forge.prime.generateProbablePrime(1024, (err, q_obj) => {
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
}
main = async ()=>{
    a = new RSAEncryption()
    await a.generateKeySet()
    console.log(a.private)
    start = new Date().getTime()
    b=a.encrypt(3524627427n)
    c=a.decrypt(b)
    end=new Date().getTime()
    console.log(`TIME:${end-start}ms`)
}
main()