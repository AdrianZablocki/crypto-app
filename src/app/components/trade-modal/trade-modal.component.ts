import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalBaseDirective } from 'src/app/directives/modal-base.directive';
import { IonHeader, IonModal, IonButtons, IonButton, IonToolbar, IonIcon, IonContent } from "@ionic/angular/standalone";
import { ICryptoCurrency } from 'src/app/models';
import { TradeType, TradeTypeEnum } from 'src/app/models/trade.type';

@Component({
  selector: 'app-trade-modal',
  templateUrl: './trade-modal.component.html',
  styleUrls: ['./trade-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonContent, IonIcon, IonToolbar, IonButton, IonButtons, IonModal, IonHeader ]
})
export class TradeModalComponent extends ModalBaseDirective implements OnInit {
  @Input() data!: ICryptoCurrency;
  @Input() tradeType: TradeType = TradeTypeEnum.BUY;

  tradeTypeEnum = TradeTypeEnum;

  constructor() {
    super()
   }

  ngOnInit() {
    console.log('trade modal init', this.data)
  }

}
