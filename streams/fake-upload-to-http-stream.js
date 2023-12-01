import { Readable } from "node:stream";
import fetch from "node-fetch"

class OneToHundreStream extends Readable {
    index = 1

    _read(){
        const i = this.index++

       setTimeout(() => {
        if(i > 5){
            this.push(null)
        }else{
            const buf = Buffer.from(String(i))

            this.push(buf)
        }
       }, 1000);
    }
}

const stream = new OneToHundreStream

//podemos abrir um canal de req e enviar as informações aos poucos sem encerrar a req

fetch('http://localhost:3334', {
    method: "POST",
    body: stream,
}).then(res => {
    return res.text()
}).then(data =>{
    console.log(data);
})
