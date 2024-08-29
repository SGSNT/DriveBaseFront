import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';
import { CarrosService } from '../../../services/carro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, CarrosdetailsComponent,MdbModalModule],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0,"","","",new Marca());
  modalService = inject(MdbModalService);

  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarrosService);

  constructor(){
     
    this.findAll();
    
    let novoCarro = history.state.novoCarro;
    let carroEditado = history.state.carroEditado;

    if(novoCarro != null){
      novoCarro.id = 555;
      this.lista.push(novoCarro);
    }
    if(carroEditado != null){

      let indice = this.lista.findIndex((x) => {

        return x.id == carroEditado.id;

      });

      this.lista[indice] = carroEditado;

    }
  }

 findAll(){

  this.carroService.findAll().subscribe({

    next: lista => {

      this.lista = lista;

    },

    error: erro => {

      Swal.fire({

        title: 'Ocorreu um erro!',
        icon: 'error',
        confirmButtonText: 'Ok',

      });

    }

      });

    }

    delete(carro: Carro){

      Swal.fire({

        title: 'Deseja realmente excluir o carro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',

      }).then((result) => {

        if(result.isConfirmed){

          this.carroService.delete(carro.id).subscribe({

            next: mensagem => {

              Swal.fire({

                title: mensagem,
                icon: 'success',
                confirmButtonText: 'Ok',

              });

              this.findAll();

            },

            error: erro => {

              Swal.fire({

                title: 'Ocorreu um erro!',
                icon: 'error',
                confirmButtonText: 'Ok',

              });

            }

          });

        }

      });

    }

    save(){

      this.carroEdit = new Carro(0,"","","",new Marca());
      this.modalRef = this.modalService.open(this.modalCarroDetalhe);
    }

    update(carro: Carro){

      this.carroEdit = Object.assign({},carro);
      this.modalRef = this.modalService.open(this.modalCarroDetalhe);
    }

    retornoDetalhe(carro: Carro){

      this.findAll();
      this.modalRef.close();
    }
}
