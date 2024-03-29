import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CmcService, WsService  } from 'src/app/services';
import { ChartComponent, SegmentsTabsComponent, ToolbarComponent } from 'src/app/components';
import { SegmentsTabsHelper } from 'src/app/components/segments-tabs/segments-tabs.helper';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.page.html',
  styleUrls: ['./crypto.page.scss'],
  standalone: true,
  imports: [
    ChartComponent,
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
    { id: 'wallet', name: 'Wallet' },
    { id: 'discovery', name: 'Discovery' }
  ];

  constructor(
    // private cmcService: CmcService,
    private wsService: WsService
  ) { }

  ngOnInit(): void {
    console.log('init crypto')
    // this.data$ = this.cmcService.getCoins();
    // ,orderBookL2_25:SUIUSD //FTTUSDT
    // this.initializeSocketConnection('subscribe=orderBookL2_25:DOGE');
  }

  ngAfterViewInit(): void {
    this.segmentsConfig = SegmentsTabsHelper.mapTmpl(
      this.segmentsConfig, {
        wallet: this.walletTmpl,
        discovery: this.discoveryTmpl
      }
    );
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

}
