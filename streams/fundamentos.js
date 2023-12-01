//pipe = encaminhar 
//stdin = entrada do terminal
//stdout = saida do terminal 
//strema de leitura tem como proposito enviar dados
//push é o me´todo que utilizamos para uma readable stream fornerce informçãoes pra quem estiver consumindo 
//dentro de mua stream não é aceito os formatos primitivos
//chunck = o pedaço de uma informação 
//

// process.stdin
// .pipe(process.stdout);
//strema de escrita = não retorna nada, apenas preocessa um dado  
//buffer = é um modelo que o node usa pra poder transsiocionar informações entre streams

import { Readable, Transform, Writable } from "node:stream";

class OneToHundreStream extends Readable {
    index = 1

    _read(){
        const i = this.index++

       setTimeout(() => {
        if(i > 100){
            this.push(null)
        }else{
            const buf = Buffer.from(String(i))

            this.push(buf)
        }
       }, 1000);
    }
}

class MultiplyByTenStream extends Writable {
 _write(chunck, encoding, callback){
    console.log(Number(chunck.toString()) * 10);

    callback()
 }
}

//streams de transformação precisa estar entre uma stream de leitura e uma stream escrita
class InverseNumberStream extends Transform{
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1
        
        //primeiro arguemnto é o erro 
        //segund = recurso transformado obg: precisa estar como um buffer
        callback(null, Buffer.from(String(transformed)))
     }
}

new OneToHundreStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream());

// toda stream readable tem um método obrigatório, _read
//_read = retornar os dados da stream

