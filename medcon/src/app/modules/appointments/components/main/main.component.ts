import { Component } from '@angular/core';
import { AsideComponent } from '../../../../common/aside/aside.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AsideComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
