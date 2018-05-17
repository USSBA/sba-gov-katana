# Label (previously named DocumentType)

| Prop | Type | Description | Default
| --- | --- | --- | ---
| `id` | `string` | Sets the right-side of the content inside the label, which is an unique number of the article/document | -
| `large` | `boolean` | Increases the font size and padding of the label | `true`
| `small` | `boolean` | Decreases the font size and padding of the label | -
| `type`* | `string` | **Required**. Sets the left-side of the content inside the label, which is the category of the article/document | `Memo`

## Examples

```jsx
// Large label
<Label type='SBA form' id='1011-01' />
```

```jsx
// Small label
<Label type='7(a)' id='1012-01 small />
```

```jsx
// Label with only type
<Label type='TechNote' />
```

## Usage guidelines

Only send in string values to Type and ID props. No need to declare `large` if you need to render a large label, unless it's small.

### Do

```jsx
<Label type="SOP" id="01" />
```

### Don't

```jsx
// Large is set by default
<Label type="good" id="1590" large />
```
