import { Marca } from "./marca";
import { Proprietario } from "./proprietario";

export class Carro {

    id!: number;
    nome!: string;
    modelo!: string;
    ano!: string;
    marca!: Marca; 
    proprietarios!: Proprietario[];    
    

    constructor(id: number, nome: string, modelo: string, ano: string, marca: Marca){

        this.id = id;
        this.nome = nome;
        this.modelo = modelo;
        this.ano = ano;
        if (marca) this.marca = marca;
    }
}
