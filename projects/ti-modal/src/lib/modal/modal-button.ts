import { Modal } from './modal';

export class ModalButton {
    public modal?: Modal;
    public text?: string;
    public style?: string;
    public onClick?: () => void;
}
