import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';

import { CmcService } from 'src/app/services/cmc-service/cmc.service';
import { WsService } from 'src/app/services/ws-service/ws.service';
import { ChartComponent, SegmentsTabsComponent, ToolbarComponent } from 'src/app/components';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.page.html',
  styleUrls: ['./crypto.page.scss'],
  standalone: true,
  imports: [
    ChartComponent,
    CommonModule,
    FormsModule,
    IonicModule,
    SegmentsTabsComponent,
    ToolbarComponent
  ]
})
export class CryptoPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('walletTmpl') private walletTmpl!: TemplateRef<any>;
  @ViewChild('discoveryTmpl') private discoveryTmpl!: TemplateRef<any>;
  
  data$!: Observable<unknown>;
  selectedTab = 'custom';

  segmentsConfig = [
    { id: 'wallet', name: 'Portfel' },
    { id: 'discovery', name: 'Odkryj' }
  ];

  constructor(
    private cmcService: CmcService,
    private wsService: WsService
  ) {
    addIcons({ personCircleOutline })
  }

  ngOnInit(): void {
    this.data$ = this.cmcService.getCoins();
    // ,orderBookL2_25:SUIUSD //FTTUSDT
    // this.initializeSocketConnection('subscribe=orderBookL2_25:DOGE');
  }

  ngAfterViewInit(): void {
    this.mapTmpl();
  }

  ngOnDestroy() {
    this.disconnectSocket();
  }

  private initializeSocketConnection(params: string) {
    this.wsService.connectSocket(params).subscribe(data => console.log('WS', data));
  }

  private disconnectSocket() {
    this.wsService.disconnectSocket();
  }

  private mapTmpl(): void {
    const map: {[key: string]: TemplateRef<any>} = {
      wallet: this.walletTmpl,
      discovery: this.discoveryTmpl
    };

    this.segmentsConfig = this.segmentsConfig.map(el => ({ ...el, tmpl: map[el.id] }));
  }

}
