import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, computed, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ListItemComponent, ModalComponent, SegmentsTabsComponent, ToolbarComponent } from 'src/app/components';
import { SegmentsTabsHelper } from 'src/app/components/segments-tabs/segments-tabs.helper';
import { ICryptoCurrency, ListItemTypeEnum, ModalType, ModalTypeEnum } from 'src/app/models';
import { WalletStore } from 'src/app/store/wallet/wallet.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ToolbarComponent,
    CommonModule,
    ListItemComponent,
    ModalComponent,
    SegmentsTabsComponent
  ]
})
export class MainPage implements OnInit, AfterViewInit {
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

  store = inject(WalletStore);

  // TODO remove after tests
  test = computed(() => {
    const selectedCoins = this.store.selectedCoin();
    return {
      coin: selectedCoins.coins,
      user: selectedCoins.userId
    }
  });

  ngOnInit(): void {
    console.log('init Main Page')
  }

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
    // TODO remove after tests
    console.log(this.test())
  }

}
