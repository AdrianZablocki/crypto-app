import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonModal, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBackOutline, closeOutline, notifications, notificationsOutline, star, starOutline } from 'ionicons/icons';

import { ICryptoCurrency, ModalType, ModalTypeEnum } from 'src/app/models';

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
    IonContent
  ]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() selectedModalType: ModalType = ModalTypeEnum.CARD;
  @Input() data!: ICryptoCurrency;
  @Output() openModal = new EventEmitter<boolean>();

  modalType = ModalTypeEnum;

  constructor(private animationCtrl: AnimationController) {
    addIcons({
      arrowBackOutline,
      closeOutline,
      notifications,
      notificationsOutline,
      star,
      starOutline
    })
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

}
