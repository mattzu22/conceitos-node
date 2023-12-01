//representação de uma espaço na memoria do computador, usado pra transitar dados de uma maneira rapida usando o formato binario, usando um nivel mais baxio que um texto com acentos 

const buffer = Buffer.from("hello");

console.log(buffer);
console.log(buffer.toJSON());