import { Component } from '@angular/core';
import { NgRedux, select, DevToolsExtension } from 'ng2-redux';
import { IAppState, rootReducer } from './store';
import { CALCULATE, FETCH } from './actions';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Baskets!';
  @select() baskets;
  @select() init;

  constructor(private ngRedux: NgRedux<IAppState>, private _basketService: BasketService) {
    this._basketService.getBaskets().subscribe(
      basketData => {
        this.ngRedux.dispatch({ type: FETCH, init: basketData });
      });
  }

  calculate() {
    this.ngRedux.dispatch({ type: CALCULATE });
  }

}

