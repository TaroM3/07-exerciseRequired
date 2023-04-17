import tar  from "tar"

import fs from "fs"
import { resolve } from "path"
import { rejects } from "assert"
import { stringify } from "querystring"

export default class Reading {

    #products
    #path

    constructor(){
        this.#products = []
        this.#path = './src/products/products.json'
    }


    getPath(){
        return this.#path
    }
}

function getProducts(path) {
    return new Promise((resolve, reject) => {
        
        if(fs.existsSync(path)){
            console.log('reading file...')
            //let products = fs.readFile(path, 'utf-8')
            return resolve(JSON.parse(fs.readFileSync(path, 'utf-8', null)))
            
        }else{
            return reject('No existe el archivo')
        }

    })   
}

let productManager = new Reading()
getProducts(productManager.getPath()).then((file) => console.log(file))
.catch((err) => console.log(err))
