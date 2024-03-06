import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, map } from 'rxjs';

import { ListItemComponent, ModalComponent, ToolbarComponent } from 'src/app/components';
import { ICryptoCurrency, ListItemTypeEnum, ModalType, ModalTypeEnum } from 'src/app/models';
import { CmcService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent, CommonModule, ListItemComponent, ModalComponent]
})
export class MainPage implements OnInit {
  data$!: Observable<any>;
  isModalOpen = false;
  openedModalType: ModalType = ModalTypeEnum.CARD;
  selectedItem!: ICryptoCurrency;
  modalType = ModalTypeEnum;
  listItemType = ListItemTypeEnum;

  constructor(
    private cmcService: CmcService
  ) { }

  ngOnInit(): void {
      this.data$ = this.cmcService.getCoins().pipe(map((res) => res.data));
  }

  openModalOnSelectItem(item: ICryptoCurrency, modalType:  ModalType): void {
    console.log('selected item', item);
    this.selectedItem = item;
    this.isModalOpen = true;
    this.openedModalType = modalType;
  }

}
