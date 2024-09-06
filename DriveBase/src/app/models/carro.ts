import { Manutencao } from "./manutencao";
import { Marca } from "./marca";
import { Proprietario } from "./proprietario";

export class Carro {

    id!: number;
    nome!: string;
    modelo!: string;
    ano!: string;
    marca!: Marca; 
    proprietarios!: Proprietario[];    
    manutencao!: Manutencao[];

    constructor(id: number, nome: string, modelo: string, ano: string, marca: Marca,proprietarios: Proprietario[]){

        this.id = id;
        this.nome = nome;
        this.modelo = modelo;
        this.ano = ano;
        if (marca) this.marca = marca;
        if (proprietarios) this.proprietarios = proprietarios;
    }
}
