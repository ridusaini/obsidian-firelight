---
aliases:
  - Theme specimen
tags:
  - firelight
  - design/testing
status: active
created: 2026-09-12
---

# Firelight

I personally use this for long sessions of reading and writing. Body text remains calm while headings, links, and interaction states are easy to find. The palette comes from [another project](https://github.com/ridusaini/firelight), check it out if you like this.

Three palettes ship with the theme. Obsidian's light and dark switch chooses **Ash** or a dark palette, and the *Dark palette* setting then picks between Smoulder and Coal.

| Palette  | Appearance     | Background | Body text | Contrast |
| -------- | -------------- | ---------- | --------- | -------- |
| Ash      | Light          | `#F4EEEC`  | `#473E36` | 9.10:1   |
| Smoulder | Dark, softened | `#2E2E2E`  | `#D7CEC8` | 8.76:1   |
| Coal     | Dark, contrast | `#232222`  | `#E6D7CD` | 11.31:1  |

## Reading

Text should hold its measure without crowding the pane. An [[Internal link]] and an [[Unresolved note]] sit differently in a sentence, as does [an external address](https://obsidian.md). ==Highlighted text== marks a phrase, `inline code` interrupts it, ~~deleted text~~ stays legible while reading as withdrawn and **Bold Text** carries weight.

> Good tools become quiet in use. Their structure stays visible without asking for attention.

Tags carry their own surface: #firelight/theme and #writing.

### Heading scale

Six levels are available. The scale decays toward body size rather than holding one ratio, so the lower levels stay useful for structure instead of shouting.

#### Fourth level

##### Fifth level

###### Sixth level

### Lists and tasks

- A first-level item
  - A nested item long enough to wrap, which checks indentation against the hanging text
    - A third level
- A sibling at the top level

1. Ordered items keep their own rhythm
2. Spacing between them is adjustable
   1. Including when nested

Twenty-one task states are marked, each with its own glyph and hue.

- [ ] Not started
- [x] Done
- [/] In progress
- [-] Cancelled
- [>] Forwarded
- [<] Scheduled
- [!] Important
- [?] Question
- [*] Star
- ["] Quote
- [i] Info
- [b] Bookmark
- [p] Pro
- [c] Con
- [u] Up
- [d] Down

## Callouts

Four semantic roles cover the full set of callout types.

> [!note] Note
> A neutral callout carrying an [[Internal link]] and some `inline code`.

> [!tip] Tip
> Surfaces and edges are set separately, so a callout can have one, both or neither.

> [!warning] Warning
> Check text and controls on every surface, not only the note background.

> [!error] Error
> Destructive states stay obvious in all three palettes.

## Code

Syntax colors are drawn from the same ten accents as the rest of the theme.

```ts
type Variant = "ash" | "coal" | "smoulder";

const background: Record<Variant, string> = {
  ash: "#F4EEEC",
  coal: "#232222",
  smoulder: "#2E2E2E",
};

export function contrast(variant: Variant, foreground: string): number {
  return luminanceRatio(background[variant], foreground);
}

export const wideLine = (variant: Variant): string => `${variant} resolves to ${background[variant]} and pairs with the matching foreground ramp`;
```

## Media

Images stay inside the text column. Fit keeps an image at its own size; Fill stretches it to the note width.

![[Attachments/firelight-landscape.svg]]

![[Attachments/firelight-panorama.svg]]

## Embeds

An embedded note can flow with the page, sit on a tinted panel, or sit inside an outlined box.

![[Embedded specimen]]

## References

Inline mathematics sits naturally in a sentence, as in $e^{i\pi} + 1 = 0$, while a block stands apart.

$$
L = 0.2126R + 0.7152G + 0.0722B
$$

Footnotes need clear separation without becoming heavy.[^1]

[^1]: The reference and its marker should both stay quiet against body text.
