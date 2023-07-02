import { AbstractControl } from '@angular/forms';
export function PasswordValidators(control: AbstractControl) {
    const password: string = control.get('password')?.value; 
    const firstName: string = control.get("firstName")?.value; 
    const lastName: string = control.get("lastName")?.value; 

    if(password == undefined) {
        return null;
    } else if (password.length >=  8 && (password.includes(firstName) || password.includes(lastName))) { 
       console.log('error set')
       return control.get('password')?.setErrors({ securityMatch: true });  
    } else {
        return null;
    }
}