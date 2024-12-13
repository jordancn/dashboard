import { Alignment, Color, Style, Text, Variant, Weight } from "./Text";

export const Headline = (props: {
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
      size="Headline"
      value={props.title}
    />
  );
};
