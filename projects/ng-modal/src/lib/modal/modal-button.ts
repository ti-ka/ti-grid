import { Modal } from './modal';

export class ModalButton {
    public modal: Modal;
    public text: string;
    public style: string;
    public onClick: () => void;

    public static get done(): ModalButton {
        const button = new ModalButton();
        button.text = 'Done';
        button.style = 'primary';
        return button;
    }

    public static get cancel(): ModalButton {
        const button = new ModalButton();
        button.text = 'Cancel';
        button.style = 'default';
        button.onClick = () => {
            if (button.modal)
                button.modal.escape();
        };
        return button;
    }

}