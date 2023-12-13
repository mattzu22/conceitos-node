
//os modulos de stream só estão dentro do node:fs
import fs from "node:fs/promises"

const databasePath = new URL('../db.json', import.meta.url)

export class Database{
    //criar uma variavel mais genérica para poder amarzenar qualquer tipo de dado e não epenas usuários
    //jogo da velha , deixa o elemento privado pra que outros arquivos nao tenha acesso quando a class for chamada 
    #database = {}

    constructor(){
           fs.readFile(databasePath, 'utf-8').then(data =>{
            this.#database = JSON.parse(data)
           })
           .catch(() =>{
            this.#persist()
           })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table){
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()

        return data;
    }

    delete(table, id){
        console.log(table, id);
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}