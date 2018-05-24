import { Component, OnInit} from '@angular/core';
import { Toast } from './toast';

@Component({
    selector: 'ng-toasts',
    template: `
        <div id="toasts">
            <div class="toast animated border-color-{{toast.style}} {{toast.animation}}" *ngFor="let toast of toasts">
              <div class="line-accent bg-{{toast.style}} background-{{toast.style}}"></div>
                <div class="dismiss text-light-gray" (click)="toast.destroy()"><i class="fal fa-times"></i></div>
                <div class="title color-{{toast.style}} text-{{toast.style}}" *ngIf="toast.title">{{toast.title}}</div>
                <div class="content" *ngIf="toast.message">{{toast.message}}</div>
                <button class="btn btn-{{toast.style}}"
                        *ngIf="toast.button && toast.onClick"
                        (click)="toast.destroy(); toast.onClick(toast)">{{toast.button}}
                </button>
            </div>
        </div>
    `,
    styleUrls: ['toasts.component.css', '../assets/animate.css']
})

export class ToastsComponent implements OnInit {

    ngOnInit() {
    }

    get toasts(): Toast[] {
        return Toast.allToasts;
    }

}

