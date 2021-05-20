import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CryptoListModel } from '../models/crypto-list.model';

// A crypto table component to display the crypto rows.
@Component({
  selector: 'app-crypto-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent implements OnInit {

  @Input() cryptoList: CryptoListModel = {};
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
