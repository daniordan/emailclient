// CHECKED

import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter();

  constructor(private el: ElementRef) {}

  // This code snippet is written in TypeScript and it defines a method called ngOnInit. This method is typically used in Angular components to perform initialization tasks. In this case, the method appends a DOM element (this.el.nativeElement) to the document.body.
  // Use this approach in case of Modal Windows to avoid the issue with the body element being overwritten with some CSS stuff and not showing properly (check comps app and section in the course to refresh the Modal knowledge)
  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }

  // This code snippet is written in TypeScript and belongs to an Angular component. It defines the ngOnDestroy() lifecycle hook, which is called when the component is destroyed. Inside this hook, the code removes the native element from the DOM using the remove() method of the nativeElement property.
  // Use this approach in case of Modal Windows to avoid the issue with the body element being overwritten with some CSS stuff and not showing properly (check comps app and section in the course to refresh the Modal knowledge)
  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  // This code snippet defines a function called onDismissClick that emits an event called dismiss.
  // Use this approach in case of Modal Windows to avoid the issue with the body element being overwritten with some CSS stuff and not showing properly (check comps app and section in the course to refresh the Modal knowledge)
  onDismissClick() {
    this.dismiss.emit();
  }
}
