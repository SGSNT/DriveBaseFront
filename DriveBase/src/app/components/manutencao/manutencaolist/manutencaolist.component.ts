import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ManutencaodetailsComponent } from '../manutencaodetails/manutencaodetails.component';
import { Manutencao } from '../../../models/manutencao';
import { Carro } from '../../../models/carro';
import { Marca } from '../../../models/marca';
import { ManutencaoService } from '../../../services/manutencao.service';
import { Title } from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manutencaolist',
  standalone: true,
  imports: [RouterLink,MdbModalModule,ManutencaodetailsComponent],
  templateUrl: './manutencaolist.component.html',
  styleUrl: './manutencaolist.component.scss'
})
export class ManutencaolistComponent {

  lista: Manutencao[] = [];
  manutencaoEdit: Manutencao = new Manutencao(0,"","",0,new Carro(0,"","","",new Marca(),[],[]));
  modalService = inject(MdbModalService);

  @Input("esconderBotoes") escondeBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>(); 

  @ViewChild("modalManutencaoDetalhe") modalManutencaoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  manutencaoService = inject(ManutencaoService);

  constructor(){

    this.findAll();

    let novaManutencao = history.state.novaManutencao;
    let manutencaoEditada = history.state.manutencaoEditada;

    if(novaManutencao != null){
      novaManutencao.id = 555;
      this.lista.push(novaManutencao);
    }
    if(manutencaoEditada != null){

      let indice = this.lista.findIndex((x) => {

        return x.id == manutencaoEditada.id;

      });

      this.lista[indice] = manutencaoEditada;

    }
  }

  findAll(){

    this.manutencaoService.findAll().subscribe({

      next: lista => {

        this.lista = lista;

      },

      error: erro => {
        
       Swal.fire({

          title: 'Error',
          icon: 'error',
          confirmButtonText: 'OK'

       });

      }

    });

  }

  delete(manutencao: Manutencao){

    Swal.fire({

      title: 'Atenção',
      text: 'Deseja realmente excluir a manutenção?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'

    }).then((result) => {

      if(result.isConfirmed){

        this.manutencaoService.delete(manutencao.id).subscribe({

          next: mensagem => {

            Swal.fire({

              title: mensagem,
              icon: 'success',
              confirmButtonText: 'OK'

            });

            this.findAll();

          },

          error: erro => {

            Swal.fire({

              title: 'Erro!',
              text: 'Erro ao excluir a manutenção!',
              icon: 'error',
              confirmButtonText: 'OK',
          });

          }

        });

      }

    });

  }

  save(){

    this.manutencaoEdit = new Manutencao(0,"","",0,new Carro(0,"","","",new Marca(),[],[]));
    this.modalRef = this.modalService.open(this.modalManutencaoDetalhe);
  }

  update(manutencao: Manutencao){

    this.manutencaoEdit = Object.assign({},manutencao);
    this.modalRef = this.modalService.open(this.modalManutencaoDetalhe);
  }

  retornoDetalhe(manutencao: Manutencao){

    this.findAll();
    this.modalRef.close();

  }

  select(manutencao: Manutencao){

    this.retorno.emit(manutencao);

  }
}
