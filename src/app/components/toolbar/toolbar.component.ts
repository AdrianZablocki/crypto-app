import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { card, personCircle, statsChart } from 'ionicons/icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule
  ]
})
export class ToolbarComponent {

  constructor() {
    addIcons({ card, personCircle, statsChart })
  }

  onSearch(event: any) {
    console.log(event)
  }
}
