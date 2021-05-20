import { Pipe, PipeTransform } from '@angular/core';
import { CryptoListModel } from './models/crypto-list.model';
import { CryptoRowModel } from './models/crypto-row.model';

/**
 * Cryptofilter pipe to filter out by input text.
 * Exclusive search
 */
@Pipe({
  name: 'cryptoFilter'
})
export class CryptoFilterPipe implements PipeTransform {

  transform(cryptoList: CryptoListModel, filterText: string): CryptoListModel {
    if (!cryptoList) {
      return {};
    }
    if (!filterText) {
      return cryptoList;
    }

    const cryptoRows = Object.values(cryptoList).filter(cryptoRow => {
      return this.cryptoRowContainsFilterText(cryptoRow, filterText);
    });

    const filteredList = new CryptoListModel();
    cryptoRows.forEach(c => filteredList[`${c.FROMSYMBOL}-${c.TOSYMBOL}`] = c)
    
    return filteredList;
  }

  private cryptoRowContainsFilterText(cryptoRow: CryptoRowModel, filterText: string): boolean {
    filterText = filterText.toLocaleLowerCase();
    // Split the filter input text by empty space and "-" to resolve against different terms.
    const filterTerms = filterText.split(/[ ,-]/);

    for (const filterTerm of filterTerms) {
      if (!cryptoRow || !cryptoRow.FROMSYMBOL || !cryptoRow.TOSYMBOL) {
        return false;
      } else {
        // If crypto row's symbols contain all of the search terms we will filter them out.
        if(!this.stringContains(cryptoRow.FROMSYMBOL.toLocaleLowerCase(), filterTerm) &&
          !this.stringContains(cryptoRow.TOSYMBOL.toLocaleLowerCase(), filterTerm)) {
          return false;
        }
        
      }
    }

    return true;
  }

  private stringContains(initial: string , test: string): boolean{
    return initial.indexOf(test) > -1;
  }
}
