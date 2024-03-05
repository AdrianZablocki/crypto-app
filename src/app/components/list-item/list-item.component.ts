import { CommonModule, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

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
  @Input() item!: any;
  @Input() itemType: 'walletItem' | 'tradeItem' = 'walletItem';

  constructor() { }

  ngOnInit(): void {
    // TODO remove after tests
    this.item.amount = 4.3;
    console.log('List item component init', this.item);
  }

  getIconUrl(id: string): string {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
  }

}
