import { Injectable, OnDestroy } from '@angular/core';
import {
  webSocket
} from 'rxjs/webSocket';
import {
  of, Subject 
} from 'rxjs';
import {
  concatMap,
  delay,
  takeUntil
} from 'rxjs/operators';
import { Config }  from './config';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {

  // Use takeUntil pipe with subject that gets completed on destroy.
  destroy$: Subject<boolean> = new Subject<boolean>();

  // The websocket's url to be built with config data.
  url = `${Config.cryptoCompareWSURL}/v2?api_key=${Config.privateKey}`
  subject = webSocket(this.url);

  constructor() {
    // Based on official Cryptocompare's documentation.
    const subRequest = {
      "action": "SubAdd",
      "subs": this.buildSubsList(Config.cryptoList, Config.currencyList)
    };
    this.subject.pipe(
      takeUntil(this.destroy$),
        concatMap(item => of (item).pipe(
          delay(1000)))
      ).subscribe();
    this.subject.next(subRequest);
  }

  public getCryptoFeed() {
    return this.subject;
  }

  // Generate crypto to currency pairs based on config data.
  private buildSubsList(cryptoList:string[], currencyList:string[]) {
    const subs: string[] = [];

    for (let i = 0; i < cryptoList.length; i++) {
      const currentCrypto = cryptoList[i];

      for (let j = 0; j < currencyList.length; j++) {
        const currentCurrency = currencyList[j];
        subs.push(this.cryptoToCurrencyBuilder(currentCrypto, currentCurrency))    
      }
    }
   
    return subs;
  }

  private cryptoToCurrencyBuilder(crypto: string, currency: string) {
    return `5~CCCAGG~${crypto}~${currency}`
  }

  // Unsubscribe from all subscribables on destroying the service.
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}

