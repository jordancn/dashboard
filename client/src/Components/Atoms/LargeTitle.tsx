import { Alignment, Color, Style, Text, Variant, Weight } from "./Text";

export const LargeTitle = (props: {
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
        size: "LargeTitle",
      }}
      value={props.title}
    />
  );
};
