---
title: Table
category: components
b2c: true
expert: true
stable: done
---

This component is implemented on top of the native HTML table `<table></table>` and adds the needed styling. In addition, there is an expandable table option for advanced use cases.

We provide the following directives: `nxTableCell`, `nxTableRow` and `nxHeaderCell` to apply our style respectively on the top of `td`, `tr` and `th`. This setup maintains the capabilities of the native table such as accessibility and native HTML markups within cells.

For better mobile side-to-side scrolling user experience the table should be placed in a horizontal scroll indicator `<nx-swipebar>` component.

<!-- example(table) -->

### Condensed mode

By using attribute `condensed`, you can activate the condensed mode of the Table.

<!-- example(table-condensed) -->

### Zebra mode

Using attribute `zebra`, you can activate the zebra mode of the Table.

<!-- example(table-zebra) -->

### Sticky columns

Using attribute `sticky`, you can make first or last column (or both of them at the same time) of the table be displayed as "sticky", by setting its value to `first`, `last` or `both` respectively.

Please note that you are only allowed to make the first and/or last column sticky, to prohibit covering too much screen estate by fixed columns. For the same reason, this setting won't have effect on mobile screens.

<!-- example(table-sticky) -->

### Sorting header

This example shows how you can implement a basic sorting functionality for a table with `nxSort` and `nxSortHeaderCell`. As we don't know how your data looks like, you can implement the actual sorting function by yourself and call the function every time an `(sortChange)` event is outputted.

For **localization** please use the provider `NxHeaderSortIntl` which contains some labels for screen reader users. By default the labels are in english. This is also shown in the following example.

<!-- example(table-sorting) -->

### Advanced example: Combine sorting, filtering and pagination

By using the `nx-pagination` and `nx-formfield` you can filter and paginate the table items as shown in the example below:

<!-- example(table-filter-sort-paginate) -->

### Selecting rows

The following example shows how you can implement a selection functionality with the `SelectionModel` of Angular CDK. To show the selected values, you can toggle 'Debug selected value' under the table. To be able to interact and select a table row, the `selectable` option needs to be set on the `NxTableRow`.

<!-- example(table-single-select) -->

Multi selection can be implemented by switching on the multi select flag on the `SelectionModel`.

<!-- example(table-selecting) -->

<div class="docs-expert-container">

### Expert: Expandable mode

Please note that **this is an Expert styling option**. This means that the expandable feature is only intended for internal applications and not for applications that are client facing.

Table rows can be expanded by adding `[nxExpandableTableRow]` and `[nxExpandableTableCell]` to the table. For convenience the `<nx-toggle-button>` component can be used to expand and close the rows. The rows can also be toggled directly by calling their `toggle`, `expand` or `close` methods. The table also supports expanding all rows at the same time. The `[nxExpandableTable]` directive handles the expandion of all rows by conbining it with the `<nx-toggle-button>` as in this example.

<!-- example(table-expandable) -->

### Expert: Form elements

Form elements can also be added to the table:

<!-- example(table-form-elements) -->

</div>
