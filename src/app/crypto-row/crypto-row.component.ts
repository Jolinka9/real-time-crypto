import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CryptoRowModel } from '../models/crypto-row.model';

// A crypto row component to display each row of the requested data.
@Component({
  selector: 'app-crypto-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crypto-row.component.html',
  styleUrls: ['./crypto-row.component.css']
})
export class CryptoRowComponent implements OnInit {

  @Input() cryptoRow: CryptoRowModel = new CryptoRowModel();
  constructor() { }

  ngOnInit(): void {
  }

}
