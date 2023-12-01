import  http  from "node:http";
import { Transform } from "node:stream"

class InverseNumberStream extends Transform{
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1

        console.log(transformed);
        
        //primeiro arguemnto é o erro 
        //segund = recurso transformado obg: precisa estar como um buffer
        callback(null, Buffer.from(String(transformed)))
     }
}

//req => ReadableStream
//res => WritableStream
 

const serve = http.createServer(async (req, res) =>{
    const buffers = []

    //sinxtase para esperar o req estar completo para poder usa-lo depois 
    //permiti percorrer toda a stream e enquanto ela nao for peccorida por completo  nada vai ser executado posteriomente 
    for await (const chunck of req){
        buffers.push(chunck)
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent)
    // return req
    // .pipe(new InverseNumberStream())
    // .pipe(res)
})

serve.listen(3334)