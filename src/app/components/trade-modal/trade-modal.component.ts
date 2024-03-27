import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonModal, IonButtons, IonButton, IonToolbar, IonIcon, IonContent, IonInput, IonItem, IonLabel } from "@ionic/angular/standalone";

import { ModalBaseDirective } from 'src/app/directives/modal-base.directive';
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
    FormsModule,
    IonLabel,
    IonItem,
    IonContent,
    IonIcon,
    IonInput,
    IonToolbar,
    IonButton,
    IonButtons,
    IonModal,
    IonHeader,
    ReactiveFormsModule
  ]
})
export class TradeModalComponent extends ModalBaseDirective implements OnInit {
  @Input() data!: ICryptoCurrency;
  @Input() tradeType: TradeType = TradeTypeEnum.BUY;
  @Output() closeOnFinalizeTransaction = new EventEmitter();

  form!: FormGroup;
  ballance = 12345.45; // TODO get blance from store, before create it
  tradeTypeEnum = TradeTypeEnum;

  private store = inject(WalletStore);

  constructor(private formBuilder: FormBuilder) {
    super()
   }

  ngOnInit() {
    console.log('trade modal init', this.data);

    this.form = this.formBuilder.group({
      currencyInput: [0],
      balanceInput: [0, [Validators.max(this.ballance)]],
      ballance: [this.ballance, []]
    })
  }

  onAction(code: string): void {
    this.store.buyCurrency({ code, amount: this.form.get('currencyInput')?.value });
    this.store.saveToLocalStorage();
    this.store.loadWallet(this.store.wallet());

    this.form.patchValue({
      ballance: this.form.get('ballance')?.value - this.form.get('balanceInput')?.value,
      balanceInput: 0,
      currencyInput: 0
    });
    this.closeOnFinalizeTransaction.emit(false);
  }

  onCurrencyInput(event: CustomEvent | Event): void {
    this.form.patchValue({
      balanceInput: (event as CustomEvent).detail.value * this.data.quote.USD.price,
      currencyInput: (event as CustomEvent).detail.value
    });
  }

  onBalanceInput(event: CustomEvent | Event): void {
    this.form.patchValue({
      balanceInput: (event as CustomEvent).detail.value,
      currencyInput: (event as CustomEvent).detail.value / this.data.quote.USD.price
    });
  }

  spendAllBalance(balance: number): void {
    // TODO substract the amount spent from walet balance, before create it
    this.form.patchValue({
      balanceInput: balance,
      currencyInput: balance / this.data.quote.USD.price
    });
  }

  isTradeButtonDisabled() : boolean {
    if (this.form.get('balanceInput')?.errors) {
      return true;
    }
    return this.form.get('balanceInput')?.value < 0 || this.form.get('currencyInput')?.value <= 0;
  }
}
