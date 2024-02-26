import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CryptoPage } from './crypto.page';

describe('HomePage', () => {
  let component: CryptoPage;
  let fixture: ComponentFixture<CryptoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CryptoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
