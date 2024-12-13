import { useDeviceData } from "@/Providers/DeviceDataProvider";
import classNames from "classnames";
import styles from "./Text.module.css";

export type Platform = "Desktop" | "Mobile";
export type Mode = "Light" | "Dark";
export type Variant = "Opaque" | "Vibrant";
export type Color = "Primary" | "Secondary" | "Tertiary" | "Quarternary";
export type Weight = "Regular" | "Bold";
export type Style = "Normal" | "Italic";
export type Alignment = "Left" | "Center" | "Right";
export type Size =
  | "LargeTitle"
  | "Title1"
  | "Title2"
  | "Title3"
  | "Headline"
  | "Body"
  | "Callout"
  | "Subheadline"
  | "Footnote"
  | "Caption1"
  | "Caption2";

export const Text = (props: {
  mode?: Mode;
  color?: Color;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
  size?: Size;
  value: string;
}) => {
  const deviceData = useDeviceData();

  const platform =
    deviceData.status === "LOADED"
      ? deviceData.value.isMobile
        ? "Mobile"
        : "Desktop"
      : "Desktop";

  const mode = props.mode || "Light";

  const color = props.color || "Primary";
  const variant = props.variant || "Opaque";
  const weight = props.weight || "Regular";
  const style = props.style || "Normal";
  const alignment = props.alignment || "Left";

  return (
    <div
      className={classNames(styles.text, {
        [styles.normalStyle]: style === "Normal",
        [styles.italicStyle]: style !== "Normal",
        [styles.regularWeight]: weight === "Regular",
        [styles.boldWeight]: weight !== "Regular",
        [styles.leftAlignment]: alignment === "Left",
        [styles.centerAlignment]: alignment === "Center",
        [styles.rightAlignment]: alignment === "Right",

        [styles.desktopLargeTitle]:
          platform === "Desktop" && props.size === "LargeTitle",
        [styles.desktopTitle1]:
          platform === "Desktop" && props.size === "Title1",
        [styles.desktopTitle2]:
          platform === "Desktop" && props.size === "Title2",
        [styles.desktopTitle3]:
          platform === "Desktop" && props.size === "Title3",
        [styles.desktopHeadline]:
          platform === "Desktop" && props.size === "Headline",
        [styles.desktopBody]: platform === "Desktop" && props.size === "Body",
        [styles.desktopCallout]:
          platform === "Desktop" && props.size === "Callout",
        [styles.desktopSubheadline]:
          platform === "Desktop" && props.size === "Subheadline",
        [styles.desktopFootnote]:
          platform === "Desktop" && props.size === "Footnote",
        [styles.desktopCaption1]:
          platform === "Desktop" && props.size === "Caption1",
        [styles.desktopCaption2]:
          platform === "Desktop" && props.size === "Caption2",

        [styles.mobileLargeTitle]:
          platform === "Mobile" && props.size === "LargeTitle",
        [styles.mobileTitle1]: platform === "Mobile" && props.size === "Title1",
        [styles.mobileTitle2]: platform === "Mobile" && props.size === "Title2",
        [styles.mobileTitle3]: platform === "Mobile" && props.size === "Title3",
        [styles.mobileHeadline]:
          platform === "Mobile" && props.size === "Headline",
        [styles.mobileBody]: platform === "Mobile" && props.size === "Body",
        [styles.mobileCallout]:
          platform === "Mobile" && props.size === "Callout",
        [styles.mobileSubheadline]:
          platform === "Mobile" && props.size === "Subheadline",
        [styles.mobileFootnote]:
          platform === "Mobile" && props.size === "Footnote",
        [styles.mobileCaption1]:
          platform === "Mobile" && props.size === "Caption1",
        [styles.mobileCaption2]:
          platform === "Mobile" && props.size === "Caption2",

        [styles.mobileLightOpaquePrimary]:
          platform === "Mobile" &&
          mode === "Light" &&
          color === "Primary" &&
          variant === "Opaque",
        [styles.mobileLightOpaqueSecondary]:
          platform === "Mobile" &&
          mode === "Light" &&
          color === "Secondary" &&
          variant === "Opaque",
        [styles.mobileLightOpaqueTertiary]:
          platform === "Mobile" &&
          mode === "Light" &&
          color === "Tertiary" &&
          variant === "Opaque",
        [styles.mobileLightOpaqueQuarternary]:
          platform === "Mobile" &&
          mode === "Light" &&
          color === "Quarternary" &&
          variant === "Opaque",
        [styles.mobileDarkOpaquePrimary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Primary" &&
          variant === "Opaque",
        [styles.mobileDarkOpaqueSecondary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Secondary" &&
          variant === "Opaque",
        [styles.mobileDarkOpaqueTertiary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Tertiary" &&
          variant === "Opaque",
        [styles.mobileDarkOpaqueQuarternary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Quarternary" &&
          variant === "Opaque",
        [styles.mobileLightVibrantPrimary]:
          platform === "Mobile" &&
          mode === "Light" &&
          color === "Primary" &&
          variant === "Vibrant",
        [styles.mobileLightVibrantSecondary]:
          platform === "Mobile" &&
          mode === "Light" &&
          color === "Secondary" &&
          variant === "Vibrant",
        [styles.mobileLightVibrantTertiary]:
          platform === "Mobile" &&
          mode === "Light" &&
          color === "Tertiary" &&
          variant === "Vibrant",
        [styles.mobileDarkVibrantPrimary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Primary" &&
          variant === "Vibrant",
        [styles.mobileDarkVibrantSecondary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Secondary" &&
          variant === "Vibrant",
        [styles.mobileDarkVibrantTertiary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Tertiary" &&
          variant === "Vibrant",

        [styles.mobileDarkVibrantQuarternary]:
          platform === "Mobile" &&
          mode === "Dark" &&
          color === "Quarternary" &&
          variant === "Vibrant",
      })}
    >
      {props.value}
    </div>
  );
};
