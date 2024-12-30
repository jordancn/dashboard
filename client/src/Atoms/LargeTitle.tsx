import { Alignment, FontStyle, Ordinal, Text, Variant, Weight } from "./Text";

export const LargeTitle = ({
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
  style?: FontStyle;
  alignment?: Alignment;
}) => {
  return (
    <Text
      ordinal={color}
      variant={variant}
      weight={weight}
      fontStyle={style}
      alignment={alignment}
      size="LargeTitle"
      value={title}
    />
  );
};
