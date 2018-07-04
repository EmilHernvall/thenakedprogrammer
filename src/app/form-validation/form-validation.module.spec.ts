import { FormValidationModule } from './form-validation.module';

describe('FormValidationModule', () => {
  let formValidationModule: FormValidationModule;

  beforeEach(() => {
    formValidationModule = new FormValidationModule();
  });

  it('should create an instance', () => {
    expect(formValidationModule).toBeTruthy();
  });
});
