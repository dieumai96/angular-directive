import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { FormsModule} from '@angular/forms';
import { FontFamilyDirective } from './font-family.directive';
import { FocusInputDirective } from './focus-input.directive';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { FuckComponent } from './fuck/fuck.component';
@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    FontFamilyDirective,
    FocusInputDirective,
    FuckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
