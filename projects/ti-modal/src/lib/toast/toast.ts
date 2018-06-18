import { Uuid } from '../core/Uuid';

export class Toast {

    public static _toasts: Toast[] = [];

    id: string;
    title: string;
    message: string;
    time = 10000;
    style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default' = 'default';
    animation = 'slideInRight';
    button: string;
    onClick: (toast?: Toast) => void;
    data: any;
    private exitDelayForAnimation = 300;
    protected presented = false;
    protected timeout;

    constructor() {
        this.id = this.id || Uuid.generate();
        Toast.checkIfSetupIsOk();
    }

    public present(): Toast {
        if (this.presented) {
            return;
        }
        this.presented = true;
        Toast._toasts.push(this);
        this.setTimeOutForAutoExit();
        return this;
    }

    public destroy() {
        this.animation = 'slideOutRight';
        const index = Toast._toasts.indexOf(this);
        if (index < 0) { return; }
        this.setAnimation(index, 'slideInUp', () => {
            Toast._toasts.splice(index, 1);
            this.setAnimation(index, '');
        });
    }

    public setStyle(style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default'): Toast {
      this.style = style;
      return this;
    }

    public setTime(time: number | null): Toast {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.time = time;
        this.setTimeOutForAutoExit();
        return this;
    }

    private setTimeOutForAutoExit() {
        if (this.time > 0) {
            this.timeout = setTimeout(() => {
                const index = Toast._toasts.indexOf(this);
                Toast._toasts.splice(index, 1);
            }, this.time);
        }
    }

    private setAnimation(index: number, animation: string, callback: () => void = () => {}) {
        setTimeout(() => {
            Toast._toasts
                .filter((v, i) => i > index)
                .forEach(toast => toast.animation = animation);
            callback();
        }, this.exitDelayForAnimation);
    }

    private static checkIfSetupIsOk() {
        if (document.querySelector('ng-plus-toasts') === null) {
            console.warn('Please add <ng-plus-toasts></ng-plus-toasts> in your app root.');
        }
    }

    public static create(toast: object): Toast {
        if (toast instanceof Toast) {
            return toast;
        }
        let newToast: Toast;
        newToast = Object.assign(new Toast(), toast);
        return newToast;
    }

    private static prepare(title: string, message: string, button?: string, onClick?: (toast?: Toast) => void): Toast {
        const toast = new Toast();
        toast.title = title;
        toast.message = message;
        toast.button = button;
        toast.onClick = onClick;
        toast.present();
        return toast;
    }

    public static info(title: string, message: string, button?: string, onClick?: (toast?: Toast) => void): Toast {
        return Toast.prepare(title, message, button, onClick).setStyle('info');
    }

    public static error(title: string, message: string, button?: string, onClick?: (toast?: Toast) => void): Toast {
        return Toast.prepare(title, message, button, onClick).setTime(0).setStyle('danger');
    }

    public static danger(title: string, message: string, button?: string, onClick?: (toast?: Toast) => void): Toast {
        return Toast.prepare(title, message, button, onClick).setTime(0).setStyle('danger');
    }

    public static success(title: string, message: string, button?: string, onClick?: (toast?: Toast) => void): Toast {
        return Toast.prepare(title, message, button, onClick).setStyle('success');
    }

    public static warning(title: string, message: string, button?: string, onClick?: (toast?: Toast) => void): Toast {
        return Toast.prepare(title, message, button, onClick).setStyle('warning');
    }

    public static removeToast(toast: Toast) {
        toast.destroy();
    }

    public  static removeToastById(id: string) {
        const toast = Toast._toasts.find(t => t.id === id);
        if (toast) {
            toast.destroy();
        }
    }

}


