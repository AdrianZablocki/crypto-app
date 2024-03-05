import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, map, tap } from 'rxjs';

import { ToolbarComponent } from 'src/app/components';
import { CmcService } from 'src/app/services/cmc-service/cmc.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent, CommonModule]
})
export class MainPage implements OnInit {
  data$!: Observable<any>;
  constructor(
    private cmcService: CmcService,
  ) { }

  ngOnInit(): void {
      this.data$ = this.cmcService.getCoins().pipe(map((res) => res.data));
  }

  test(id: string): string {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
  }
}
