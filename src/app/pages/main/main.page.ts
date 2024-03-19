import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ListItemComponent, ModalComponent, ToolbarComponent } from 'src/app/components';
import { ICryptoCurrency, ListItemTypeEnum, ModalType, ModalTypeEnum } from 'src/app/models';
import { WalletStore } from 'src/app/store/wallet/wallet.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent, CommonModule, ListItemComponent, ModalComponent]
})
export class MainPage implements OnInit {
  isModalOpen = false;
  openedModalType: ModalType = ModalTypeEnum.CARD;
  selectedItem!: ICryptoCurrency;
  modalType = ModalTypeEnum;
  listItemType = ListItemTypeEnum;

  store = inject(WalletStore)

  test = computed(() => {
    const selectedCoins = this.store.selectedCoin();
    return {
      coin:  selectedCoins.coins,
      user: selectedCoins.userId
    }
  });

  ngOnInit(): void {
    // this.store.load('');
    console.log('init')
  }

  openModalOnSelectItem(item: ICryptoCurrency, modalType:  ModalType): void {
    this.selectedItem = item;
    this.isModalOpen = true;
    this.openedModalType = modalType;
    console.log(this.test())
  }

}
