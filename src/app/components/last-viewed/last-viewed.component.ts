import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input() data: (ICryptoCurrency | undefined)[] | undefined = [] as ICryptoCurrency[];

  constructor(private cmcService: CmcService) { }

  getCoinIcon(id: number): string {
    return this.cmcService.getCoinIcon(id);
  }

}
