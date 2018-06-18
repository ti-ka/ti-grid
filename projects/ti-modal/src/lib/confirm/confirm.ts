import { Modal } from '../modal/modal';

export class Confirm {

    title = 'Confirmation';
    message = 'Are you sure?';
    style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default' = 'danger';
    confirmButton = 'Yes';
    cancelButton = 'Cancel';
    protected presented = false;

    public static info(title: string, message: string, button: string, onClick: (confirm?: Confirm) => void): Confirm {
        return Confirm.prepare(title, message, button, onClick).setStyle('info');
    }

    public static error(title: string, message: string, button: string, onClick: (confirm?: Confirm) => void): Confirm {
        return Confirm.prepare(title, message, button, onClick).setStyle('danger');
    }

    public static danger(title: string, message: string, button: string, onClick: (confirm?: Confirm) => void): Confirm {
        return Confirm.prepare(title, message, button, onClick).setStyle('danger');
    }

    public static success(title: string, message: string, button: string, onClick: (confirm?: Confirm) => void): Confirm {
        return Confirm.prepare(title, message, button, onClick).setStyle('success');
    }

    public static warning(title: string, message: string, button: string, onClick: (confirm?: Confirm) => void): Confirm {
        return Confirm.prepare(title, message, button, onClick).setStyle('warning');
    }

    protected static prepare(title: string, message: string, button: string, onClick: (confirm?: Confirm) => void): Confirm {
        const confirm = new Confirm();
        confirm.title = title;
        confirm.message = message;
        confirm.confirmButton = button;
        confirm.onConfirmation = onClick;
        return confirm.present();
    }

    closeWindow: () => void = () => {};
    onConfirmation: () => void = () => {};
    onCancellation: ()  => void = () => {};

    public setStyle(style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default'): Confirm {
        this.style = style;
        return this;
    }

    public present() {
        if (this.presented) {
            return;
        }
        this.presented = true;
        const modal = new Modal();
        modal.showTitle = false;
        modal.selector = 'ng-plus-confirm';
        modal.styles = 'modal-alert';
        modal.animation = 'zoomIn border-none';
        modal.width = 400;
        modal.data = { model: this };
        modal.onEscape = 'wait';
        modal.present();

        this.closeWindow = () => {
            modal.exitImmediately();
        };
        return this;
    }
}
