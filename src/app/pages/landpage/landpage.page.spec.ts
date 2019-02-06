import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@shared/core.module';
import { SharedModule } from '@shared/shared.module';
import { LandpagePage } from './landpage.page';

describe('LandpageComponent', () => {
    let component: LandpagePage;
    let fixture: ComponentFixture<LandpagePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FlexLayoutModule,
                SharedModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
                ReactiveFormsModule,
                CoreModule
            ],
            declarations: [LandpagePage]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandpagePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
