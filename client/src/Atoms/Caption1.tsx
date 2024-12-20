import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const Caption1 = (props: {
  title: string;
  ordinal?: Ordinal;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
}) => {
  return (
    <Text
      ordinal={props.ordinal}
      variant={props.variant}
      weight={props.weight}
      style={props.style}
      alignment={props.alignment}
      size="Caption1"
      value={props.title}
    />
  );
};
