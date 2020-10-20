import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements AfterViewInit {

    // allows for loading with any symbol
  @Input() symbol: string = 'NASDAQ:AAPL';
  settings: any = {};
  // id for being able to check for errors using postMessage
  widgetId: string = '';

  // wanted to be able to hide the widget if the symbol passed in was invalid (don't love their sad cloud face)
  @ViewChild( 'containerDiv', { static: false } ) containerDiv: ElementRef;

  ngAfterViewInit() {
    // need to do this in AfterViewInit because of the Input
    setTimeout( () => {
      this.widgetId = `${ this.symbol }_fundamnetals`;

      // postMessage listener for handling errors
      if ( window.addEventListener ) {
        window.addEventListener( 'message', ( e: any ) => {
            if ( e && e.data ) {
              console.log( e );
              const payload = e.data;
              // if the frameElementId is from this component, the symbol was no good and we should hide the widget
              if ( payload.name === 'tv-widget-no-data' && payload.frameElementId === this.widgetId ) {
                this.containerDiv.nativeElement.style.display = 'none';
              }
            }
          },
          false,
        );
      }
      this.settings = {
        symbol: this.symbol,
        colorTheme: 'light',
        isTransparent: false,
        largeChartUrl: '',
        displayMode: 'regular',
        height: 300,
        width: 500,
        autosize: true,
        locale: 'en',
      };
      const script = document.createElement( 'script' );
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
      script.async = true;
      script.id = this.widgetId;
      script.innerHTML = JSON.stringify( this.settings );
      this.containerDiv.nativeElement.appendChild( script );
      const brandingDiv = document.createElement( 'div' );
      brandingDiv.innerHTML = `
    <div class="tradingview-widget-copyright">
    <a href="https://www.tradingview.com/symbols/${ this.symbol }/" rel="noopener" target="_blank">
    <span class="blue-text">${ this.symbol } Fundamental Data</span></a>
              by TradingView
          </div>
`;

    } );
  }

}
