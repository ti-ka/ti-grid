import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'dynamic-content',
    template: `
        <ng-container #container></ng-container>
    `
})

export class DynamicContentComponent implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    @Input() selector: string;
    @Input() componentClass: string;
    @Input() data: object = {};
//    @Input() module: string;

    constructor(protected resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {


        const factories = Array.from(this.resolver['_factories'].values()) as any[];
        const component = factories.find(factory => factory.selector === this.selector);

        if (component) {
            this.container.clear();
            const activatedComponent = this.container.createComponent(component);

            if (this.componentClass && activatedComponent && activatedComponent.location && activatedComponent.location.nativeElement) {
                activatedComponent.location.nativeElement.classList.add(this.componentClass)
            }

            // Assign the injected data to the instance:
            Object.assign(activatedComponent.instance, this.data);

        } else {
            console.log(this.resolver);
            console.error(`The component selector ${this.selector} could not be found in the factory. 
            Please add them to routes if they are not public.`)
        }

    }
/*
    getFactoryResolver() {
        if (!this.module) {
            return this.resolver;
        }

        const resolver: any = this.resolver;
        const providers: any = Array.from(resolver._ngModule._providers)
        
        const module = providers.find(x => 
            x && 
            x.__proto__ &&
            x.__proto__.constructor && 
            x.__proto__.constructor.name &&
            x.__proto__.constructor.name == this.module
        );
        

    }
*/

}
