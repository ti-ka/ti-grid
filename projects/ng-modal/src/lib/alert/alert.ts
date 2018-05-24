import { Confirm } from '../confirm/confirm';

export class Alert extends Confirm {
    title = 'Alert';
    message = '';
    style: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'default' = 'success';
    confirmButton: 'Okay';
    cancelButton: '';
}