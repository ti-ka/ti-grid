import { ModalButton } from './modal-button';
import { Uuid } from '../core/Uuid';

export class Modal {
    id: string;
    title: string;
    selector: string;
    data: object = {};
    docked = false;
    width = 1600;
    styles = '';
    componentClass = '';
    animation = 'slideInRight';
    showTitle = true;
    showTitleButtons = true;
    onEscape: 'dock' | 'close' | 'wait';
    buttons: ModalButton[] = [];
    private exitDelayForAnimation = 300;
    private static _modals: Modal[] = [];

    constructor() {
        this.id = this.id || Uuid.generate();
        Modal.checkIfSetupIsOk();
    }

    private static checkIfSetupIsOk() {
        if (document.querySelector('ng-modals') === null) {
            console.warn('Please add <ng-modals></ng-modals> in your app root.');
        }
    }

    public static create(modal: Modal | object | string): Modal {

        if (modal instanceof Modal) {
            return modal;
        }

        if (typeof modal === 'string') {
            return Object.assign(new Modal(), { selector: modal, title: modal });
        } else {
            return Object.assign(new Modal(), modal);
        }
    }

    public present(): Modal {
        Modal._modals.push(this);
        return this;
    }

    addButton(btn: ModalButton) {
        btn.modal = this;
        this.buttons.push(btn);
    }

    escape() {
        switch (this.onEscape) {
            case 'dock':
                this.dock(true);
                break;

            case 'close':
                this.close();
                break;

            default:
                break;
        }
    }

    dock(behaviour: boolean = true) {
        // Slide Right while exiting:
        this.animation = 'slideOutRight';

        // Re-set to appear from right.
        setTimeout(() => {
            this.animation = 'slideInRight';
            // To-Do: Investigate this behaviour
            // modal.docked = dock;
            if (behaviour) {
                document.querySelector('#projected-' + this.id).classList.add('no-display');
                document.querySelector('#docked-' + this.id).classList.remove('no-display');
            } else {
                document.querySelector('#docked-' + this.id).classList.add('no-display');
                document.querySelector('#projected-' + this.id).classList.remove('no-display');
            }
        }, this.exitDelayForAnimation);
    }

    close() {
        this.animation = 'slideOutRight';
        setTimeout(() => {
            this.exitImmediately();
        }, this.exitDelayForAnimation);
    }

    exitImmediately() {
        const index = Modal._modals.indexOf(this);
        Modal._modals.splice(index, 1);
    }

    public static get allModals(): Modal[] {
        return this._modals;
    }

    public static removeModal(modal: Modal) {
        const index = Modal._modals.indexOf(modal);
        modal.close();
    }

}

