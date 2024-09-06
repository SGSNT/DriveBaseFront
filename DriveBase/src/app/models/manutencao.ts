import { Carro } from "./carro";

export class Manutencao {

    id!: number;
    data!: string;
    tipoServico!: string;
    custo!: number;
    carros!:  Carro;

    constructor(id:number,data:string,tipoServico:string,custo:number,carros:Carro){
        this.id = id;
        this.data = data;
        this.tipoServico = tipoServico;
        this.custo = custo;
        if (carros) this.carros = carros;
    }
}
