import { ModalButton } from './modal-button';
import { Uuid } from '../core/Uuid';
import { Subject, Observable } from 'rxjs';

export class Modal {
    public static _modals: Modal[] = [];

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
    protected presented = false;

    private openSubject = new Subject<Modal>();
    private dockedSubject = new Subject<Modal>();
    private closedSubject = new Subject<Modal>();

    public get onOpen(): Observable<Modal> {
        return this.openSubject.asObservable();
    }
    public get onDock(): Observable<Modal> {
        return this.dockedSubject.asObservable();
    }
    public get onClose(): Observable<Modal> {
        return this.closedSubject.asObservable();
    }

    constructor() {
        this.id = this.id || Uuid.generate();
        Modal.checkIfSetupIsOk();
    }

    private static checkIfSetupIsOk() {
        if (document.querySelector('ng-plus-modals') === null) {
            console.warn('Please add <ng-plus-modals></ng-plus-modals> in your app root.');
        }
    }

    public static create(modal: Modal | object | string): Modal {

        if (modal instanceof Modal) {
            return modal.present();
        }

        if (typeof modal === 'string') {
            return Object.assign(new Modal(), { selector: modal, title: modal }).present();
        } else {
            return Object.assign(new Modal(), modal).present();
        }

    }

    public static closeModal(modal: Modal) {
        modal.close();
    }

    public static closeModalById(id: string) {
        const modal = Modal._modals.find(m => m.id === id);
        if (modal) {
            modal.close();
        }
    }

    public static closeOpenModals() {
        this._modals.filter(m => !m.docked).forEach(m => m.close());
    }

    public static closeParentModal(element?: Element | Event) {

        console.log(element);

        let projected: Element;
        if (element && element instanceof Element) {
            projected = element.closest('.projector');
        } else if (element && element instanceof Event && element.srcElement instanceof Element) {
            projected = element.srcElement.closest('.projector');
        }

        if (projected && projected.id) {
            Modal.closeModalById(projected.id);
        }
    }

    public present(): Modal {
        if (this.presented) {
            return this;
        }
        this.presented = true;
        this.openSubject.next(this);
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
                this.dockedSubject.next(this);
                break;

            case 'close':
                this.close();
                this.closedSubject.next(this);
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
            this.docked = behaviour;
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

}

