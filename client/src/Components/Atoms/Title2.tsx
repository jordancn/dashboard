import { Alignment, Color, Style, Text, Variant, Weight } from "./Text";

export const Title2 = (props: {
  title: string;
  color?: Color;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
}) => {
  return (
    <Text
      style={{
        color: props.color,
        variant: props.variant,
        weight: props.weight,
        style: props.style,
        alignment: props.alignment,
        size: "Title2",
      }}
      value={props.title}
    />
  );
};
