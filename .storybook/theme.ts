import { create } from "storybook/theming";

const BG = "#09090B";
const BG_CONTENT = "#111111";
const BG_SUBTLE = "#18181b";
const BG_SELECTED = "#27272a";

const FG = "#fafafa";
const FG_MUTED = "#71717a";

const PRIMARY = "#61DAFB";
const SECONDARY = "#673AB8";

export default create({
  base: "dark",

  brandTitle: "Simple Motion React",
  brandImage: "/images/Brand.png",
  brandTarget: "_self",
  fontBase: "Inter, sans-serif",
  fontCode: '"Cascadia Code", monospace',

  colorPrimary: PRIMARY,
  colorSecondary: SECONDARY,

  appBg: BG,
  appContentBg: BG_CONTENT,
  appPreviewBg: BG_CONTENT,
  appBorderColor: BG_SELECTED,
  appBorderRadius: 8,

  textColor: FG,
  textMutedColor: FG_MUTED,
  textInverseColor: BG,

  barBg: BG_SUBTLE,
  barHoverColor: PRIMARY,
  barSelectedColor: SECONDARY,
  barTextColor: FG_MUTED,

  inputBg: BG_SUBTLE,
  inputBorder: BG_SELECTED,
  inputTextColor: FG,
  inputBorderRadius: 4,

  buttonBg: BG_SELECTED,
  buttonBorder: BG_SELECTED,

  booleanBg: BG_SUBTLE,
  booleanSelectedBg: BG_SELECTED,
});
