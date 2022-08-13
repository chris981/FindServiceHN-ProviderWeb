import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-mask',
    templateUrl: './input-mask.component.html',
    styleUrls: ['./input-mask.component.scss']
})
export class InputMaskComponent implements OnInit {
    formMask: UntypedFormGroup;
    isbnMask1 = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/];
    isbnMask2 = [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/];
    isbnMask3 = [/\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '/', /\d/];
    phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    cardMask  = [ /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
    dateMask  = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    constructor(private fb: UntypedFormBuilder) { }

    ngOnInit() {
        this.formMask = this.fb.group({
            experience: [],
            phone: []
        });
    }
    submit() {
        console.log(this.formMask.value);
    }

}
