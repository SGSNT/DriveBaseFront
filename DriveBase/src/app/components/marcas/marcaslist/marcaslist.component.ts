import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink,MarcasdetailsComponent,MdbModalModule],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  lista: Marca[] = [];
  marcaEdit: Marca = new Marca();
  modalService = inject(MdbModalService);
  
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  @Input("esconderBotoes") escondeBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>(); 

  marcaService = inject(MarcaService);

  constructor(){

    this.findAll();

    let novaMarca = history.state.novaMarca;
    let marcaEditada = history.state.marcaEditada;

    if(novaMarca != null){
      novaMarca.id = 555;
      this.lista.push(novaMarca);
    }
    if(marcaEditada != null){

      let indice = this.lista.findIndex((x) => {

        return x.id == marcaEditada.id;

      });

      this.lista[indice] = marcaEditada;

    }
  }

  findAll(){

    this.marcaService.findAll().subscribe({

      next: lista => {

        this.lista = lista;

      },

      error: erro => {

        Swal.fire({

          title: 'Error',
          icon: 'error',
          confirmButtonText: 'Ok',
  
        });
      }
    });
  }

  delete(marca: Marca){

    Swal.fire({

      title: 'Atenção!',
      text: 'Deseja realmente excluir a marca?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'

    }).then((result) => {

      if(result.isConfirmed){

        this.marcaService.delete(marca.id).subscribe({

          next: mensagem => {

            Swal.fire({

              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'

            });

            this.findAll();

          },
          error: erro => {

            Swal.fire({

              title: 'Erro!',
              text: 'Erro ao excluir marca!',
              icon: 'error',
              confirmButtonText: 'Ok'

            });
          }
        });
      }
    });

  }

  save(){

    this.marcaEdit = new Marca();
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe)

  }

  update(marca: Marca){

    this.marcaEdit = Object.assign({},marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe)
  }

  retornoDetalhe(marca: Marca){

    this.findAll();
    this.modalRef.close();

  }

  select(marca:Marca){

    this.retorno.emit(marca);

  }
}
