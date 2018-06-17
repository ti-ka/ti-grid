import { Component } from '@angular/core';
import { Modal } from './modal';

@Component({
    selector: 'ng-modals',
    templateUrl: 'modals.component.html',
    styleUrls: ['modals.component.css', '../assets/animate.css']
})
export class ModalsComponent {

    get modals(): Modal[] {
        return Modal._modals || [];
    }

    get isProjectorOn(): boolean {
        return this.modals.filter(m => !m.docked).length > 0;
    }

    backgroundClicked(event, modal: Modal) {
        if (event.target.className.indexOf('projector-screen') >= 0) {
            modal.escape();
        }
    }

}
