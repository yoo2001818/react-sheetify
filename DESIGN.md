# Design & Direction
The objective of react-sheetify is to deliver spreadsheet-like keyboard
navigations, formulas, range selection, etc. Basically, it's a spreadsheet with
complicated UI.

To do that, even though the UI should be implemented in normal way, just
like normal React form, it should be able to navigate the document using at
least 2D format. Normal focus handles this in one dimension - we can move
between fields in 1D. We need to enhance this to make this 2D. This means that
react-sheetify should be able to represent the document in 2D.

It can be hierarchical format, or just plain 2D table. If we press 'down' key
in specific field, the next row's that specific field should be selected.

However, the UI can be hierarchical. A field can be merged among multiple
rows (rowspan); If the user decides to traverse rows using that field, multiple
rows are skipped at once. This can be used to represent hierarchical fields.

The UI should have adequate addressing model too. We can represent rows / 
columns using regular spreadsheet format like 'A1', 'B3:D5'... This can be
useful for the user, however, this is bad idea to handle it internally (it can
be changed). We have to retrieve UUID, or any kind of ID to distinguish
between rows and columns. Since insertion can happen anywhere, it should be
unique enough too.

Considering this in mind, react-sheetify should boil down to this:

We need to build a data store layer that can efficiently handle nested data,
flatten it out to 2D, and navigate between axis.

Then, we need to build a decent presentation layer that can be easily
used for simple uses (a spreadsheet). Making this, we'll derive a framework
for building forms on the top of data store layer.

We'll need to implement selection / history management, autofill, formula
resolving, etc since then. After making these, we'll finally be able to enhance
any UI using react-sheetify.

At that point, we'll consider using infinite scroll, async loading / saving,
etc.

Data store layer can be built using anything - But, regular React context
should be enough for this purpose.

The presentation layer should talk to data store layer using hooks. I haven't
figured this out yet, but I think it should be simple as regular form library.
something like `useColumn('A3')` or something?

## Data layer
We have to store the order of the rows, and actual data of the rows.

The order can be changed dynamically; the user can freely swap rows. To
implement this, we'd have to tightly manage the data by react-sheetify itself..

If we need to separate between data layer, we could provide data conversion
layer. But still, order management is necessary.
