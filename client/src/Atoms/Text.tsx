import { useDeviceData } from "@/Providers/DeviceDataProvider";
import { useSystemTheme } from "@/Utils/use-system-theme/use-system-theme";
import classNames from "classnames";
import { useMemo } from "react";
import styles from "./Text.module.css";

export type Platform = "Desktop" | "Mobile";
export type Mode = "light" | "dark";
export type Variant = "Opaque" | "Vibrant";
export type Ordinal = "Primary" | "Secondary" | "Tertiary" | "Quarternary";
export type Weight = "Regular" | "Bold";
export type FontStyle = "Normal" | "Italic";
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

export const Text = ({
  mode: modeProp,
  ordinal: ordinalProp,
  variant: variantProp,
  weight: weightProp,
  fontStyle: fontStyleProp,
  alignment: alignmentProp,
  size,
  value,
}: {
  mode?: Mode;
  ordinal?: Ordinal;
  variant?: Variant;
  weight?: Weight;
  fontStyle?: FontStyle;
  alignment?: Alignment;
  size?: Size;
  value: string;
}) => {
  const deviceData = useDeviceData();
  const systemTheme = useSystemTheme();

  const isMobile = useMemo(
    () => deviceData.status === "LOADED" && deviceData.value.isMobile,
    [deviceData],
  );

  const isDesktop = useMemo(
    () => deviceData.status === "LOADED" && !isMobile,
    [deviceData, isMobile],
  );

  const mode = useMemo(() => modeProp || systemTheme, [modeProp, systemTheme]);

  const ordinal = useMemo(() => ordinalProp || "Primary", [ordinalProp]);
  const variant = useMemo(() => variantProp || "Opaque", [variantProp]);
  const weight = useMemo(() => weightProp || "Regular", [weightProp]);
  const fontStyle = useMemo(() => fontStyleProp || "Normal", [fontStyleProp]);
  const alignment = useMemo(() => alignmentProp || "Left", [alignmentProp]);

  const className = useMemo(() => {
    return classNames(styles.text, {
      // Style
      [styles.normalStyle]: fontStyle === "Normal",
      [styles.italicStyle]: fontStyle !== "Normal",

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
            [styles.desktopLargeTitle]: size === "LargeTitle",
            [styles.desktopTitle1]: size === "Title1",
            [styles.desktopTitle2]: size === "Title2",
            [styles.desktopTitle3]: size === "Title3",
            [styles.desktopHeadline]: size === "Headline",
            [styles.desktopBody]: size === "Body",
            [styles.desktopCallout]: size === "Callout",
            [styles.desktopSubheadline]: size === "Subheadline",
            [styles.desktopFootnote]: size === "Footnote",
            [styles.desktopCaption1]: size === "Caption1",
            [styles.desktopCaption2]: size === "Caption2",

            // Colors
            [styles.desktopLightOpaquePrimary]:
              mode === "light" && ordinal === "Primary" && variant === "Opaque",
            [styles.desktopLightOpaqueSecondary]:
              mode === "light" &&
              ordinal === "Secondary" &&
              variant === "Opaque",
            [styles.desktopLightOpaqueTertiary]:
              mode === "light" &&
              ordinal === "Tertiary" &&
              variant === "Opaque",
            [styles.desktopLightOpaqueQuarternary]:
              mode === "light" &&
              ordinal === "Quarternary" &&
              variant === "Opaque",
            [styles.desktopDarkOpaquePrimary]:
              mode === "dark" && ordinal === "Primary" && variant === "Opaque",
            [styles.desktopDarkOpaqueSecondary]:
              mode === "dark" &&
              ordinal === "Secondary" &&
              variant === "Opaque",
            [styles.desktopDarkOpaqueTertiary]:
              mode === "dark" && ordinal === "Tertiary" && variant === "Opaque",
            [styles.desktopDarkOpaqueQuarternary]:
              mode === "dark" &&
              ordinal === "Quarternary" &&
              variant === "Opaque",
            [styles.desktopLightVibrantPrimary]:
              mode === "light" &&
              ordinal === "Primary" &&
              variant === "Vibrant",
            [styles.desktopLightVibrantSecondary]:
              mode === "light" &&
              ordinal === "Secondary" &&
              variant === "Vibrant",
            [styles.desktopLightVibrantTertiary]:
              mode === "light" &&
              ordinal === "Tertiary" &&
              variant === "Vibrant",
            [styles.desktopDarkVibrantPrimary]:
              mode === "dark" && ordinal === "Primary" && variant === "Vibrant",
            [styles.desktopDarkVibrantSecondary]:
              mode === "dark" &&
              ordinal === "Secondary" &&
              variant === "Vibrant",
            [styles.desktopDarkVibrantTertiary]:
              mode === "dark" &&
              ordinal === "Tertiary" &&
              variant === "Vibrant",
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
            [styles.mobileLargeTitle]: size === "LargeTitle",
            [styles.mobileTitle1]: size === "Title1",
            [styles.mobileTitle2]: size === "Title2",
            [styles.mobileTitle3]: size === "Title3",
            [styles.mobileHeadline]: size === "Headline",
            [styles.mobileBody]: size === "Body",
            [styles.mobileCallout]: size === "Callout",
            [styles.mobileSubheadline]: size === "Subheadline",
            [styles.mobileFootnote]: size === "Footnote",
            [styles.mobileCaption1]: size === "Caption1",
            [styles.mobileCaption2]: size === "Caption2",

            // Colors
            [styles.mobileLightOpaquePrimary]:
              mode === "light" && ordinal === "Primary" && variant === "Opaque",
            [styles.mobileLightOpaqueSecondary]:
              mode === "light" &&
              ordinal === "Secondary" &&
              variant === "Opaque",
            [styles.mobileLightOpaqueTertiary]:
              mode === "light" &&
              ordinal === "Tertiary" &&
              variant === "Opaque",
            [styles.mobileLightOpaqueQuarternary]:
              mode === "light" &&
              ordinal === "Quarternary" &&
              variant === "Opaque",
            [styles.mobileDarkOpaquePrimary]:
              mode === "dark" && ordinal === "Primary" && variant === "Opaque",
            [styles.mobileDarkOpaqueSecondary]:
              mode === "dark" &&
              ordinal === "Secondary" &&
              variant === "Opaque",
            [styles.mobileDarkOpaqueTertiary]:
              mode === "dark" && ordinal === "Tertiary" && variant === "Opaque",
            [styles.mobileDarkOpaqueQuarternary]:
              mode === "dark" &&
              ordinal === "Quarternary" &&
              variant === "Opaque",
            [styles.mobileLightVibrantPrimary]:
              mode === "light" &&
              ordinal === "Primary" &&
              variant === "Vibrant",
            [styles.mobileLightVibrantSecondary]:
              mode === "light" &&
              ordinal === "Secondary" &&
              variant === "Vibrant",
            [styles.mobileLightVibrantTertiary]:
              mode === "light" &&
              ordinal === "Tertiary" &&
              variant === "Vibrant",
            [styles.mobileDarkVibrantPrimary]:
              mode === "dark" && ordinal === "Primary" && variant === "Vibrant",
            [styles.mobileDarkVibrantSecondary]:
              mode === "dark" &&
              ordinal === "Secondary" &&
              variant === "Vibrant",
            [styles.mobileDarkVibrantTertiary]:
              mode === "dark" &&
              ordinal === "Tertiary" &&
              variant === "Vibrant",
            [styles.mobileDarkVibrantQuarternary]:
              mode === "dark" &&
              ordinal === "Quarternary" &&
              variant === "Vibrant",
          }
        : {}),
    });
  }, [
    isDesktop,
    isMobile,
    mode,
    ordinal,
    size,
    variant,
    weight,
    fontStyle,
    alignment,
  ]);

  if (deviceData.status !== "LOADED") {
    return null;
  }

  return <div className={className}>{value}</div>;
};
