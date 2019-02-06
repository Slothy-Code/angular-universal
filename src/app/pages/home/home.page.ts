import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/internal/operators';
import {QuoteService} from '@logic/services/quote/quote.service';

@Component({
    selector: 'page-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {
    quote: string;
    isLoading: boolean;

    constructor(private quoteService: QuoteService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.quoteService
            .getRandomQuote({ category: 'dev' })
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe((quote: string) => {
                this.quote = quote;
            });
    }

}
