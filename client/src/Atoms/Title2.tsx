import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const Title2 = ({
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
      size="Title2"
      value={title}
    />
  );
};
