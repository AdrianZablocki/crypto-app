import { CommonModule, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ICryptoCurrency, ListItemType, ListItemTypeEnum } from 'src/app/models';
import { CmcService } from 'src/app/services';

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
export class ListItemComponent {
  @Input() item!: ICryptoCurrency;
  @Input() selectedItemType: ListItemType = ListItemTypeEnum.WALLET;

  @Output() selectItem = new EventEmitter<ICryptoCurrency>();

  listItemType = ListItemTypeEnum;

  constructor(private cmcService: CmcService) { }

  getIconUrl(id: number): string {
    return this.cmcService.getIconUrl(id);
  }

  onSelectItem(item: ICryptoCurrency): void {
    this.selectItem.emit(item);
  }

}
