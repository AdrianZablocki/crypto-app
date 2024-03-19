import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-segments-tabs',
  templateUrl: './segments-tabs.component.html',
  styleUrls: ['./segments-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, IonLabel, IonSegment, IonSegmentButton, NgTemplateOutlet]
})
export class SegmentsTabsComponent implements OnInit {
  @Input() tabConfig!: { id: string; name: string; tmpl?: TemplateRef<any>}[];

  selectedTab = signal<string>('');

  ngOnInit(): void {
    this.selectedTab.set(this.tabConfig[0].id);
  }

  segmentChanged(event: CustomEvent | Event): void {
    this.selectedTab.set((event as CustomEvent).detail.value);
  }

}
