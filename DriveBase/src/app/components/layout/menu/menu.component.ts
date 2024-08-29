import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
