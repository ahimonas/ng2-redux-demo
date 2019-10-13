import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BasketService } from './services/basket.service';
import { AppComponent } from './app.component';
import {NgRedux, NgReduxModule } from 'ng2-redux';
import {IAppState, rootReducer, INITIAL_STATE} from './store';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    NgReduxModule
  ],
  providers: [BasketService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer, 
     INITIAL_STATE
    );
  }
}
