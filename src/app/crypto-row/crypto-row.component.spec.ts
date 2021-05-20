import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoRowComponent } from './crypto-row.component';

describe('CryptoRowComponent', () => {
  let component: CryptoRowComponent;
  let fixture: ComponentFixture<CryptoRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
