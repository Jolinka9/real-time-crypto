import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CryptoListModel } from './models/crypto-list.model';
import { CryptoRowModel } from './models/crypto-row.model';
import { WebsocketService } from './websocket.service';

/**
 * Our entry point to the project.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  title = 'real-time-crypto';
  feed: any;
  cryptoList: CryptoListModel  = {};
  filterText = '';

  constructor(private websocketService: WebsocketService) {
    
    // Subscribing to the crypto feed.

    this.feed = this.websocketService.getCryptoFeed();

    this.feed.pipe(takeUntil(this.destroy$))
    .subscribe((cryptoFeed: CryptoRowModel) => {
      // Some crypto feeds come without price. Do not update the price if it is empty.
      if(cryptoFeed && cryptoFeed.PRICE) {
        /**
         * Using onPush strategy means the interested components will only update upon receiving new reference.
         * Therefore, we generate new object reference on each update of the properties.
         * This technique is used with state management approach as well.
         */ 
        this.cryptoList = {...this.cryptoList, [`${cryptoFeed.FROMSYMBOL}-${cryptoFeed.TOSYMBOL}`]: cryptoFeed};
      }
      if(!cryptoFeed.PRICE) {
        console.log('empty: ==>',  cryptoFeed.PRICE);
      }else{
        console.log('not-empty: ==>',  cryptoFeed);
      }
    })
  }

  // Unsubscribe from all subscribables on destroying the component.
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
