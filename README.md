# `polychrome` 
>A small `~2kB (gzipped)` library for parsing and manipulating colors

![logo](images/logo.png)

## Installation
>feel free to replace `yarn add` with `npm install`
```shell
$> yarn add polychrome
```

## Usage
```js
// using ES6 modules
import polychrome from "polychrome";

// using CommonJS modules
const polychrome = require("polychrome");
```

```js
// Make a polychrome color from hex, rgb(a), and hsl(a) strings
const red = polychrome("#F00");

// Get a string representation of a polychrome color in other formats
red.rgb() // "rgb(255,0,0)"

// Manipulate polychrome colors
const darkerRed = red.darken(20); // (pass in an integer percentage)
darkerRed.hsl() // "hsl(0,100%,40%)"

// Chain polychrome methods together before outputting
polychrome("#F00").darken(20).fadeOut(60).rgb() // "rgba(204,0,0,0.4)"
```

---

## API Reference
- [Polychrome](#polychrome)
- [Alpha](#alpha)
- [Hue](#hue)
- [Lightness](#lightness)
- [Mix](#mix)
- [Saturation](#saturation)

### Polychrome
`polychrome(colorString)`
>`colorString` can be a hex (3 or 6 digit), rgb(a), or hsl(a) string. Returns a `polychrome` object.

A polychrome object consists of the following properties:
- `rHex` - 2 character hex string representation of the red color channel
- `gHex` - 2 character hex string representation of the green color channel
- `bHex` - 2 character hex string representation of the blue color channel
- `r` - value of the red color channel [0 - 255]
- `g` - value of the green color channel [0 - 255]
- `b` - value of the blue color channel [0 - 255]
- `h` - hue of the color [0 - 360]
- `s` - saturation of the color [0 - 100]
- `l` - lightness of the color [0 - 100]
- `luma` - luma value of the color [0 - 255]

In addition to the above properties, the following methods are available to a `polychrome` for outputting CSS color strings:

- `.hex()` - returns a 6-digit hexadecimal CSS compatible color string

  ```js
  polychrome("rgb(0, 0, 0)").hex() // "#000000"
  ```

- `.rgb()` - returns an rgb(a) CSS compatible color string

  ```js
  // rgba will be used if an alpha value exists
  polychrome("#000").rgb()           // "rgb(0,0,0)"
  polychrome("#000").fadeOut(60).rgb() // "rgba(0,0,0,.4)"
  ```

- `.hsl()` - returns an hsl(a) CSS compatible color string

  ```js
  // hsla will be used if an alpha value exists
  polychrome("#000").hsl()           // "hsl(0,0%,0%)"
  polychrome("#000").fadeOut(60).hsl() // "hsla(0,0%,0%,.4)"
  ```

### Alpha

- `.setAlpha(value)`

  Returns a `polychrome` with an `alpha` value _absolutely_ set to `value`. No change occurs if value is omitted.

- `.fadeIn(percentage)`

  Returns a `polychrome` faded in by `percentage`. Default `50` if no percentage is passed in.

- `.fadeOut(percentage)`

  Returns a `polychrome` faded out by `percentage`. Default `50` if no percentage is passed in.

### Contrast

- `.contrast(dark, light)`

  Checks `luma` value of `polychrome` and returns `dark` or `light` `polychrome` depending on the contrast level. If a contrast ratio of at least `4.5:1` is not met, the `dark`/`light` colors will be darkened / lightened until a valid ratio is met.

  ```js
  polychrome("#000").contrast().rgb() // "rgb(255,255,255)"

  polychrome("#DDD").contrast("#333", "#EEE").hex() // "#333333"
  ```

  > `dark` and `light` can be a `String` _or_ `polychrome`. They default to `black (#000)` and `white (#FFF)` if params are not passed in.

### Hue

- `.setHue(value)`

  Returns a `polychrome` with a `hue` value _absolutely_ set to `value`. No change occurs if value is omitted.

- `.spin(degrees)`

  Returns a `polychrome` with a `hue` value _rotated_ `degrees`. Can be a positive or negative degree value. When bounds of `[0 - 360]` are reached, `hue` will continue in a circular fashion until it has been spun the full amount.

- `.complimentary()`

  Returns a `polychrome` with a `hue` value _rotated_ `180 degrees`. Shorthand for `.spin(180)`.


### Lightness

- `.setLightness(value)`

  Returns a `polychrome` with a `lightness` value _absolutely_ set to `value`. No change occurs if value is omitted.

- `.lighten(percentage)`

  Returns a `polychrome` lightened by `percentage`. Default `10` if no percentage is passed in.


- `.darken(percentage)`

  Returns a `polychrome` darkened by `percentage`. Default `10` if no percentage is passed in.


### Mix

- `.mix(otherColor)`

  Returns a `polychrome` mixed with `otherColor`. `otherColor` can be another `polychrome` or a color string that will be parsed.

- `.tint()`

  Returns a `polychrome` mixed with `white (#FFFFFF)`. Shorthand for `.mix("#FFFFFF")`.

- `.shade()`

  Returns a `polychrome` mixed with `black (#000000)`. Shorthand for `.mix("#000000")`.

### Saturation

- `.setSaturation(value)`

  Returns a `polychrome` with a `saturation` value _absolutely_ set to `value`. No change occurs if value is omitted.

- `.saturate(percentage)`

  Returns a `polychrome` saturated by `percentage`. Default `10` if no percentage is passed in.

- `.desaturate(percentage)`

  Returns a `polychrome` desaturated by `percentage`. Default `10` if no percentage is passed in.

- `.grayscale()`

  Returns a `polychrome` with `saturation` set to `0`. Shorthand for `.setSaturation(0)`.

---

## License

> MIT License 2017 © Chad Donohue
