# Contributing

Bug reports, option suggestions, and fixes are all welcome. For anything substantial, an issue is a good place to start.

## The colors are not in this repo

Firelight's palette is a [separate project](https://github.com/ridusaini/firelight). The three variants here are copied from it verbatim. A change to a color belongs upstream, not in this theme.

## Setup

```sh
npm ci
npm run build     # src/theme.css + the fonts -> theme.css
npm run lint      # rebuild, then stylelint
```

`theme.css` is generated. **Edit `src/theme.css`**, run the build, and commit both files. Obsidian downloads the built file straight from the repository, so a stale one ships a stale theme. CI fails if the two drift apart.

To try changes in the bundled vault:

```sh
./scripts/install-local.zsh test-vault
```

That symlinks the theme into `test-vault`, which has a specimen note covering headings, links, callouts, tables, code, task states, embeds, and images. Install [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) in that vault to exercise the options. The plugin is deliberately not committed here.

## Some things to keep in mind

- **Reach for an Obsidian variable first if there is one:** Most of the theme is variable assignments rather than rules, which keeps it small and easy to override.
- **No `!important`:** It stops people overriding the theme with their own snippets.
- **One grammar for names:** `firelight-<domain>-<property>-<value>`, domain singular, and a setting's id is the exact prefix of every class it emits.
- **Try to keep the settings flat if possible:** Use named sections without nesting so everything is one click away.
- **Check all three palettes:** Make sure things work across all three palettes, Coal, Smoulder, Ash.
- **Features must work** with Style Settings absent.


## Adding an option

An option is a `class-select` or `class-toggle` in the `@settings` block plus the classes it emits. Give it a description: the settings panel searches those as well as titles.

Defaults have to work with Style Settings absent, so the base `body` rule must already produce the default appearance, and the option classes override it.

Before adding an option, read the existing settings and the CSS that implements that feature. Extend its existing section instead of introducing another control for the same behavior.
Use **None, Subtle, Medium, Strong** for surface strength and **None, Thin, Medium, Thick** for border thickness. Use **Native** when leaving an app-controlled property unchanged.

## Reporting a problem

Include your Obsidian version, which palette you are on, and any settings that differ from the defaults. A screenshot if necessary.
