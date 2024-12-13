import { Alignment, Color, Style, Text, Variant, Weight } from "./Text";

export const Caption1 = (props: {
  title: string;
  color?: Color;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
}) => {
  return (
    <Text
      color={props.color}
      variant={props.variant}
      weight={props.weight}
      style={props.style}
      alignment={props.alignment}
      size="Caption1"
      value={props.title}
    />
  );
};
