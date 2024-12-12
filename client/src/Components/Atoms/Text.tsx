import { FONT } from "@/Components/Configuration/Configuration";
import * as React from "react";
import { Properties } from "csstype";

type TextAlign = Properties["textAlign"];

export type Platform = "Desktop" | "Mobile";
export type Mode = "Light" | "Dark";
export type Variant = "Opaque" | "Vibrant";
export type Color = "Primary" | "Secondary" | "Tertiary" | "Quarternary";
export type Weight = "Regular" | "Bold";
export type Style = "Normal" | "Italic";
export type Alignment = "Left" | "Center" | "Right";
export type Size =
  | "LargeTitle"
  | "Title1"
  | "Title2"
  | "Title3"
  | "Headline"
  | "Body"
  | "Callout"
  | "Subheadline"
  | "Footnote"
  | "Caption1"
  | "Caption2";

type TextColor = {
  platform: Platform;
  mode: Mode;
  variant: Variant;
  color: Color;
  rgba: string;
};

const definitions = `
Platform | Mode  | Variant | Color       |   R |   G |   B | A
Desktop  | Light | Opaque  | Primary     |   0 |   0 |   0 | 0.85
Desktop  | Light | Opaque  | Secondary   |   0 |   0 |   0 | 0.50
Desktop  | Light | Opaque  | Tertiary    |   0 |   0 |   0 | 0.25
Desktop  | Dark  | Opaque  | Primary     | 255 | 255 | 255 | 0.85
Desktop  | Dark  | Opaque  | Secondary   | 255 | 255 | 255 | 0.55
Desktop  | Dark  | Opaque  | Tertiary    | 255 | 255 | 255 | 0.25
Desktop  | Light | Vibrant | Primary     |  77 |  77 |  77 | 1.00
Desktop  | Light | Vibrant | Secondary   | 128 | 128 | 128 | 1.00
Desktop  | Light | Vibrant | Tertiary    | 198 | 198 | 198 | 1.00
Desktop  | Dark  | Vibrant | Primary     | 229 | 229 | 229 | 1.00
Desktop  | Dark  | Vibrant | Secondary   | 124 | 124 | 124 | 1.00
Desktop  | Dark  | Vibrant | Tertiary    |  65 |  65 |  65 | 1.00
Mobile   | Light | Opaque  | Primary     |   0 |   0 |   0 | 0.85
Mobile   | Light | Opaque  | Secondary   |  60 |  60 |  67 | 0.60
Mobile   | Light | Opaque  | Tertiary    |  60 |  60 |  60 | 0.30
Mobile   | Light | Opaque  | Quarternary |  60 |  60 |  60 | 0.18
Mobile   | Dark  | Opaque  | Primary     | 255 | 255 | 255 | 1.00
Mobile   | Dark  | Opaque  | Secondary   | 235 | 235 | 245 | 0.60
Mobile   | Dark  | Opaque  | Tertiary    | 235 | 235 | 245 | 0.30
Mobile   | Dark  | Opaque  | Quarternary | 235 | 235 | 245 | 0.16
`;

const textColors: TextColor[] = definitions
  .trim()
  .split("\n")
  .map((definition) => {
    const [platform, mode, variant, color, r, g, b, a] = definition
      .trim()
      .split("|");

    return {
      platform: platform.trim(),
      mode: mode.trim(),
      variant: variant.trim(),
      color: color.trim(),
      rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
    } as TextColor;
  });

const desktopTextSizes: { [key in Size]: number } = {
  LargeTitle: 26,
  Title1: 22,
  Title2: 17,
  Title3: 15,
  Headline: 13,
  Body: 13,
  Callout: 12,
  Subheadline: 11,
  Footnote: 10,
  Caption1: 10,
  Caption2: 10,
};

const mobileTextSizes: { [key in Size]: number } = {
  LargeTitle: 34,
  Title1: 28,
  Title2: 22,
  Title3: 20,
  Headline: 17,
  Body: 17,
  Callout: 16,
  Subheadline: 15,
  Footnote: 13,
  Caption1: 12,
  Caption2: 11,
};

const desktopLineHeights: { [key in Size]: number } = {
  LargeTitle: 32,
  Title1: 26,
  Title2: 22,
  Title3: 20,
  Headline: 16,
  Body: 16,
  Callout: 15,
  Subheadline: 14,
  Footnote: 13,
  Caption1: 13,
  Caption2: 13,
};

const mobileLineHeights: { [key in Size]: number } = {
  LargeTitle: 41,
  Title1: 34,
  Title2: 28,
  Title3: 25,
  Headline: 22,
  Body: 22,
  Callout: 21,
  Subheadline: 20,
  Footnote: 18,
  Caption1: 16,
  Caption2: 13,
};

type TextStyle = {
  platform?: Platform;
  mode?: Mode;
  color?: Color;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
  size: Size;
};

// const getFontColor = (theme: "light" | "dark"): Mode => {
//   switch (theme) {
//     case "dark":
//       return "Dark";
//     case "light":
//       return "Light";
//   }
// };

export const Text: React.FC<{ style: TextStyle; value: string }> = (props) => {
  // const theme = useSystemTheme();
  // const theme: Mode = 'Light';

  const platform = props.style.platform || "Mobile";
  const mode = props.style.mode || "Light";

  const color = props.style.color || "Primary";
  const variant = props.style.variant || "Opaque";
  const weight = props.style.weight || "Regular";
  const style = props.style.style || "Normal";
  const alignment = props.style.alignment || "Left";

  const textColor = textColors.find(
    (tc) =>
      tc.platform === platform &&
      tc.mode === mode &&
      tc.color === color &&
      tc.variant === variant,
  );

  if (!textColor) {
    return null;
  }

  const size =
    platform === "Desktop"
      ? desktopTextSizes[props.style.size]
      : mobileTextSizes[props.style.size];
  const lineHeight =
    platform === "Desktop"
      ? desktopLineHeights[props.style.size]
      : mobileLineHeights[props.style.size];

  return (
    <div
      style={{
        color: textColor?.rgba,
        fontFamily: FONT,
        fontWeight: weight === "Regular" ? 400 : 600,
        fontStyle: style === "Normal" ? "normal" : "italic",
        fontSize: `${size}pt`,
        lineHeight: `${lineHeight}pt`,

        textAlign: alignment.toLowerCase() as TextAlign,
      }}
    >
      {props.value}
    </div>
  );
};
