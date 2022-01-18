import { Component, Directive, QueryList, Type, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxComparisonTableModule } from '../comparison-table.module';
import { NxToggleSectionDirective } from './toggle-section.directive';

@Directive()
abstract class ToggleSectionTest {
    @ViewChildren(NxToggleSectionDirective) toggleSectionInstances!: QueryList<NxToggleSectionDirective>;
    @ViewChildren(NxComparisonTableRowDirective) rowInstances!: QueryList<NxComparisonTableRowDirective>;

    expandSecondSection = false;
}

describe('ToggleSectionHeaderComponent', () => {
    let fixture: ComponentFixture<ToggleSectionTest>;
    let testInstance: ToggleSectionTest;
    let toggleSectionInstances: QueryList<NxToggleSectionDirective>;
    let rowInstances: QueryList<NxComparisonTableRowDirective>;

    function createTestComponent(component: Type<ToggleSectionTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        toggleSectionInstances = (testInstance as ToggleSectionTest).toggleSectionInstances;
        rowInstances = (testInstance as ToggleSectionTest).rowInstances;
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NxComparisonTableModule, BrowserAnimationsModule],
                declarations: [BasicComponent],
            });
            TestBed.compileComponents();
        }),
    );

    describe('basic', () => {
        it('sets numberOfRows correctly', () => {
            createTestComponent(BasicComponent);
            expect(toggleSectionInstances.toArray()[0]._numberOfRows()).toBe(1);
            expect(toggleSectionInstances.toArray()[1]._numberOfRows()).toBe(2);
        });

        it('sets _isPartOfToggleSection correctly', () => {
            createTestComponent(BasicComponent);
            expect(rowInstances.toArray()[0]._isPartOfToggleSection()).toBe(false); // header row

            expect(rowInstances.toArray()[1]._isPartOfToggleSection()).toBe(true); // first toggle section

            expect(rowInstances.toArray()[2]._isPartOfToggleSection()).toBe(true); // second toggle section
            expect(rowInstances.toArray()[3]._isPartOfToggleSection()).toBe(true); // second toggle section

            expect(rowInstances.toArray()[4]._isPartOfToggleSection()).toBe(false); // content row without toggle section
            expect(rowInstances.toArray()[5]._isPartOfToggleSection()).toBe(false); // footer row
        });
    });

    describe('expand / collapse', () => {
        it('expands toggle sections by default', () => {
            createTestComponent(BasicComponent);
            expect(toggleSectionInstances.toArray()[0].isExpanded).toBe(true);
            expect(toggleSectionInstances.toArray()[0].getOpenState()).toBe('open');
        });

        it('toggles toggle section on input change', () => {
            createTestComponent(BasicComponent);
            const secondToggleSection = toggleSectionInstances.toArray()[1];
            expect(secondToggleSection.isExpanded).toBe(false);
            expect(secondToggleSection.getOpenState()).toBe('closed');

            testInstance.expandSecondSection = true;
            fixture.detectChanges();

            expect(secondToggleSection.isExpanded).toBe(true);
            expect(secondToggleSection.getOpenState()).toBe('open');
        });
    });
});

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableToggleSection>
                <nx-comparison-table-toggle-section-header>Toggle section header</nx-comparison-table-toggle-section-header>
                <ng-container nxComparisonTableRow>
                    <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                </ng-container>
            </ng-container>
            <ng-container nxComparisonTableToggleSection [isExpanded]="expandSecondSection">
                <nx-comparison-table-toggle-section-header [id]="headerId">Second toggle section header</nx-comparison-table-toggle-section-header>
                <ng-container nxComparisonTableRow>
                    <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                </ng-container>
                <ng-container nxComparisonTableRow>
                    <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                </ng-container>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class BasicComponent extends ToggleSectionTest {}
