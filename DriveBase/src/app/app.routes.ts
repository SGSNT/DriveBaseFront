import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { LoginComponent } from './components/layout/login/login.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { ManutencaodetailsComponent } from './components/manutencao/manutencaodetails/manutencaodetails.component';
import { ProprietariodetailsComponent } from './components/proprietario/proprietariodetails/proprietariodetails.component';
import { MarcasdetailsComponent } from './components/marcas/marcasdetails/marcasdetails.component';
import { ManutencaolistComponent } from './components/manutencao/manutencaolist/manutencaolist.component';
import { ProprietariolistComponent } from './components/proprietario/proprietariolist/proprietariolist.component';
import { MarcaslistComponent } from './components/marcas/marcaslist/marcaslist.component';
import { LogComponent } from './components/log/log.component';
import { loginGuard } from './auth/login.guard';

export const routes: Routes = [
   {path:"",redirectTo:"login",pathMatch:"full"},
   {path:"login",component:LoginComponent},
   {path:"admin",component:PrincipalComponent,canActivate: [loginGuard],children:[
      {path:"carros",component:CarroslistComponent},
      {path: "carros/save",component: CarrosdetailsComponent},
      {path: "carros/update/:id",component: CarrosdetailsComponent},
      {path:"manutencao",component: ManutencaolistComponent},
      {path: "manutencao/save",component: ManutencaodetailsComponent},
      {path: "manutencao/update/:id",component: ManutencaodetailsComponent},
      {path:"proprietario",component:ProprietariolistComponent},
      {path: "proprietario/save",component: ProprietariodetailsComponent},
      {path: "proprietario/update/:id",component: ProprietariodetailsComponent},
      {path:"marca",component:MarcaslistComponent},
      {path: "marca/save",component: MarcasdetailsComponent},
      {path: "marca/update/:id",component: MarcasdetailsComponent},
      {path: "log",component: LogComponent}
   ]}
];
