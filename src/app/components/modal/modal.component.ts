import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonModal, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBackOutline, closeOutline, notifications, notificationsOutline, star, starOutline } from 'ionicons/icons';

import { ICryptoCurrency, ModalType, ModalTypeEnum } from 'src/app/models';
import { CmcService } from 'src/app/services';
import { ChartComponent } from '../chart/chart.component';
import { SegmentsTabsComponent } from '../segments-tabs/segments-tabs.component';

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
    SegmentsTabsComponent
  ]
})
export class ModalComponent implements AfterViewInit {
  @Input() isOpen = false;
  @Input() selectedModalType: ModalType = ModalTypeEnum.CARD;
  @Input() data!: ICryptoCurrency;
  @Output() openModal = new EventEmitter<boolean>();

  @ViewChild('chart') private chart!: TemplateRef<ChartComponent>;
  @ViewChild('test1') private test1!: TemplateRef<any>;

  modalType = ModalTypeEnum;
  segmentsConfig = [
    { id: 'chart', name: 'Review' },
    { id: 'test1', name: 'News' }
  ];

  constructor(
    private animationCtrl: AnimationController,
    private cmcService: CmcService
  ) {
    addIcons({
      arrowBackOutline,
      closeOutline,
      notifications,
      notificationsOutline,
      star,
      starOutline
    })
  }

  ngAfterViewInit(): void {
      this.mapTmpl();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateX(100%)' },
        { offset: 1, opacity: '1', transform: 'translateX(0)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('cubic-bezier(0.42, 0, 0.58, 1)')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  getIconUrl(id: number): string {
    return this.cmcService.getIconUrl(id);
  }

  private mapTmpl(): void {
    const map: {[key: string]: TemplateRef<any>} = {
      chart: this.chart,
      test1: this.test1
    };

    this.segmentsConfig = this.segmentsConfig.map(el => ({ ...el, tmpl: map[el.id] }));
  }

}
