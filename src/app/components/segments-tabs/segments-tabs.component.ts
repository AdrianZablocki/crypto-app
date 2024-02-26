import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, Input, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-segments-tabs',
  templateUrl: './segments-tabs.component.html',
  styleUrls: ['./segments-tabs.component.scss'],
  standalone: true,
  imports: [FormsModule, IonLabel, IonSegment, IonSegmentButton, NgTemplateOutlet]
})
export class SegmentsTabsComponent  implements AfterViewInit {
  @Input() tabConfig!: { name: string, tmpl?: TemplateRef<any>}[];
  
  selectedTab!: string;

  ngAfterViewInit(): void {
      this.selectedTab = this.tabConfig[0].name;
  }

}
