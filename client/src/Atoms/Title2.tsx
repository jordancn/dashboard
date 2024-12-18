import { Alignment, Ordinal, Style, Text, Variant, Weight } from "./Text";

export const Title2 = (props: {
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
      size="Title2"
      value={props.title}
    />
  );
};
