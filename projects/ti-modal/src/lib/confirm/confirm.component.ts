import { Component, OnInit } from '@angular/core';
import { Confirm } from './confirm';

@Component({
    selector: 'ng-plus-confirm',
    styleUrls: ['confirm.component.css', '../assets/animate.css'],
    template: `
      <div class='confirm animated border-color-{{model.style}}'>
        <div class="line-accent bg-{{model.style}} background-{{model.style}}"></div>
        <h4 class='title color-{{model.style}} text-{{model.style}}'>{{model.title}}</h4>
        <hr />
        <div class='content'>{{model.message}}</div>
        <button class='btn btn-{{model.style}}'
                *ngIf="model.confirmButton"
                (click)='model.onConfirmation(); model.closeWindow();'>
          {{ model.confirmButton }}
        </button>
        <button class='btn btn-default'
                *ngIf="model.cancelButton"
                (click)='model.onCancellation(); model.closeWindow();'>
          {{ model.cancelButton }}
        </button>
      </div>
    `
})

export class ConfirmComponent implements OnInit {

    model: Confirm;

    constructor() {
        this.model = new Confirm();
    }

    ngOnInit() {
    }
}
