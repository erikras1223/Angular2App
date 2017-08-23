import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

//import { jqxTreeComponent } from 'jqwidgets-framework';
import { jqxDropDownListComponent } from '../../hci-assets/jqwidgets-ts/angular_jqxdropdownlist';

@NgModule({
    imports: [CommonModule],
    declarations: [jqxDropDownListComponent],
    exports: [jqxDropDownListComponent],
})
export class DropDownModule { }
