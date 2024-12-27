import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const Caption1 = ({
  title,
  ordinal,
  variant,
  weight,
  style,
  alignment,
}: {
  title: string;
  ordinal?: Ordinal;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
}) => {
  return (
    <Text
      ordinal={ordinal}
      variant={variant}
      weight={weight}
      style={style}
      alignment={alignment}
      size="Caption1"
      value={title}
    />
  );
};
