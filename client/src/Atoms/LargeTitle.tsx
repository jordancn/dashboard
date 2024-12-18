import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const LargeTitle = (props: {
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
      size="LargeTitle"
      value={props.title}
    />
  );
};
