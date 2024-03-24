import { Directive, EventEmitter, Input, Output, inject } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, closeOutline, notifications, notificationsOutline, star, starOutline } from 'ionicons/icons';

import { CmcService } from '../services';
import { ModalType, ModalTypeEnum } from '../models';

@Directive({
  selector: '[appModalBase]'
})
export class ModalBaseDirective {
  @Input() isOpen = false;
  @Input() selectedModalType: ModalType = ModalTypeEnum.CARD;
  @Output() openModal = new EventEmitter<boolean>();
  modalType = ModalTypeEnum;
  
  animationCtrl = inject(AnimationController);
  cmcService = inject(CmcService)

  constructor() {
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

  getIconUrl(id: number): string {
    return this.cmcService.getIconUrl(id);
  }

}
