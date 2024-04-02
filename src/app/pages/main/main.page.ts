import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild, inject } from '@angular/core';
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
    { id: 'wallet', name: 'Wallet' },
    { id: 'discovery', name: 'Discovery' }
  ];

  private store = inject(WalletStore);
  data = this.store.walletData;

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

  onCloseModal(isOpen: boolean): void {
    this.isModalOpen = isOpen;

    if (!isOpen) {
      this.store.updateLastViewed(this.selectedItem.symbol);
      this.store.saveToLocalStorage();
    }
  }

}
