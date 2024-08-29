import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MarcaslistComponent } from '../../marcas/marcaslist/marcaslist.component';
import { Manutencao } from '../../../models/manutencao';
import { ManutencaolistComponent } from '../../manutencao/manutencaolist/manutencaolist.component';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosService } from '../../../services/carro.service';
import Swal from 'sweetalert2';
import { Marca } from '../../../models/marca';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule,FormsModule,MarcaslistComponent,ManutencaolistComponent,],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro(0,"","","",new Marca());
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router1 = inject(Router);

  //Elementos da Modal
  modalService = inject(MdbModalService);
  @ViewChild("modalManutencao") modalManutencao!: TemplateRef<any>;
  @ViewChild("modalMarcas") modalMarca!: TemplateRef<any>;
  @ViewChild("modalProprietario") modalProprietario!: TemplateRef<any>;
  @ViewChild("modalVenda") modalVenda!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarrosService);

  constructor(){

    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{
      if(this.carro.id > 0)
        this.findById(id);
    }
  }

  findById(id: number){

    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
      },
      error: erro =>{
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  save(){

    if(this.carro.id > 0){

      this.carroService.update(this.carro,this.carro.id).subscribe({

        next: mensagem => {

          Swal.fire({

            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          this.router1.navigate(['admin/carros'], {state: {carroEditado: this.carro}});
          this.retorno.emit(this.carro);
        },

        error: erro =>{
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }

      });

    }else{

      this.carroService.save(this.carro).subscribe({

        next: mensagem => {

          Swal.fire({

            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          this.router1.navigate(['admin/carros'], {state: {carroEditado: this.carro}});
          this.retorno.emit(this.carro);
        },

        error: erro =>{
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }

      });

    }
  }

  buscarMarcas(){
    this.modalRef = this.modalService.open(this.modalMarca, {modalClass: 'modal-lg'});
  }

  buscarManutencoes(){
    this.modalRef = this.modalService.open(this.modalManutencao, {modalClass: 'modal-lg'});
  }

  buscarProprietarios(){
    this.modalRef = this.modalService.open(this.modalProprietario, {modalClass: 'modal-lg'});
  }

  buscarVendas(){
    this.modalRef = this.modalService.open(this.modalVenda, {modalClass: 'modal-lg'});
  }

  retornoMarca(marca: Marca){
    this.carro.marca = marca;
    this.modalRef.close();
  }

}