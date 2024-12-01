import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})



export class AsideComponent {
  logout(): void {
    sessionStorage.removeItem('userToken')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('userName')
  }

  

  getUserName():string | null{
    return sessionStorage.getItem('userName') 
  }



}
