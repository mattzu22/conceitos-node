
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

    select(table, search){
        let data = this.#database[table] ?? []

        if(data){
            data = data.filter(row => {
                //some =  se pelo menos um for verdadeiro ele retorna 
                //Object entries= transforma um objeto em array 
                return Object.entries(search).some(([key, value]) =>{
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
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
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data}
            this.#persist()
        }
    }
}