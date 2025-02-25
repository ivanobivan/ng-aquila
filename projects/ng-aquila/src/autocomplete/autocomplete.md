---
title: Autocomplete
category: components
b2c: true
expert: true
stable: done
---

Autocomplete is a companion to the input element. When input element receives a focus or a down arrow is pressed and autocomplete items are defined, the autcomplete panel is displayed. On selecting the autocomplete option, it's value is used to set the value of input.

### Module

Autocomplete requires Angular CDK.

```ts
import { OverlayModule } from '@angular/cdk/overlay';`
```

Autocomplete can be used with input only, but usually you'll wan't to use it within formfield or natural language form. For this you'll need these additional imports.

```ts
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxNaturalLanguageFormModule } from '@aposin/ng-aquila/natural-language-form';
```

### Examples

To use autocomplete, create a `nx-autocomplete` element with `nx-autocomplete-option` elements. Set the `[value]` of the `nx-autocomplete-option` to the one you wish to fill the input with. Export the Autocomplete component to the template variable. Use nxAutocompleteTrigger directive (`[nxAutocomplete]`) on the input element with it's value set to the template variable of the Autocomplete component to bind input to the autocomplete.

<!-- example(autocomplete-basic) -->

#### Autocomplete with filtering

You can also filter the content of the list based on the value of the input field. The list will be dynamically updated given text input.

<!-- example(autocomplete-filtering) -->

#### Default item rendering

The autocomplete trigger can provide a default autocomplete options rendering. To use this feature, provide a search callback function via `[nxAutocompleteItems]` attribute. The callback signature has to be `(val: string) => Observable<Array<string>>`.

<!-- example(autocomplete-default-rendering) -->

#### Data binding

All options that apply to the data binding can be used. For details look at the examples with different bindings and different options generation below and also `nxInput`, `nxFormField` and `nxNaturalLanguageForm`.

<!-- example(autocomplete-data-binding) -->

<div class="docs-expert-container">

#### Expert: Autocomplete with outline

In a formfield with an outline the styling of the autocomplete will adjust accordingly.

Please note that this is an **Expert styling option**. This means that the outline appearance is only intended for internal applications and not for applications that are client facing.

<!-- example(autocomplete-outline) -->

</div>

### Accessibility

The autocomplete can be accessed via keyboard. You can trigger the search by simply start typing in the input. After the overlay popped up, you can use ARROW_UP and ARROW_DOWN to focus on the desired element. Hitting SPACE or ENTER selects the value however ESC or TAB closes the autocomplete.
