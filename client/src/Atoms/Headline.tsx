import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const Headline = (props: {
  title: string;
  color?: Ordinal;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
}) => {
  return (
    <Text
      ordinal={props.color}
      variant={props.variant}
      weight={props.weight}
      style={props.style}
      alignment={props.alignment}
      size="Headline"
      value={props.title}
    />
  );
};
