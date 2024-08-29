import { Routes } from '@angular/router';

import { LogComponent } from './components/log/log.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { LoginComponent } from './components/layout/login/login.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { ManutencaodetailsComponent } from './components/manutencao/manutencaodetails/manutencaodetails.component';
import { ProprietariodetailsComponent } from './components/proprietario/proprietariodetails/proprietariodetails.component';
import { MarcasdetailsComponent } from './components/marcas/marcasdetails/marcasdetails.component';
import { VendasdetailsComponent } from './components/vendas/vendasdetails/vendasdetails.component';

export const routes: Routes = [
   {path:"",redirectTo:"login",pathMatch:"full"},
   {path:"login",component:LoginComponent},
   {path:"admin",component:PrincipalComponent,children:[
      {path:"carros",component:CarroslistComponent},
      {path: "carros/save",component: CarrosdetailsComponent},
      {path: "carros/update/:id",component: CarrosdetailsComponent},
      {path: "manutencao/save",component: ManutencaodetailsComponent},
      {path: "manutencao/update/:id",component: ManutencaodetailsComponent},
      {path: "proprietario/save",component: ProprietariodetailsComponent},
      {path: "proprietario/update/:id",component: ProprietariodetailsComponent},
      {path: "marca/save",component: MarcasdetailsComponent},
      {path: "marca/update/:id",component: MarcasdetailsComponent},
      {path: "venda/save",component: VendasdetailsComponent},
      {path: "venda/update/:id",component: VendasdetailsComponent},
      {path: "log",component: LogComponent}
   ]}
];
