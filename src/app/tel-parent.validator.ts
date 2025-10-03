import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function telParentValidator(uService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }

    return uService.checkTelParent(control.value).pipe(
      map(response => {
        return response.isTel ? null : { telNotFound: true };
      }),
      catchError(() => of({ telNotFound: true })) 
    );
  };
}
