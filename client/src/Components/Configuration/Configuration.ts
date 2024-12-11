export const SIDEBAR_WIDTH = 320;
export const PORTRAIT_WIDTH = 600;
export const TOOLBAR_HEIGHT = 90;
export const CONTENT_WIDTH = 375;
export const CARD_SIZE_HALF_WIDTH = 166.5;
export const CARD_SIZE_SINGLE_WIDTH = 343;
export const CARD_SIZE_DOUBLE_WIDTH = CARD_SIZE_SINGLE_WIDTH * 2;
export const CARD_SIZE_TRIPLE_WIDTH = CARD_SIZE_SINGLE_WIDTH * 3;
export const CARD_SIZE_QUADRUPLE_WIDTH = CARD_SIZE_SINGLE_WIDTH * 4;

export const FONT = `"SF Pro Text", "SF Pro Display", -apple-system, system-ui, BlinkMacSystemFont;`;
export const ROUNDED_FONT = `"SF Rounded", "SF Pro Text", "SF Pro Display", -apple-system, system-ui, BlinkMacSystemFont;`;
export const MONOSPACE_FONT = `"SF Mono", -apple-system, system-ui, BlinkMacSystemFont;`;

export const MOBILE_PORTRAIT_MEDIA_LOGIC = `screen and (orientation: portrait) and (max-device-width: ${PORTRAIT_WIDTH}px)`;
export const TABLET_PORTRAIT_MEDIA_LOGIC = `screen and (orientation: portrait) and (min-device-width: ${PORTRAIT_WIDTH}px)`;
export const MOBILE_LANDSCAPE_MEDIA_LOGIC = `screen and (orientation: landscape) and (max-device-width: ${PORTRAIT_WIDTH}px)`;
export const TABLET_LANDSCAPE_MEDIA_LOGIC = `screen and (orientation: landscape) and (min-device-width: ${PORTRAIT_WIDTH}px)`;

export const MOBILE_PORTRAIT_MEDIA_SELECTOR = `@media ${MOBILE_PORTRAIT_MEDIA_LOGIC}`;
export const TABLET_PORTRAIT_MEDIA_SELECTOR = `@media ${TABLET_PORTRAIT_MEDIA_LOGIC}`;
export const MOBILE_LANDSCAPE_MEDIA_SELECTOR = `@media ${MOBILE_LANDSCAPE_MEDIA_LOGIC}`;
export const TABLET_LANDSCAPE_MEDIA_SELECTOR = `@media ${TABLET_LANDSCAPE_MEDIA_LOGIC}`;

export const LIGHT_INCOME_EXPENSE_COLORS = ['#34C759', '#FF3B30', '#969696'];

export const DARK_INCOME_EXPENSE_COLORS = ['#32D74B', '#FF453A', '#858585'];

export const LIGHT_COLORS = [
  // "#FF3B30",
  '#FF9500',
  '#FFCC00',
  // "#34C759",
  '#5AC8FA',
  '#007AFF',
  '#5856D6',
  '#AF52DE',
  // "#FF2D55",
];

export const DARK_COLORS = [
  // "#FF453A",
  '#FF9F0A',
  '#FFD60A',
  // "#32D74B",
  '#64D2FF',
  '#0A84FF',
  '#5E5CE6',
  '#BF5AF2',
  // "#FF375F",
];

export const icons = {
  Personal: 'user',
  Active: 'running',
  Passive: 'bed',
  Retirement: 'umbrella-beach',
};

export const sort = {
  Personal: 1,
  Active: 2,
  Passive: 3,
  Retirement: 4,
};
