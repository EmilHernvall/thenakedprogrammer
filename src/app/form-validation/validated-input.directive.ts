import { Directive, ElementRef } from '@angular/core';

interface ValidationResult {
  name: string;
  placeholder: string;
  result: boolean;
  message: string;
}

@Directive({
  selector: 'input[tncValidatedInput]'
})
export class ValidatedInputDirective {

  public name : string;
  public placeholder : string;
  public type : string;
  public minLength : number;

  constructor(private elementRef : ElementRef) { 
    this.name = elementRef.nativeElement.getAttribute("name");
    this.placeholder = elementRef.nativeElement.getAttribute("placeholder");
    this.type = elementRef.nativeElement.getAttribute("type");
    this.minLength = +elementRef.nativeElement.getAttribute("minLength") || 0;
  }

  validate(allInputs: ValidatedInputDirective[]) : ValidationResult {
    if (this.type == "email") {
      return { 
        name: this.name,
        placeholder: this.placeholder,
        result: !!this.elementRef.nativeElement.value.match(/^[^@]+@.+$/),
        message: "Invalid e-mail address"
      };
    } else if (this.type == "zipcode") {
      return {
        name: this.name,
        placeholder: this.placeholder,
        result: !!this.elementRef.nativeElement.value.match(/^\d{3} ?\d{2}$/),
        message: "Invalid zip code"
      };
    } else if (this.type == "password" && this.elementRef.nativeElement.hasAttribute("tncPasswordField")) {
      let passwordFieldName = this.elementRef.nativeElement.getAttribute("tncPasswordField");
      let passwordField = allInputs.filter(x => x.name == passwordFieldName).pop();
      if (passwordField && passwordField.elementRef.nativeElement.value != this.elementRef.nativeElement.value) {
        return {
          name: this.name,
          placeholder: this.placeholder,
          result: false,
          message: "Passwords do not match"
        };
      }
    }

    if (this.minLength !== 0 && this.elementRef.nativeElement.value.length < this.minLength) {
      return {
        name: this.name,
        placeholder: this.placeholder,
        result: false,
        message: this.placeholder + " should be at least " + this.minLength + " characters"
      };
    }

    return {
      name: this.name,
      placeholder: this.placeholder,
      result: true,
      message: null
    };
  }
}
