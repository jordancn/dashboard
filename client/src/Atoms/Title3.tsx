import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const Title3 = ({
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
      size="Title3"
      value={title}
    />
  );
};
