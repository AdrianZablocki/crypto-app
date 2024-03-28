import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonTitle, IonList, IonCard, IonCardContent } from '@ionic/angular/standalone';

import { ICryptoCurrency } from 'src/app/models';
import { CmcService } from 'src/app/services';

@Component({
  selector: 'app-last-viewed',
  templateUrl: './last-viewed.component.html',
  styleUrls: ['./last-viewed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IonCardContent,
    IonCard, 
    IonList, 
    IonTitle
  ]
})
export class LastViewedComponent {
  @Input() data!: ICryptoCurrency[];

  constructor(private cmcService: CmcService) { }

  getIconUrl(id: number): string {
    return this.cmcService.getIconUrl(id);
  }

}
