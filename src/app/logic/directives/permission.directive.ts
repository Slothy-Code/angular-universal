import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '@logic/store';
import {map} from 'rxjs/operators';
import {PermissionsUtil} from '@logic/utils/permissions.util';
import {Subscription} from 'rxjs';


@Directive({
    selector: '[hasPermission]'
})
export class PermissionDirective implements OnInit, OnDestroy {
    private permission: string;
    private subscription$: Subscription;

    constructor(
        private store: Store<{}>,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
    ) {
    }

    @Input() set hasPermission(permission: string) {
        this.permission = permission;
    }

    ngOnInit() {
        this.subscription$ = this.store.pipe(select(getCurrentUser), map(x => x.permissions)).subscribe(
            (permissions: string[]) => {
                if (PermissionsUtil.canAccess(permissions, this.permission)) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

}
