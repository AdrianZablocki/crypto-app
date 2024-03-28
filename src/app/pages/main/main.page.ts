import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild, computed, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import {
  LastViewedComponent,
  ListItemComponent,
  ModalComponent, 
  SegmentsTabsComponent,
  ToolbarComponent
} from 'src/app/components';
import { SegmentsTabsHelper } from 'src/app/components/segments-tabs/segments-tabs.helper';
import { ICryptoCurrency, ListItemTypeEnum, ModalType, ModalTypeEnum } from 'src/app/models';
import { WalletStore } from 'src/app/store/wallet.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    LastViewedComponent,
    ListItemComponent,
    ModalComponent,
    SegmentsTabsComponent,
    ToolbarComponent
  ]
})
export class MainPage implements AfterViewInit {
  @ViewChild('walletTmpl') private walletTmpl!: TemplateRef<any>;
  @ViewChild('discoveryTmpl') private discoveryTmpl!: TemplateRef<any>;
  
  isModalOpen = false;
  openedModalType: ModalType = ModalTypeEnum.CARD;
  selectedItem!: ICryptoCurrency;
  modalType = ModalTypeEnum;
  listItemType = ListItemTypeEnum;
  segmentsConfig = [
    // { id: 'discovery', name: 'Discovery' },
    { id: 'wallet', name: 'Wallet' },
    { id: 'discovery', name: 'Discovery' }
  ];

  store = inject(WalletStore);

  // TODO remove after tests
  // test = computed(() => {
  //   const selectedCoins = this.store.selectedCoin();
  //   return {
  //     coin: selectedCoins.coins,
  //     user: selectedCoins.userId
  //   }
  // });

  ngAfterViewInit(): void {
    this.segmentsConfig = SegmentsTabsHelper.mapTmpl(
      this.segmentsConfig, {
        wallet: this.walletTmpl,
        discovery: this.discoveryTmpl
      }
    );
  }

  openModalOnSelectItem(item: ICryptoCurrency, modalType: ModalType): void {
    this.selectedItem = item;
    this.isModalOpen = true;
    this.openedModalType = modalType;
  }

  onSegmentChange(segmentName: any): void {
    if (segmentName === 'discovery') {
      this.store.loadCryptoList(null);
    }
  }

  test123(e: any): void {

    this.isModalOpen = e;

    console.log(e);
    if (!e) {
      this.store.updateLastViewed(this.selectedItem.symbol);
      this.store.saveToLocalStorage();
      this.store.loadLastViewed(this.store.lastViewed().join(','));
    }

  }

}
