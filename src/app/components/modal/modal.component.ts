import { AfterViewInit, ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonModal, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/angular/standalone";

import { ICryptoCurrency, TradeType, TradeTypeEnum } from 'src/app/models';
import { ChartComponent } from '../chart/chart.component';
import { SegmentsTabsComponent } from '../segments-tabs/segments-tabs.component';
import { ModalBaseDirective } from 'src/app/directives/modal-base.directive';
import { TradeModalComponent } from '../trade-modal/trade-modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonModal,
    IonToolbar,
    IonHeader,
    IonContent,
    ChartComponent,
    SegmentsTabsComponent,
    TradeModalComponent
  ]
})
export class ModalComponent extends ModalBaseDirective implements AfterViewInit {
  @Input() data!: ICryptoCurrency;
  @ViewChild('chart') private chart!: TemplateRef<ChartComponent>;
  @ViewChild('test1') private test1!: TemplateRef<any>;

  selectedTradeType: TradeType = TradeTypeEnum.BUY;
  tradeType = TradeTypeEnum;

  segmentsConfig = [
    { id: 'chart', name: 'Review' },
    { id: 'test1', name: 'News' }
  ];

  isTradeModalOpen = false;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
      this.mapTmpl();
  }

  openTradeModal(tradeType: TradeType): void {
    this.isTradeModalOpen = true;
    this.selectedTradeType = tradeType;
  }

  private mapTmpl(): void {
    const map: {[key: string]: TemplateRef<any>} = {
      chart: this.chart,
      test1: this.test1
    };

    this.segmentsConfig = this.segmentsConfig.map(el => ({ ...el, tmpl: map[el.id] }));
  }

}
