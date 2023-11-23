// CHECKED

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//  import ReactiveFormsModule to useReactive Forms from the parent component
import { ReactiveFormsModule } from '@angular/forms';
//  import InputComponent to be able to use it in other modules
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [InputComponent, ModalComponent],
  //  import ReactiveFormsModule to useReactive Forms from the parent component
  imports: [CommonModule, ReactiveFormsModule],
  // we need to export this module so that the InputComponent can be used in other modules
  exports: [InputComponent, ModalComponent],
})
export class SharedModule {}
