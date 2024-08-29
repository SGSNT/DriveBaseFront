import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ManutencaodetailsComponent } from '../manutencaodetails/manutencaodetails.component';
import { Marca } from '../../../models/marca';

@Component({
  selector: 'app-manutencaolist',
  standalone: true,
  imports: [RouterLink,MdbModalModule,ManutencaodetailsComponent],
  templateUrl: './manutencaolist.component.html',
  styleUrl: './manutencaolist.component.scss'
})
export class ManutencaolistComponent {

  lista: Marca[] = [];

}
