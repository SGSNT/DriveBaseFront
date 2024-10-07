import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Manutencao } from '../../../models/manutencao';
import { Carro } from '../../../models/carro';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import { ManutencaoService } from '../../../services/manutencao.service';
import Swal from 'sweetalert2';
import { Proprietario } from '../../../models/proprietario';
import { CarroslistComponent } from '../../carros/carroslist/carroslist.component';

@Component({
  selector: 'app-manutencaodetails',
  standalone: true,
  imports: [MdbModalModule,MdbFormsModule,FormsModule,CarroslistComponent],
  templateUrl: './manutencaodetails.component.html',
  styleUrl: './manutencaodetails.component.scss'
})
export class ManutencaodetailsComponent {

  @Input("manutencao") manutencao: Manutencao = new Manutencao(0,"","",0,new Carro(0,"","","",new Marca(),[],[]));
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService);
  @ViewChild("modalCarros") modalCarros!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  manutencaoService = inject(ManutencaoService);

  constructor(){

    let id = this.router.snapshot.params['id'];
    if(id > 0){

      this.findById(id);

    }else{

      if(this.manutencao.id > 0){

        this.findById(id);

      }

    }
  }

  findById(id: number){

    this.manutencaoService.findById(id).subscribe({

      next: retorno => {
      
        this.manutencao = retorno;

      },

      error: erro => {

        Swal.fire({

          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText:'OK',

        });

      }

    });

  }

  save(){

    if(this.manutencao.id > 0){

      this.manutencaoService.update(this.manutencao,this.manutencao.id).subscribe({

      next: mensagem => {

        Swal.fire({

          title: mensagem,
          icon: 'success',
          confirmButtonText:'OK',

        });

        this.router2.navigate(['admin/manutencao'],{state:{manutencaoEditado:this.manutencao}});
        this.retorno.emit(this.manutencao);

      },

      error: erro => {

        Swal.fire({

          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText:'OK',

        });

      }

      });

    }else{

      this.manutencaoService.save(this.manutencao).subscribe({

        next: mensagem => {

          Swal.fire({

            title: mensagem,
            icon: 'success',
            confirmButtonText:'OK',

          });

          this.router2.navigate(['admin/manutencao'],{state:{manutencaoNovo:this.manutencao}});
          this.retorno.emit(this.manutencao);
        },

        error: erro => {

          Swal.fire({

            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText:'OK',

          });

        }

      });

    }

  }

  
}
