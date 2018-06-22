import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as SignaturePad from 'signature_pad/dist/signature_pad';

@Component({
    selector: 'ng-signature-pad',
    templateUrl: 'signature-pad.component.html',
    styleUrls: ['signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit {
    @ViewChild('canvas') canvas;

    @Input() dataUrl: string;
    @Input() dataPoints: string;
    @Input() editable = true;
    @Input() clearButton = true;
    private pad: SignaturePad;

    @Output() signed = new EventEmitter<string>();


    constructor() {
    }

    ngOnInit() {
        this.initPad();
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    initPad() {
        console.log(this.canvas.nativeElement);
        this.pad = new SignaturePad.default(this.canvas.nativeElement);
        if (this.dataUrl) {
            this.pad.fromDataURL(this.dataUrl);
        }
        if (this.dataPoints) {
            this.pad.fromData(this.dataPoints);
        }
        if (this.editable) {
            this.pad.on();
        } else {
            this.pad.off();
        }

        this.pad.onEnd = () => this.emitPng();
    }

    emitPng() {
        const str = this.canvas.nativeElement.toDataURL();
        this.signed.emit(str);
    }

    clear() {
        this.pad.clear();
        this.emitPng();
    }

    private resize() {
        const canvas = this.canvas.nativeElement;
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
    }

}
