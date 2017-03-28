import { expect } from "chai";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "../src/conversion";
import parse from "../src/parse";
import darken from "../src/darken";
import lighten from "../src/lighten";

describe("hexToRgb", () => {
  it("should convert a 3 channel hexadecimal color to the rgb color space", () =>{
    const [r, g, b] = hexToRgb("8E", "6B", "71");
    expect(r).to.equal(142);
    expect(g).to.equal(107);
    expect(b).to.equal(113);
  });
});

describe("rgbToHex", () => {
  it("should convert a 3 channel rgb color to 3 hexadecimal values", () =>{
    const [rHex, gHex, bHex] = rgbToHex(142, 107, 113);
    expect(rHex).to.equal("8E");
    expect(gHex).to.equal("6B");
    expect(bHex).to.equal("71");
  });
});

describe("rgbToHsl", () => {
  it("should convert a 3 channel rgb color to the hsl color space", () =>{
    const [h, s, l] = rgbToHsl(142, 107, 113);
    expect(h).to.equal(350);
    expect(s).to.equal(14);
    expect(l).to.equal(49);
  });
});

describe("hslToRgb", () => {
  it("should convert a 3 channel hsl color to the rgb color space", () =>{
    const [r, g, b] = hslToRgb(350, 14, 49);
    expect(r).to.equal(142);
    expect(g).to.equal(107);
    expect(b).to.equal(113);
  });
});

describe("parse", () => {
  it("should be a function", () => {
    expect(parse).to.be.a("function");
  });

  it("should return an object with a hex red property", () => {
    expect(parse("#333")).to.have.property("rHex");
  });

  it("should return an object with a hex green property", () => {
    expect(parse("#333")).to.have.property("gHex");
  });

  it("should return an object with a hex blue property", () => {
    expect(parse("#333")).to.have.property("bHex");
  });

  it("should return an object with a red property", () => {
    expect(parse("#333")).to.have.property("r");
  });

  it("should return an object with a green property", () => {
    expect(parse("#333")).to.have.property("g");
  });

  it("should return an object with a blue property", () => {
    expect(parse("#333")).to.have.property("b");
  });

  it("should return an object with a hue property", () => {
    expect(parse("#333")).to.have.property("h");
  });

  it("should return an object with a saturation property", () => {
    expect(parse("#333")).to.have.property("s");
  });

  it("should return an object with a lightness property", () => {
    expect(parse("#333")).to.have.property("l");
  });
});

describe("parse", () => {
  it("should throw an error if a string cannot be parsed to a color", () => {
    expect(() => parse("rgb(0,0")).to.throw(Error, /No matching color patterns found/);
  });
});

describe("hex", () => {
  it("should parse a 3 digit hex string", () => {
    expect(parse("#000").rgb()).to.equal("rgb(0,0,0)");
  });
  it("should parse a 6 digit hex string", () => {
    expect(parse("#000000").rgb()).to.equal("rgb(0,0,0)");
  });
  it("should output a hex string", () => {
    expect(parse("rgba(51,51,51)").hex()).to.equal("#333333");
  });
});

describe("rgb", () => {
  it("should parse an rgb string", () => {
    expect(parse("rgb(0,0,255)").hex()).to.equal("#0000FF");
  });
  it("should parse an rgba string", () => {
    expect(parse("rgba(0,0,255,0.5)").hsl()).to.equal("hsla(240,100%,50%,0.5)");
  });
  it("should output an rgb string", () => {
    expect(parse("#333").rgb()).to.equal("rgb(51,51,51)");
  });
  it("should parse an rgba string", () => {
    expect(parse("rgba(51,51,51,0.5)").hsl()).to.equal("hsla(0,0%,20%,0.5)");
  });
});

describe("hsl", () => {
  it("should parse an hsl string", () => {
    expect(parse("hsl(211,73%,13%)").hex()).to.equal("#092039");
  });
  it("should output an hsl string", () => {
    expect(parse("#092039").hsl()).to.equal("hsl(211,73%,13%)");
  });
});

describe("hsla", () => {
  it("should parse an hsla string", () => {
    expect(parse("hsla(211, 73%, 13%, 0.5)").rgb()).to.equal("rgba(9,32,57,0.5)");
  });
  it("should output an hsla string", () => {
    expect(parse("rgba(9, 32, 57, 0.5)").hsl()).to.equal("hsla(211,73%,13%,0.5)");
  });
});

describe("lighten", () => {
  it("should lighten a color by 10%", () => {
    const blue = parse("#00F");
    expect(lighten(blue).hsl()).to.equal("hsl(240,100%,55%)");
  });

  it("should not lighten a color higher than 100%", () => {
    const white = parse("#FFF");
    expect(lighten(white).rgb()).to.equal("rgb(255,255,255)");
  });
});

describe("darken", () => {
  it("should darken a color by 25%", () => {
    const blue = parse("#00F");
    expect(darken(blue, 25).hsl()).to.equal("hsl(240,100%,37.5%)");
  });

  it("should not darken a color lower than 0%", () => {
    const black = parse("#000");
    expect(darken(black).rgb()).to.equal("rgb(0,0,0)");
  });

  it("should chain the darken method on a color object", () => {
    const blue = parse("#00f");
    expect(blue.darken).to.be.a("function");

    expect(blue.darken(20).hex()).to.equal("#0000CC");
  })
});

describe("alpha", () => {

  it("should fade out a color by 50%", () => {
    const black = parse();
    expect(black.fadeOut().a).to.equal(0.5);
  });

  it("should fade in a color by 50%", () => {
    const transparentBlack = parse("rgba(0,0,0,.5)");
    expect(transparentBlack.fadeIn().a).to.equal(0.75);
  });

  it("should set the alpha channel absolutely", () => {
    const reallyTransparentWhite = parse("rgba(255,255,255,.1)");
    expect(reallyTransparentWhite.setAlpha(100).a).to.equal(1);
  });
});
