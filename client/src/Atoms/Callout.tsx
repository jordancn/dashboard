import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const Callout = ({
  title,
  color,
  variant,
  weight,
  style,
  alignment,
}: {
  title: string;
  color?: Ordinal;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
}) => {
  return (
    <Text
      ordinal={color}
      variant={variant}
      weight={weight}
      style={style}
      alignment={alignment}
      size="Callout"
      value={title}
    />
  );
};
