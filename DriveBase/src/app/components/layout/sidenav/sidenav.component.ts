import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MenuComponent,CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  constructor(public loginService: LoginService){}

}
