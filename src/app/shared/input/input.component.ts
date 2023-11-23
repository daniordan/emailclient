// CHECKED

//  Import Input to use it in the parent - child components communication
import { Component, OnInit, Input } from '@angular/core';
//  Import FormControl to use it to bound the Form from the parent component to the child component
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  //  use @Input decorator to make the label, control and inputType properties available between the parent and child components (parent - auth module/signup component, child - input.component.html); this is called data binding in Angular
  @Input() label: string = '';
  // @Input() control: AbstractControl<string | null, string | null> | null =
  //   new FormControl(); // new FormControl(''); // the way to initialize an object of a class
  @Input() control: FormControl = new FormControl();
  // @Input() control: AbstractControl<string | null, string | null> | null =
  //   new FormControl();
  @Input() inputType: string = '';
  @Input() controlType = 'input';

  constructor() {}

  ngOnInit() {}

  showErrors() {
    // destructure objects (pull off) from control object passed in from the parent component and save them in local variables
    // const { dirty, touched, errors } = this.control as AbstractControl<
    //   string | null,
    //   string | null
    //   >;
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
