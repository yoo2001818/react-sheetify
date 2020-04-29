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

... We have two directions for this. We can either depend on the application
code for this, or we could handle everything by react-sheetify. Since it should
be general purpose, it'd be a good idea to provide both layers - 'ID' based
state / focus management, which provides minimal keyboard navigation and
stuff, and fully controlled state management, which provides all the goodies -
including undo / redo, async loading, etc.

'ID' based management would need to receive ID and index. Each ID should
represent the ID of the row - that is, it shouldn't be changed even if the
row is moved, similar to 'key' attribute of React.
Index can be freely moved, and the data layer should relocate the node when
the index has been changed.

fully controlled state, should handle everything by its own - But, instead of
creating everything twice, we could make something that is built on top of
ID based management.

## Something like...

If react-sheetify shouldn't manage data on its own...

```tsx
const Sample = (
  <SheetProvider>
    <div>
      <Col
        row={0}
        rowIndex={0}
        col='id'
        colIndex={0}
        component={TextInput}
        value={...}
        onChange={...}
      />
      <Col
        row={0}
        rowIndex={0}
        col='name'
        colIndex={1}
        component={TextInput}
        value={...}
        onChange={...}
      />
    </div>
  </SheetProvider>
);

// Moving on...
const Sample = (
  <SheetProvider>
    <div>
      <Row id={0} index={0}>
        <Col
          id='id'
          index={0}
          component={TextInput}
          value={...}
          onChange={...}
        />
      </Row>
    </div>
  </SheetProvider>
);
```

If react-sheetify should manage data on its own...

```tsx
const data = [
  { id: 1, name: 'a', price: 123 },
  { id: 2, name: 'b', price: 100 },
  { id: 3, name: 'c', price: 10 },
  { id: 4, name: 'd', price: 1 },
];

const Sample = (
  <SheetProvider
    api={api} // Should provide something like 'async getRows, getCols, ...'
  >
    <App />
  </SheetProvider>
);

const App = () => (
  <RowList
    renderRow={(row) => (
      <RowItem row={row} />
    )}
  />
);

const RowItem = ({ row }) => {
  return (
    <div>
      <Col
        col='name'
        component={TextInput}
      />
      <Col
        col='price'
        component={TextInput}
      />
    </div>
  );
};
```

## Expected Features
Each 'column' should be able to handle input events, keyboard events, etc.
Additionally, it should be able to show columns like 'A5' when the user
presses '='. Dragging, right click, etc, should all be handled by column.

- Input control
- Arrow keys
- Overlay
- Right click
- Drag & drop

Obviously, we can't implement all of them using normal input. We need to
provide a UI component too.

## ID mapping
Even though the 'row ID' displayed to the user is number, we shouldn't use it
internally. We can use any ID provided from the data container, but, that
doesn't solve ordering problem. This is really critical - if we rely rendering
to the 'application' side, we must know the ordering data.

If data layer is not present, we have to rebuild the ordered set every time
the data changes. This is really not ideal, and we should instead provide our
own data layer instead.

But then, it would become not expansive (it'd be become a framework, not
a 'sheetify' layer.)

Even though this would become a bottleneck, it can be overcomed if sane data
layer is added. Therefore, we just ignore this performance penalty.

If the user desires to enhance this, user may supply 'ordered data map' to the
library; then the library will simply use that.

Due to the nature of spreadsheets, there are two ways to represent each row
and column. Each row / column can get a key, or we can just use a number.
Obviously, using 'key' would be the best, since the rows can be moved freely.

However, key cannot be sorted. We have to get key, and order data separately.
This is just like React - React receives an array with every child filled with
'key'.

## Rows and columns
Spreadsheets have fixed rows and columns. Most UIs have fixed rows, but have
dynamic columns. react-sheetify should also support dynamic columns. This is
implemented using 'merging columns' in spreadsheets; we don't support such
thing. Instead, if we see 'invalid' column that is not drawn in the UI, we just
skip the column.

To do this, we have to build column data for every row, instead of using
2D array.

## Subsystems
Some of the features may not be wanted, and may applied on demand.
Input control, and arrow keys are mandatory, but, overlay, right click, formula,
right clicks are sometimes unnecessary.

To allow this, we need to separate the logic - we need to build the 'core' parts
first, then implement all the other features, using same context.

The 'column', or rather, 'text input' should be responsible for handling events.
This may be cumbersome - it could give props, or retrieve DOM element directly.

Although 'useEvents' hooks may be available later, this is not available for
now... It's inevitable to directly inject the event listeners.

## Data flow
React-sheetify usually doesn't need to update the React state. However, if we
use context naively, we'll end up updating React components every time we
register / unregister the node. This will obviously end up in infinite loop.

Instead of doing that, we need to handle every state on our own. We need to
handle registering of the components, and receive focus / blur events from them.

If the component reports arrow keys, or any other keys that involves other
columns, we need to locate the column in the registry and 'wake' them up.

Therefore, we have internal state, yet we don't need to interface directly with
React.

If we need to directly update React state, we can issue a signal to tell React
to fetch data from the data store.
