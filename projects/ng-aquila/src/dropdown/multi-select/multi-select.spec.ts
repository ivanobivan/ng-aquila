import { DOWN_ARROW, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentHarness, HarnessLoader, LocatorFactory, parallel, TestElement } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxFormfieldComponent, NxFormfieldModule } from '@aposin/ng-aquila/formfield';

import { NxDropdownModule } from '../dropdown.module';
import { NxMultiSelectComponent } from './multi-select.component';
import { MultiSelectOptionHarness } from './multi-select-option.spec';

class MultiSelectHarness extends ComponentHarness {
    static hostSelector = 'nx-multi-select';

    private documentRootLocator: LocatorFactory = this.documentRootLocatorFactory();

    getValue = this.locatorFor('.value');

    getPanel = this.documentRootLocator.locatorForOptional('.panel');

    getBackdrop = this.documentRootLocator.locatorFor('.cdk-overlay-backdrop');

    getOptions = this.documentRootLocator.locatorForAll(MultiSelectOptionHarness);

    getSelectAllButton = this.documentRootLocator.locatorForOptional('.actions input[type="checkbox"]');

    getClearAllButton = this.documentRootLocator.locatorForOptional('.actions button');

    getFilter = this.documentRootLocator.locatorForOptional('.filter input');

    getPanelHeader = this.documentRootLocator.locatorForOptional('.panel-header');

    getClearFilterButton = this.documentRootLocator.locatorFor('.filter .clear');

    async clickOptions(indexes: number[]) {
        const options = await this.getOptions();
        for (const i of indexes) {
            await options[i].click();
        }
    }

    async getValueText() {
        const label = await this.getValue();
        return label.text();
    }

    async setFilter(query: string) {
        const filter = await this.getFilter();
        await filter?.setInputValue(query);
        await filter?.dispatchEvent('input');
    }

    async clickClearFilter() {
        const button = await this.getClearFilterButton();
        await button.click();
    }

    async clickSelectAll() {
        const button = await this.getSelectAllButton();
        await button?.click();
    }

    async clickClearAll() {
        const button = await this.getClearAllButton();
        await button?.click();
    }

    async click() {
        const trigger = await this.getValue();
        trigger.click();
    }

    async clickOption(index: number) {
        const options = await this.getOptions();
        await options[index].click();
    }

    async isOpen() {
        const panel = await this.getPanel();
        return panel !== null;
    }

    async clickBackdrop() {
        const backdrop = await this.getBackdrop();
        await backdrop?.click();
    }

    async closeWithEsc() {
        document.body.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ESCAPE }));
        await this.forceStabilize();
    }

    async pressKey(key: string, keyCode?: number) {
        const isOpen = await this.isOpen();
        if (isOpen) {
            const panel = await this.getPanel();
            panel?.dispatchEvent('keydown', { key, keyCode });
        } else {
            const value = await this.getValue();
            value.dispatchEvent('keydown', { key, keyCode });
        }
    }
}

describe('NxMultiSelectComponent', () => {
    let fixture: ComponentFixture<DropdownTest>;
    let testInstance: DropdownTest;
    let multiSelectInstance: NxMultiSelectComponent<string, string>;
    let loader: HarnessLoader;
    let multiSelectHarness: MultiSelectHarness;

    async function configureTestingModule() {
        return TestBed.configureTestingModule({
            imports: [CommonModule, OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
            declarations: [BasicMultiSelectComponent, ComplexMultiSelectComponent],
        }).compileComponents();
    }

    async function createTestComponent(component: Type<DropdownTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        multiSelectInstance = testInstance.multiSelect;
        loader = TestbedHarnessEnvironment.loader(fixture);
        multiSelectHarness = await loader.getHarness(MultiSelectHarness);
    }

    beforeEach(async () => {
        await configureTestingModule();
    });

    describe('basic', () => {
        beforeEach(async () => {
            await createTestComponent(BasicMultiSelectComponent);
        });

        it('has an empty label', async () => {
            const label = await multiSelectHarness.getValue();
            expect(await label.text()).toBe('');
        });

        it('is closed', async () => {
            expect(await multiSelectHarness.isOpen()).toBe(false);
        });

        it('has the aria attributes', async () => {
            const value = await multiSelectHarness.getValue();

            const [role, id, ariaControls, ariaHaspopup, ariaExpanded, ariaLabelledBy] = await parallel(() => [
                value.getAttribute('role'),
                value.getAttribute('id'),
                value.getAttribute('aria-controls'),
                value.getAttribute('aria-haspopup'),
                value.getAttribute('aria-expanded'),
                value.getAttribute('aria-labelledby'),
            ]);

            expect(role).toBe('combobox');
            expect(id).toMatch(/^nx-multi-select-\d+$/);
            expect(ariaControls).toBe(`${multiSelectInstance.id}-combobox`);
            expect(ariaHaspopup).toBe('listbox');
            expect(ariaExpanded).toBe('false');
            expect(ariaLabelledBy).toBe(`${multiSelectInstance.id} ${testInstance.formField.labelId}`);
        });

        describe('when clicking the multi select', () => {
            beforeEach(async () => {
                await multiSelectHarness.click();
            });

            it('opens the panel', async () => {
                expect(await multiSelectHarness.isOpen()).toBe(true);
            });

            describe('and clicking the backdrop', () => {
                beforeEach(async () => {
                    await multiSelectHarness.clickBackdrop();
                });

                it('closes the panel', async () => {
                    expect(await multiSelectHarness.isOpen()).toBe(false);
                });
            });
        });

        describe('when open', () => {
            beforeEach(async () => {
                await multiSelectHarness.click();
            });

            it('focuses the filter', fakeAsync(async () => {
                flush();
                const filter = await multiSelectHarness.getFilter();
                expect(await filter?.isFocused()).toBe(true);
            }));

            describe('when focusing another element in the panel', () => {
                beforeEach(async () => {
                    const panel = await multiSelectHarness.getPanel();
                    await panel?.focus();
                });

                it('focuses the filter', fakeAsync(async () => {
                    const filter = await multiSelectHarness.getFilter();
                    expect(await filter?.isFocused()).toBe(true);
                }));
            });

            it('shows all options', async () => {
                const options = await multiSelectHarness.getOptions();
                expect(options.length).toBe(4);

                for (const [i, option] of testInstance.options.entries()) {
                    expect(await options[i].getLabelText()).toBe(option);
                }
            });

            it('has no selected option', async () => {
                const options = await multiSelectHarness.getOptions();
                for (const option of options) {
                    expect(await option.isSelected()).toBe(false);
                }
            });

            it('has no disabled option', async () => {
                const options = await multiSelectHarness.getOptions();
                for (const option of options) {
                    expect(await option.isDisabled()).toBe(false);
                }
            });

            it('has the aria attributes', async () => {
                const label = await multiSelectHarness.getValue();
                const ariaExpanded = await label.getAttribute('aria-expanded');

                expect(ariaExpanded).toBe('true');
            });

            it('has the aria attributes on the panel', async () => {
                const panel = (await multiSelectHarness.getPanel()) as TestElement;
                const [role, ariaOwns, ariaExpanded, ariaLabelledBy] = await parallel(() => [
                    panel.getAttribute('role'),
                    panel.getAttribute('aria-owns'),
                    panel.getAttribute('aria-expanded'),
                    panel.getAttribute('aria-labelledby'),
                ]);

                expect(role).toBe('combobox');
                expect(ariaOwns).toBe(`${multiSelectInstance.id}-combobox`);
                expect(ariaExpanded).toBe('true');
                expect(ariaLabelledBy).toBe(`${multiSelectInstance.id} ${testInstance.formField.labelId}`);
            });
        });

        describe('when selecting options', () => {
            beforeEach(async () => {
                await multiSelectHarness.click();
                await multiSelectHarness.clickOptions([3, 0]);
            });

            it('has checked the options', async () => {
                const options = await multiSelectHarness.getOptions();
                expect(await options[0].isSelected()).toBe(true);
                expect(await options[3].isSelected()).toBe(true);
            });

            it('shows the value in the label', async () => {
                expect(await multiSelectHarness.getValueText()).toBe('BMW, Mini(2)');
            });

            it('updates the model', () => {
                expect(testInstance.model).toEqual(['BMW', 'Mini']);
            });

            describe('and using "clear" button', () => {
                beforeEach(async () => {
                    await multiSelectHarness.clickClearAll();
                });

                it('has no selected options', async () => {
                    const options = await multiSelectHarness.getOptions();
                    expect(await options[0].isSelected()).toBe(false);
                    expect(await options[3].isSelected()).toBe(false);
                });

                it('has an empty label', async () => {
                    expect(await multiSelectHarness.getValueText()).toBe('');
                });

                it('has no selected options', async () => {
                    expect(testInstance.model).toEqual([]);
                });
            });

            describe('when using "select all"', () => {
                beforeEach(async () => {
                    await multiSelectHarness.clickSelectAll();
                });

                it('has selected all options', async () => {
                    const options = await multiSelectHarness.getOptions();
                    for (const option of options) {
                        expect(await option.isSelected()).toBe(true);
                    }
                });

                it('shows the value in the trigger', async () => {
                    expect(await multiSelectHarness.getValueText()).toBe('BMW, Audi, Volvo, Mini(4)');
                });

                it('updates the model', async () => {
                    expect(testInstance.model).toEqual(['BMW', 'Audi', 'Volvo', 'Mini']);
                });

                describe('and deselecting all', () => {
                    beforeEach(async () => {
                        await multiSelectHarness.clickSelectAll();
                    });

                    it('has no selected options', async () => {
                        const options = await multiSelectHarness.getOptions();
                        for (const option of options) {
                            expect(await option.isSelected()).toBe(false);
                        }
                    });

                    it('shows the value in the trigger', async () => {
                        expect(await multiSelectHarness.getValueText()).toBe('');
                    });

                    it('updates the model', async () => {
                        expect(testInstance.model).toEqual([]);
                    });
                });
            });
        });

        describe('when opening using the keyboard', () => {
            describe('and opening using SPACE', () => {
                beforeEach(async () => {
                    await multiSelectHarness.pressKey('Enter');
                });

                it('is open', async () => {
                    expect(await multiSelectHarness.isOpen()).toBe(true);
                });
            });

            describe('and opening using ENTER', () => {
                beforeEach(async () => {
                    await multiSelectHarness.pressKey(' ');
                });

                it('is open', async () => {
                    expect(await multiSelectHarness.isOpen()).toBe(true);
                });

                describe('and closing using ESC', () => {
                    beforeEach(async () => {
                        await multiSelectHarness.closeWithEsc();
                    });

                    it('is closed', async () => {
                        expect(await multiSelectHarness.isOpen()).toBe(false);
                    });
                });

                describe('and tabing out', () => {
                    beforeEach(async () => {
                        await multiSelectHarness.pressKey('Tab', TAB);
                    });

                    it('is closed', async () => {
                        expect(await multiSelectHarness.isOpen()).toBe(false);
                    });
                });
            });
        });

        describe('when navigating using keyboard', () => {
            beforeEach(async () => {
                await multiSelectHarness.click();
            });

            describe('and navigate to next option', () => {
                beforeEach(async () => {
                    await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
                });

                it('sets the first option active', async () => {
                    const options = await multiSelectHarness.getOptions();
                    expect(await options[0].isActive()).toBe(true);
                });

                it('sets the aria activedecenant', async () => {
                    const panel = (await multiSelectHarness.getPanel()) as TestElement;
                    const options = await multiSelectHarness.getOptions();
                    const ariaActivedescendant = await panel.getAttribute('aria-activedescendant');
                    const expectedId = await options[0].getId();

                    expect(ariaActivedescendant).toBe(expectedId);
                });

                describe('and navigate to the next option', () => {
                    beforeEach(async () => {
                        await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
                    });

                    it('sets the second option active', async () => {
                        const options = await multiSelectHarness.getOptions();
                        expect(await options[1].isActive()).toBe(true);
                    });

                    it('sets the aria activedecenant', async () => {
                        const panel = (await multiSelectHarness.getPanel()) as TestElement;
                        const options = await multiSelectHarness.getOptions();
                        const ariaActivedescendant = await panel.getAttribute('aria-activedescendant');
                        const expectedId = await options[1].getId();

                        expect(ariaActivedescendant).toBe(expectedId);
                    });

                    describe('navigate to previous option', () => {
                        beforeEach(async () => {
                            await multiSelectHarness.pressKey('ArrowUp', UP_ARROW);
                        });

                        it('sets the first option active', async () => {
                            const options = await multiSelectHarness.getOptions();
                            expect(await options[0].isActive()).toBe(true);
                        });
                    });
                });
            });

            describe('selecting using keyboard', () => {
                beforeEach(async () => {
                    await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
                    await multiSelectHarness.pressKey(' ');
                });

                it('selects the first option', async () => {
                    const options = await multiSelectHarness.getOptions();
                    expect(await options[0].isSelected()).toBe(true);
                });

                describe('and deselecting', () => {
                    beforeEach(async () => {
                        await multiSelectHarness.pressKey('Enter');
                    });

                    it('deselects the first option', async () => {
                        const options = await multiSelectHarness.getOptions();
                        expect(await options[0].isSelected()).toBe(false);
                    });
                });
            });

            describe('filtering the options', () => {
                beforeEach(async () => {
                    await multiSelectHarness.setFilter('i');
                });

                it('shows only matching options', async () => {
                    const options = await multiSelectHarness.getOptions();
                    expect(options.length).toBe(2);
                    expect(await options[0].getLabelText()).toBe('Audi');
                    expect(await options[1].getLabelText()).toBe('Mini');
                });

                describe('and filtering the active option', () => {
                    beforeEach(async () => {
                        await multiSelectHarness.setFilter('');
                        // set second option active
                        await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
                        await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
                        // filter it
                        await multiSelectHarness.setFilter('BMW');
                    });

                    it('sets the first option active', async () => {
                        const options = await multiSelectHarness.getOptions();
                        expect(await options[0].isActive()).toBe(true);
                    });
                });

                describe('and clearing the filter', () => {
                    beforeEach(async () => {
                        await multiSelectHarness.clickClearFilter();
                    });

                    it('shows all options', async () => {
                        const options = await multiSelectHarness.getOptions();
                        expect(options.length).toBe(4);
                    });
                });
            });

            describe('without filter', () => {
                beforeEach(() => {
                    testInstance.filter = false;
                    fixture.detectChanges();
                });

                it('has no filter', async () => {
                    expect(await multiSelectHarness.getFilter()).toBeNull();
                });
            });

            describe('with appearance auto', () => {
                beforeEach(() => {
                    testInstance.appearance = 'auto';
                    fixture.detectChanges();
                });

                it('has no action buttons', async () => {
                    expect(await multiSelectHarness.getSelectAllButton()).toBeNull();
                });

                it('has a header in the panel', async () => {
                    const panelHeader = await multiSelectHarness.getPanelHeader();
                    expect(panelHeader).not.toBeNull();
                    expect(await panelHeader?.text()).toBe('Car brand');
                });
            });
        });
    });

    describe('with complex options', () => {
        beforeEach(async () => {
            await createTestComponent(ComplexMultiSelectComponent);
            await multiSelectHarness.click();
        });

        it('shows all options with the selected label', async () => {
            const options = await multiSelectHarness.getOptions();
            expect(options.length).toBe(3);

            ['Apple', 'Orange', 'Cherry'].forEach(async (label, i) => {
                expect(await options[i].getLabelText()).toBe(label);
            });
        });

        describe('and selecting options', () => {
            beforeEach(async () => {
                const options = await multiSelectHarness.getOptions();
                await options[2].click();
                await options[0].click();
            });

            it('shows the value in the label', async () => {
                expect(await multiSelectHarness.getValueText()).toBe('Apple, Cherry(2)');
            });

            it('updates the model', () => {
                expect(testInstance.model).toEqual([
                    { label: 'Apple', id: 1, otherLabel: 'A' },
                    { label: 'Cherry', id: 3, otherLabel: 'C' },
                ]);
            });
        });

        describe('and using selectValue with a string', () => {
            beforeEach(async () => {
                (testInstance as ComplexMultiSelectComponent).selectValue = 'id';
                await multiSelectHarness.clickOptions([2, 0]);
            });

            it('updates the model', () => {
                expect(testInstance.model).toEqual([1, 3]);
            });
        });

        describe('and using selectValue with a function', () => {
            beforeEach(async () => {
                (testInstance as ComplexMultiSelectComponent).selectValue = (option: any) => option.id;
                await multiSelectHarness.clickOptions([2, 0]);
            });

            it('updates the model', () => {
                expect(testInstance.model).toEqual([1, 3]);
            });
        });

        describe('and using selectLabel with a function', () => {
            beforeEach(async () => {
                (testInstance as ComplexMultiSelectComponent).selectLabel = (option: any) => option.otherLabel;
                await multiSelectHarness.clickOptions([2, 0]);
            });

            it('shows the value in the label', async () => {
                expect(await multiSelectHarness.getValueText()).toBe('A, C(2)');
            });

            it('shows all options with the selected label', async () => {
                const options = await multiSelectHarness.getOptions();
                expect(options.length).toBe(3);

                ['A', 'O', 'C'].forEach(async (label, i) => {
                    expect(await options[i].getLabelText()).toBe(label);
                });
            });
        });
    });

    describe('accessibility', () => {
        beforeEach(async () => {
            await createTestComponent(BasicMultiSelectComponent);
        });

        it('has no accessibility violations', async () => {
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Directive()
abstract class DropdownTest {
    @ViewChild(NxMultiSelectComponent) multiSelect!: NxMultiSelectComponent<string, string>;
    @ViewChild(NxFormfieldComponent) formField!: NxFormfieldComponent;

    abstract options: any[];
    filter = true;
    model: any[] = [];
    appearance = 'outline';
}

@Component({
    template: `<nx-formfield nxLabel="Car brand" [appearance]="appearance">
        <nx-multi-select [(ngModel)]="model" [filter]="filter" [options]="options"></nx-multi-select>
    </nx-formfield>`,
})
class BasicMultiSelectComponent extends DropdownTest {
    options = ['BMW', 'Audi', 'Volvo', 'Mini'];
}

interface ComplexOption {
    label: string;
    otherLabel: string;
    id: number;
}

@Component({
    template: `<nx-formfield nxLabel="Car brand" [appearance]="appearance">
        <nx-multi-select [selectLabel]="selectLabel" [selectValue]="selectValue" [(ngModel)]="model" [filter]="filter" [options]="options"></nx-multi-select>
    </nx-formfield>`,
})
class ComplexMultiSelectComponent extends DropdownTest {
    options: ComplexOption[] = [
        {
            label: 'Apple',
            otherLabel: 'A',
            id: 1,
        },
        {
            label: 'Orange',
            otherLabel: 'O',
            id: 2,
        },
        {
            label: 'Cherry',
            otherLabel: 'C',
            id: 3,
        },
    ];

    selectLabel: string | ((option: ComplexOption) => string) = 'label';
    selectValue: string | ((option: ComplexOption) => any) = '';
}
