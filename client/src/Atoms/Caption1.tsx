import { Alignment, FontStyle, Ordinal, Text, Variant, Weight } from "./Text";

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
  style?: FontStyle;
  alignment?: Alignment;
}) => {
  return (
    <Text
      ordinal={ordinal}
      variant={variant}
      weight={weight}
      fontStyle={style}
      alignment={alignment}
      size="Caption1"
      value={title}
    />
  );
};
