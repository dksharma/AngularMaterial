import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// To 'eager load' we use 'import' of a module - see imports array of ngModule.
// to 'lazy load' - use loadChildren, this is an example of Lazy loading of modules: Demo and Contactmanager
// the target of the loadChildren is the 'module path', a '#' and the 'module class name'.
// for example it loads demo module and we attach the class name 'DemoModule' after '#'

const routes: Routes = [
  {path: 'contactmanager', loadChildren:'./contactmanager/contactmanager.module#ContactmanagerModule'},
  {path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
  {path: '**', redirectTo: 'contactmanager'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],

  // To 'eager load' a module into this app-module, import it below.
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
