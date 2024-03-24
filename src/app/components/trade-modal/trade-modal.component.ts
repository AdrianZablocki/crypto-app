import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { ModalBaseDirective } from 'src/app/directives/modal-base.directive';
import { IonHeader, IonModal, IonButtons, IonButton, IonToolbar, IonIcon, IonContent, IonInput, IonItem, IonLabel } from "@ionic/angular/standalone";
import { ICryptoCurrency } from 'src/app/models';
import { TradeType, TradeTypeEnum } from 'src/app/models/trade.type';
import { WalletStore } from 'src/app/store/wallet.store';

@Component({
  selector: 'app-trade-modal',
  templateUrl: './trade-modal.component.html',
  styleUrls: ['./trade-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonContent,
    IonIcon,
    IonInput,
    IonToolbar,
    IonButton,
    IonButtons,
    IonModal,
    IonHeader 
  ]
})
export class TradeModalComponent extends ModalBaseDirective implements OnInit {
  @Input() data!: ICryptoCurrency;
  @Input() tradeType: TradeType = TradeTypeEnum.BUY;

  tradeTypeEnum = TradeTypeEnum;

  private store = inject(WalletStore);

  constructor() {
    super()
   }

  ngOnInit() {
    console.log('trade modal init', this.data)
  }

  onAction(code: string, amount: number): void {
    this.store.buyCurrency({code, amount});
    this.store.saveToLocalStorage();
    this.store.loadWallet(this.store.wallet());
  }

}
