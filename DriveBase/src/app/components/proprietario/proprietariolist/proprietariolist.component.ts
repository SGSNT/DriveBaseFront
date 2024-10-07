import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProprietariodetailsComponent } from '../proprietariodetails/proprietariodetails.component';
import { Proprietario } from '../../../models/proprietario';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProprietarioService } from '../../../services/proprietario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proprietariolist',
  standalone: true,
  imports: [RouterLink, ProprietariodetailsComponent, CommonModule, MdbModalModule],
  templateUrl: './proprietariolist.component.html',
  styleUrls: ['./proprietariolist.component.scss'] 
})
export class ProprietariolistComponent {
  
  lista: Proprietario[] = [];
  proprietarioEdit: Proprietario = new Proprietario(0, "", "", "");
  
  modalService = inject(MdbModalService);
  @ViewChild("modalProprietarioDetalhe") modalProprietarioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  proprietarioService = inject(ProprietarioService);

  @Input('esconderBotoes') escondeBotoes: boolean = false;
  @Output('retorno') retorno = new EventEmitter<any>(); 

  constructor() {
    this.findAll();

    const novoProprietario = history.state.novoProprietario;
    const proprietarioEditado = history.state.proprietarioEditado;

    if (novoProprietario != null) {
      novoProprietario.id = 555;
      this.lista.push(novoProprietario);
    }

    if (proprietarioEditado != null) {
      const indice = this.lista.findIndex((x) => {return x.id == proprietarioEditado.id});

        this.lista[indice] = proprietarioEditado;

    }
  }

  findAll() {
    this.proprietarioService.findAll().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar proprietários',
          text: erro.error
        });
      }
    });
  }

  delete(proprietario: Proprietario) {
    Swal.fire({
      title: 'Atenção!',
      text: 'Deseja realmente excluir o proprietário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proprietarioService.delete(proprietario.id).subscribe({
          next: (mensagem) => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.findAll();
          },
          error: (erro) => {
            Swal.fire({
              title: 'Erro!',
              text: 'Erro ao excluir proprietário!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }

  save() {
    this.proprietarioEdit = new Proprietario(0, "", "", "");
    this.modalRef = this.modalService.open(this.modalProprietarioDetalhe);
  }

  update(proprietario: Proprietario) {
    this.proprietarioEdit = Object.assign({}, proprietario); 
    this.modalRef = this.modalService.open(this.modalProprietarioDetalhe);
  }

  retornoDetalhe(proprietario: Proprietario) {
    this.findAll();
    this.modalRef.close();
  }

  select(proprietario: Proprietario) {
    this.retorno.emit(proprietario);
  }
}
