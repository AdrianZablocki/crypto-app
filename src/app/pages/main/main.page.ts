import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, map } from 'rxjs';

import { ToolbarComponent } from 'src/app/components';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { ICryptoCurrency } from 'src/app/models';
import { CmcService } from 'src/app/services/cmc-service/cmc.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent, CommonModule, ListItemComponent]
})
export class MainPage implements OnInit {
  data$!: Observable<any>;
  
  constructor(
    private cmcService: CmcService,
  ) { }

  ngOnInit(): void {
      this.data$ = this.cmcService.getCoins().pipe(map((res) => res.data));
  }

  onSelectListItem(item: ICryptoCurrency): void {
    console.log('selected item', item);
  }

}
