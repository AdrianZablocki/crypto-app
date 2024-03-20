import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoBitcoin, wallet } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'pages-tabs.component.html',
  styleUrls: ['pages-tabs.component.scss'],
  standalone: true,
  imports: [ IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class PagesTabsComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ logoBitcoin, wallet });
  }
}
