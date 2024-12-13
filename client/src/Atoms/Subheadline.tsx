import { Alignment, Color, Style, Text, Variant, Weight } from "./Text";

export const Subheadline = (props: {
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
      size="Subheadline"
      value={props.title}
    />
  );
};
