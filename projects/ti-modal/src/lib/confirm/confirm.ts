import { Modal } from '../modal/modal';

export class Confirm {

    title = 'Confirmation';
    message = 'Are you sure to do this?';
    style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default' = 'danger';
    confirmButton = 'Yes';
    cancelButton = 'Cancel';
    closeWindow: () => void = () => {
        // Fill after present:
    };
    onConfirmation: () => void = () => {
    };
    onCancellation: ()  => void = () => {
    };

    public setStyle(style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default'): Confirm {
        this.style = style;
        return this;
    }

    public static info(title: string, message: string, button?: string, onClick?: (confirm?: Confirm) => void) {
        return Confirm.prepare(title, message, button, onClick)
            .setStyle('info')
            .present();
    }

    public static error(title: string, message: string, button?: string, onClick?: (confirm?: Confirm) => void) {
        return Confirm.prepare(title, message, button, onClick)
            .setStyle('danger')
            .present();
    }

    public static danger(title: string, message: string, button?: string, onClick?: (confirm?: Confirm) => void) {
        return Confirm.prepare(title, message, button, onClick)
            .setStyle('danger')
            .present();
    }

    public static success(title: string, message: string, button?: string, onClick?: (confirm?: Confirm) => void) {
        return Confirm.prepare(title, message, button, onClick)
            .setStyle('success')
            .present();
    }

    public static warning(title: string, message: string, button?: string, onClick?: (confirm?: Confirm) => void) {
        return Confirm.prepare(title, message, button, onClick)
            .setStyle('warning')
            .present();
    }

    protected static prepare(title: string, message: string, button?: string, onClick?: (confirm?: Confirm) => void): Confirm {
        const confirm = new Confirm();
        confirm.title = title;
        confirm.message = message;
        confirm.confirmButton = button;
        confirm.onConfirmation = onClick;
        return confirm;
    }

    public present() {
        const modal = new Modal();
        modal.showTitle = false;
        modal.selector = 'ng-confirm';
        modal.styles = 'modal-alert';
        modal.animation = 'zoomIn border-none';
        modal.width = 400;
        modal.data = { model : this };
        modal.onEscape = 'wait';
        modal.present();

        this.closeWindow = () => {
            modal.exitImmediately();
        };

    }

}
