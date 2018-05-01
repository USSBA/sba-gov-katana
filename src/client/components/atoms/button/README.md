# Button

| Prop | Type | Description | Default
| --- | --- | --- | ---
| `alternate` | `boolean` | Can only be used when button is also `primary`. `primary`, `alternate` buttons are for secondary actions, e.g. in search boxes. | -
| `children`* | `array` \| `element` \| `string` \| | **Required**. Sets the content inside the button | -
| `disabled` | `boolean` | Disables the button, preventing any interaction | -
| `fullWidth` | `boolean` | Spans the button to the full width of its parent | -
| `primary`* \| `secondary`* | `boolean` | If the button is not `disabled`, one of `primary` or `secondary` is **required**.<br><br> Sets the visual weight of the button: <ul><li>`primary` (*filled*) buttons are for primary actions, e.g. in heros</li><li>`secondary` (*outlined*) buttons are for lower priority actions, if there are already `primary` or `secondary` buttons nearby</li></ul> | -
| `spacing` | `boolean` | Adds (*horizontal* or *vertical*) spacing to sibling (*default* or `fullWidth`) buttons | `true`
| `small` | `boolean` | Decreases the font size and padding of the button | -
| `url` | `string` | Sets the location to navigate to when the button is activated. Setting this prop will render the button as an `<a>` internally. | -

## Examples

```jsx
// primary button
<Button primary>Start here</Button>
```

```jsx
// small, primary, alternate button
<Button alternate primary small>Search</Button>
```

```jsx
// secondary, full-width button with native attribute
<Button fullWidth onClick={...} secondary>Learn more</Button>
```

```jsx
// link button
<Button primary url="/ten-steps">Start here</Button>
```

## Usage guidelines

Buttons should use grammatically-sensible casing. The buttons styling will automatically style the text to `UPPERCASE`.

### Do

```jsx
<Button secondary>Learn more</Button>
```

### Don't

```jsx
<Button secondary>LEARN MORE</Button>
```
---

## Related components

* [Link](/src/client/components/atoms/link) ([atom](/src/client/components/atoms))
