import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProprietariolistComponent } from '../proprietariolist/proprietariolist.component';
import { Proprietario } from '../../../models/proprietario';
import { ActivatedRoute, Router } from '@angular/router';
import { ProprietarioService } from '../../../services/proprietario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proprietariodetails',
  standalone: true,
  imports: [MdbModalModule,MdbFormsModule,FormsModule,ProprietariolistComponent],
  templateUrl: './proprietariodetails.component.html',
  styleUrl: './proprietariodetails.component.scss'
})
export class ProprietariodetailsComponent {

  @Input("proprietario") proprietario: Proprietario = new Proprietario(0,"","","");
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  proprietarioService = inject(ProprietarioService);
  
  constructor(){

    let id = this.router.snapshot.params['id'];
    if(id > 0){

      this.findById(id);

    }else{

      if(this.proprietario.id > 0){

        this.findById(id);

  }
}
}

findById(id: number){

  this.proprietarioService.findById(id).subscribe({

    next: retorno => {
    
      this.proprietario = retorno;

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

  if(this.proprietario.id > 0){

    this.proprietarioService.update(this.proprietario,this.proprietario.id).subscribe({

      next: mensagem => {

        Swal.fire({

          title: mensagem,
          icon: 'success',
          confirmButtonText:'OK',

        });

        this.router2.navigate(['admin/proprietario'], {state: {proprietarioEditado: this.proprietario}});
        this.retorno.emit(this.proprietario);

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

  this.proprietarioService.save(this.proprietario).subscribe({

    next: mensagem => {

      Swal.fire({

        title: mensagem,
        icon: 'success',
        confirmButtonText: 'OK',

      });

      this.router2.navigate(['admin/proprietario'], {state: {proprietarioEditado: this.proprietario}});
      this.retorno.emit(this.proprietario);

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

}