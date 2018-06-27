import { Confirm } from '../confirm/confirm';

export class Alert extends Confirm {
    title = 'Alert';
    message = '';
    style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default' = 'success';
    confirmButton: string;
    cancelButton: '';

    public static info(title: string, message?: string, button?: string, onClick?: (confirm?: Confirm) => void): Alert {
        if (!message) {
            message = title;
            title = 'Information';
        }
        const alert = Confirm.prepare(title, message, button, onClick).setStyle('info') as Alert;
        alert.confirmButton = button || 'Okay';
        if (!alert.onConfirmation) {
            alert.onConfirmation = () => {};
        }
        alert.cancelButton = '';
        return alert.present();
    }

    public static error(title: string, message?: string, button?: string, onClick?: (confirm?: Confirm) => void): Alert {
        if (!message) {
            message = title;
            title = 'Error';
        }
        const alert = Confirm.prepare(title, message, button, onClick).setStyle('danger') as Alert;
        alert.confirmButton = button || 'Okay';
        if (!alert.onConfirmation) {
            alert.onConfirmation = () => {};
        }
        alert.cancelButton = '';
        return alert.present();
    }

    public static danger(title: string, message?: string, button?: string, onClick?: (confirm?: Confirm) => void): Alert {
        if (!message) {
            message = title;
            title = 'Danger';
        }
        const alert = Confirm.prepare(title, message, button, onClick).setStyle('danger') as Alert;
        alert.confirmButton = button || 'Okay';
        if (!alert.onConfirmation) {
            alert.onConfirmation = () => {};
        }
        alert.cancelButton = '';
        return alert.present();
    }

    public static success(title: string, message?: string, button?: string, onClick?: (confirm?: Confirm) => void): Alert {
        if (!message) {
            message = title;
            title = 'Success';
        }
        const alert = Confirm.prepare(title, message, button, onClick).setStyle('success') as Alert;
        alert.confirmButton = button || 'Okay';
        if (!alert.onConfirmation) {
            alert.onConfirmation = () => {};
        }
        alert.cancelButton = '';
        return alert.present();
    }

    public static warning(title: string, message?: string, button?: string, onClick?: (confirm?: Confirm) => void): Alert {
        if (!message) {
            message = title;
            title = 'Warning';
        }
        const alert = Confirm.prepare(title, message, button, onClick).setStyle('warning') as Alert;
        alert.confirmButton = button || 'Okay';
        if (!alert.onConfirmation) {
            alert.onConfirmation = () => {};
        }
        alert.cancelButton = '';
        return alert.present();
    }

}
