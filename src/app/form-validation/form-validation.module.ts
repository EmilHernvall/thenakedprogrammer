import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatedFormDirective } from './validated-form.directive';
import { ValidatedInputDirective } from './validated-input.directive';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [ValidatedFormDirective, ValidatedInputDirective],
  exports: [ ValidatedFormDirective, ValidatedInputDirective ]
})
export class FormValidationModule { }
