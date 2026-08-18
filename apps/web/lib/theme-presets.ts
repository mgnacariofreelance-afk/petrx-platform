export type ThemePresetId = "teal" | "blue" | "purple" | "amber" | "slate";

type PresetColors = { primary: string; primaryDark: string; soft: string };
type Preset = { label: string; light: PresetColors; dark: PresetColors };

export const THEME_PRESETS: Record<ThemePresetId, Preset> = {
  teal: {
    label: "Teal (Default)",
    light: { primary: "#0e7c66", primaryDark: "#0b6353", soft: "#ecfdf5" },
    dark: { primary: "#2dbe9d", primaryDark: "#58d1b6", soft: "#14332c" },
  },
  blue: {
    label: "Ocean Blue",
    light: { primary: "#1d5fa3", primaryDark: "#154a80", soft: "#eef5fc" },
    dark: { primary: "#4c9ce0", primaryDark: "#7ab8ec", soft: "#132a3d" },
  },
  purple: {
    label: "Deep Violet",
    light: { primary: "#6b4ba3", primaryDark: "#553a85", soft: "#f4f0fb" },
    dark: { primary: "#a487d6", primaryDark: "#bda3e6", soft: "#251c3a" },
  },
  amber: {
    label: "Warm Amber",
    light: { primary: "#b5730f", primaryDark: "#8f5a0b", soft: "#fdf6ea" },
    dark: { primary: "#e0a94a", primaryDark: "#ecc373", soft: "#332510" },
  },
  slate: {
    label: "Neutral Slate",
    light: { primary: "#3f4c5a", primaryDark: "#2f3944", soft: "#f1f3f5" },
    dark: { primary: "#8b99a6", primaryDark: "#aab5bf", soft: "#1e252b" },
  },
};

export function isValidThemePreset(value: string): value is ThemePresetId {
  return value in THEME_PRESETS;
}
