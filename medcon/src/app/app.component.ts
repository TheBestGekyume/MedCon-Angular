import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/header/header.component";
import { AsideComponent } from "./common/aside/aside.component";
import { MainComponent } from './modules/appointments/components/main/main.component';
import { LoginComponent } from './modules/auth/components/login/login.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medcon';
}
