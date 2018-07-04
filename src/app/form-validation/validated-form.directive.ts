import { Directive, HostListener, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { ValidatedInputDirective } from './validated-input.directive';

@Directive({
  selector: 'form[tncValidatedForm]'
})
export class ValidatedFormDirective {

  @Output() formValid : EventEmitter<any> = new EventEmitter();
  @Output() formInvalid : EventEmitter<string[]> = new EventEmitter();

  @ContentChildren(ValidatedInputDirective, { descendants: true }) inputs : QueryList<ValidatedInputDirective>;

  constructor() { 
  }

  @HostListener('submit') onSubmit(e) {
    try {

      const allInputs = this.inputs.toArray();
      let formValid = true;
      let messages = [];
      for (let input of allInputs) {
        let { result, message } = input.validate(allInputs);
        if (!result) {
          formValid = false;
          messages.push(message);
        }
      }

      if (formValid) {
        this.formValid.emit();
      } else {
        this.formInvalid.emit(messages);
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  }

}
