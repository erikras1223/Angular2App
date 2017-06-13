import {Component,  EventEmitter, Input, Output} from '@angular/core';

export interface Dialog {
  close: EventEmitter<any>;
}

@Component({
    selector: 'dlg',
    template: `
    <div class="dialog">
        <header><div class="title">{{title}}</div><div class="exit-button" (click)="onClickedExit()">x</div></header>
        <ng-content></ng-content>
    </div>
    `,
    styles: [`
        .dialog {
            width: 250px;
            position: absolute;
            border: 1px solid black;
            border-radius: 5px;
            overflow: hidden;
            position: fixed;
            left: calc(50% - 125px);
            top: 100px;
        }
        .dialog p {
            text-align: center;
        }
        .dialog header {
            border-bottom: 1px solid black;
            font-size: 12px;
            padding: 5px;
            display: flex;
        }
        .dialog header .title {
            flex-grow: 1;
            cursor: default;
        }
        .dialog header .exit-button {
            cursor: pointer;
            padding: 0 5px;
        }
    `]
})
export class DialogComponent {
    @Input() title: string = 'Dialog box'
    @Output() close: EventEmitter<any> = new EventEmitter<any>();

    onClickedExit() {
         console.log("I am the dialog")
        this.close.emit();
    }
}