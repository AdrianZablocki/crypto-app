import { CommonModule, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ICryptoCurrency } from 'src/app/models';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule, IonicModule, DecimalPipe, CurrencyPipe, PercentPipe
  ]
})
export class ListItemComponent  implements OnInit {
  @Input() item!: ICryptoCurrency;
  @Input() itemType: 'walletItem' | 'tradeItem' = 'walletItem';

  @Output() selectItem = new EventEmitter<ICryptoCurrency>();

  constructor() { }

  ngOnInit(): void {
    // TODO remove after tests
    this.item.amount = 4.3;
  }

  getIconUrl(id: number): string {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
  }

  onSelectItem(item: ICryptoCurrency): void {
    this.selectItem.emit(item);
  }

}
