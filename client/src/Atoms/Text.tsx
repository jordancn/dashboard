import { useDeviceData } from "@/Providers/DeviceDataProvider";
import { useSystemTheme } from "@/Utils/use-system-theme/use-system-theme";
import classNames from "classnames";
import styles from "./Text.module.css";

export type Platform = "Desktop" | "Mobile";
export type Mode = "light" | "dark";
export type Variant = "Opaque" | "Vibrant";
export type Ordinal = "Primary" | "Secondary" | "Tertiary" | "Quarternary";
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
  ordinal?: Ordinal;
  variant?: Variant;
  weight?: Weight;
  style?: Style;
  alignment?: Alignment;
  size?: Size;
  value: string;
}) => {
  const deviceData = useDeviceData();
  const systemTheme = useSystemTheme();

  if (deviceData.status !== "LOADED") {
    return null;
  }

  const isMobile = deviceData.value.isMobile;
  const isDesktop = !isMobile;

  const mode = props.mode || systemTheme;

  const ordinal = props.ordinal || "Primary";
  const variant = props.variant || "Opaque";
  const weight = props.weight || "Regular";
  const style = props.style || "Normal";
  const alignment = props.alignment || "Left";

  console.log(props);

  console.log(mode, ordinal, variant, weight, style, alignment);

  console.log(`${isDesktop ? "desktop" : "mobile"}${mode}${variant}${ordinal}`);

  const className = classNames(styles.text, {
    // Style
    [styles.normalStyle]: style === "Normal",
    [styles.italicStyle]: style !== "Normal",

    // Weight
    [styles.regularWeight]: weight === "Regular",
    [styles.boldWeight]: weight !== "Regular",

    // Alignment
    [styles.leftAlignment]: alignment === "Left",
    [styles.centerAlignment]: alignment === "Center",
    [styles.rightAlignment]: alignment === "Right",

    // Desktop
    ...(isDesktop
      ? {
          // Size
          [styles.desktopLargeTitle]: props.size === "LargeTitle",
          [styles.desktopTitle1]: props.size === "Title1",
          [styles.desktopTitle2]: props.size === "Title2",
          [styles.desktopTitle3]: props.size === "Title3",
          [styles.desktopHeadline]: props.size === "Headline",
          [styles.desktopBody]: props.size === "Body",
          [styles.desktopCallout]: props.size === "Callout",
          [styles.desktopSubheadline]: props.size === "Subheadline",
          [styles.desktopFootnote]: props.size === "Footnote",
          [styles.desktopCaption1]: props.size === "Caption1",
          [styles.desktopCaption2]: props.size === "Caption2",

          // Colors
          [styles.desktopLightOpaquePrimary]:
            mode === "light" && ordinal === "Primary" && variant === "Opaque",
          [styles.desktopLightOpaqueSecondary]:
            mode === "light" && ordinal === "Secondary" && variant === "Opaque",
          [styles.desktopLightOpaqueTertiary]:
            mode === "light" && ordinal === "Tertiary" && variant === "Opaque",
          [styles.desktopLightOpaqueQuarternary]:
            mode === "light" &&
            ordinal === "Quarternary" &&
            variant === "Opaque",
          [styles.desktopDarkOpaquePrimary]:
            mode === "dark" && ordinal === "Primary" && variant === "Opaque",
          [styles.desktopDarkOpaqueSecondary]:
            mode === "dark" && ordinal === "Secondary" && variant === "Opaque",
          [styles.desktopDarkOpaqueTertiary]:
            mode === "dark" && ordinal === "Tertiary" && variant === "Opaque",
          [styles.desktopDarkOpaqueQuarternary]:
            mode === "dark" &&
            ordinal === "Quarternary" &&
            variant === "Opaque",
          [styles.desktopLightVibrantPrimary]:
            mode === "light" && ordinal === "Primary" && variant === "Vibrant",
          [styles.desktopLightVibrantSecondary]:
            mode === "light" &&
            ordinal === "Secondary" &&
            variant === "Vibrant",
          [styles.desktopLightVibrantTertiary]:
            mode === "light" && ordinal === "Tertiary" && variant === "Vibrant",
          [styles.desktopDarkVibrantPrimary]:
            mode === "dark" && ordinal === "Primary" && variant === "Vibrant",
          [styles.desktopDarkVibrantSecondary]:
            mode === "dark" && ordinal === "Secondary" && variant === "Vibrant",
          [styles.desktopDarkVibrantTertiary]:
            mode === "dark" && ordinal === "Tertiary" && variant === "Vibrant",
          [styles.desktopDarkVibrantQuarternary]:
            mode === "dark" &&
            ordinal === "Quarternary" &&
            variant === "Vibrant",
        }
      : {}),

    // Mobile
    ...(isMobile
      ? {
          // Size
          [styles.mobileLargeTitle]: props.size === "LargeTitle",
          [styles.mobileTitle1]: props.size === "Title1",
          [styles.mobileTitle2]: props.size === "Title2",
          [styles.mobileTitle3]: props.size === "Title3",
          [styles.mobileHeadline]: props.size === "Headline",
          [styles.mobileBody]: props.size === "Body",
          [styles.mobileCallout]: props.size === "Callout",
          [styles.mobileSubheadline]: props.size === "Subheadline",
          [styles.mobileFootnote]: props.size === "Footnote",
          [styles.mobileCaption1]: props.size === "Caption1",
          [styles.mobileCaption2]: props.size === "Caption2",

          // Colors
          [styles.mobileLightOpaquePrimary]:
            mode === "light" && ordinal === "Primary" && variant === "Opaque",
          [styles.mobileLightOpaqueSecondary]:
            mode === "light" && ordinal === "Secondary" && variant === "Opaque",
          [styles.mobileLightOpaqueTertiary]:
            mode === "light" && ordinal === "Tertiary" && variant === "Opaque",
          [styles.mobileLightOpaqueQuarternary]:
            mode === "light" &&
            ordinal === "Quarternary" &&
            variant === "Opaque",
          [styles.mobileDarkOpaquePrimary]:
            mode === "dark" && ordinal === "Primary" && variant === "Opaque",
          [styles.mobileDarkOpaqueSecondary]:
            mode === "dark" && ordinal === "Secondary" && variant === "Opaque",
          [styles.mobileDarkOpaqueTertiary]:
            mode === "dark" && ordinal === "Tertiary" && variant === "Opaque",
          [styles.mobileDarkOpaqueQuarternary]:
            mode === "dark" &&
            ordinal === "Quarternary" &&
            variant === "Opaque",
          [styles.mobileLightVibrantPrimary]:
            mode === "light" && ordinal === "Primary" && variant === "Vibrant",
          [styles.mobileLightVibrantSecondary]:
            mode === "light" &&
            ordinal === "Secondary" &&
            variant === "Vibrant",
          [styles.mobileLightVibrantTertiary]:
            mode === "light" && ordinal === "Tertiary" && variant === "Vibrant",
          [styles.mobileDarkVibrantPrimary]:
            mode === "dark" && ordinal === "Primary" && variant === "Vibrant",
          [styles.mobileDarkVibrantSecondary]:
            mode === "dark" && ordinal === "Secondary" && variant === "Vibrant",
          [styles.mobileDarkVibrantTertiary]:
            mode === "dark" && ordinal === "Tertiary" && variant === "Vibrant",
          [styles.mobileDarkVibrantQuarternary]:
            mode === "dark" &&
            ordinal === "Quarternary" &&
            variant === "Vibrant",
        }
      : {}),
  });

  return <div className={className}>{props.value}</div>;
};
