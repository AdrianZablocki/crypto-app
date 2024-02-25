import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CmcService } from 'src/app/services/cmc-service/cmc.service';
import { ChartComponent } from 'src/app/components/chart/chart/chart.component';
import { WsService } from 'src/app/services/ws-service/ws.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, ChartComponent, CommonModule, FormsModule]
})
export class HomePage implements OnInit, OnDestroy {
  public data$!: Observable<unknown>;

  constructor(
    private cmcService: CmcService,
    private wsService: WsService
  ) { }

  ngOnInit(): void {
    this.data$ = this.cmcService.getCoins();
    // ,orderBookL2_25:SUIUSD //FTTUSDT
    this.initializeSocketConnection('subscribe=orderBookL2_25:DOGE');
  }

  ngOnDestroy() {
    this.disconnectSocket();
  }

  initializeSocketConnection(params: string) {
    this.wsService.connectSocket(params).subscribe(data => console.log('WS', data));
  }

  disconnectSocket() {
    this.wsService.disconnectSocket();
  }

}
