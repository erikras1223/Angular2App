import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({

    selector: 'prep-tab',
    templateUrl:  'app/experiments/the-tabs/prepSetupTab.component.html'
})
export class PrepSetupTab {
    entries = [];
    selectedEntry: { [key: string]: any } = {
        value: null,
        description: null
    };


    constructor(private router: Router) {
    }


    ngOnInit() {
        this.entries = [
            {
                description: 'entry 1',
                value: 1
            },
            {
                description: 'entry 2',
                value: 2
            },
            {
                description: 'entry 3',
                value: 3
            },
            {
                description: 'entry 4',
                value: 4
            }
        ];

        // select the first one
        if (this.entries) {
            this.onSelectionChange(this.entries[0]);
        }

    }
    onSelectionChange(entry) {
        // clone the object for immutability
        this.selectedEntry = Object.assign({}, this.selectedEntry, entry); // copying entry into selectedEntry
    }


    cancel() {
        this.router.navigate(['events'])
    }
}