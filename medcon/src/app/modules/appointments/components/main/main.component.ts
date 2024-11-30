import { Component } from '@angular/core';
import { AsideComponent } from '../../../../common/aside/aside.component';
import { CardComponent } from '../../../../components/card/card.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AsideComponent,
    CardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
