# Platforms

`tokens.json` is the source. Generate platform code from it, by hand for small projects, or with Style Dictionary (optional) for larger ones. Generated files get a header comment: `Generated from tokens.json. Edit tokens.json, not this file.`

## Web (CSS custom properties)

```css
:root {
  /* primitives */
  --color-primary-600: #2f5bd3;
  --color-neutral-50: #f7f8fa;
  --color-neutral-900: #17191e;
  --space-4: 1rem;
  --radius-md: 0.5rem;
  --font-body: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* semantic, light */
  --bg: var(--color-neutral-50);
  --text: var(--color-neutral-900);
  --primary: var(--color-primary-600);
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: var(--color-neutral-950);
    --text: var(--color-neutral-50);
    --primary: var(--color-primary-400);
  }
}
:root[data-theme="dark"] {
  --bg: var(--color-neutral-950);
  --text: var(--color-neutral-50);
  --primary: var(--color-primary-400);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

Web conventions: `rem` for type and spacing, logical properties, `:focus-visible`, `font-display: swap` and preload the body font, `clamp()` for fluid display type, container queries for components.

### Tailwind (v4, CSS first)

```css
@import "tailwindcss";
@theme {
  --color-primary-600: #2f5bd3;
  --color-bg: var(--bg);
  --color-text: var(--text);
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --radius-md: 0.5rem;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

Tailwind v3: put the same values under `theme.extend` in `tailwind.config.js`, colors pointing at `var(--...)`. Use semantic classes (`bg-bg`, `text-text`), not primitives, in components. With shadcn/ui, map tokens to its variables (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--muted`, `--border`, `--ring`, `--radius`).

## iOS, iPadOS, macOS (SwiftUI)

```swift
// Generated from tokens.json. Edit tokens.json, not this file.
import SwiftUI

extension Color {
    static let brandPrimary = Color("Primary")      // Asset catalog color set with Any and Dark appearances
    static let textPrimary = Color(.label)          // Prefer system semantic colors for text and backgrounds
}

enum Space { static let s2: CGFloat = 8; static let s4: CGFloat = 16; static let s6: CGFloat = 24 }
enum Radius { static let md: CGFloat = 12; static let lg: CGFloat = 20 }

extension Font {
    static let brandTitle = Font.custom("Fraunces", size: 28, relativeTo: .title)  // scales with Dynamic Type
}

// App wide accent
// WindowGroup { ContentView().tint(.brandPrimary) }
```

Conventions: put brand colors in the asset catalog with light, dark and high contrast variants; use system `label`, `secondaryLabel`, `systemBackground` for text and surfaces unless the brand needs custom; `RoundedRectangle(cornerRadius:style: .continuous)`; `.font(.body)` text styles; SF Symbols with `.symbolRenderingMode`; safe areas; `.sensoryFeedback` for haptics. If `figma:figma-swiftui` is installed, use it for Figma to SwiftUI work.

## Android (Jetpack Compose, Material 3)

```kotlin
// Generated from tokens.json. Edit tokens.json, not this file.
private val Light = lightColorScheme(
    primary = Color(0xFF2F5BD3),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFDCE4FB),
    onPrimaryContainer = Color(0xFF0E2257),
    background = Color(0xFFF7F8FA),
    onBackground = Color(0xFF17191E),
)
private val Dark = darkColorScheme(
    primary = Color(0xFF8FA9F0),
    onPrimary = Color(0xFF0E2257),
    background = Color(0xFF0D0F12),
    onBackground = Color(0xFFF7F8FA),
)

val BrandShapes = Shapes(small = RoundedCornerShape(8.dp), medium = RoundedCornerShape(12.dp), large = RoundedCornerShape(24.dp))

@Composable
fun BrandTheme(dynamic: Boolean = false, content: @Composable () -> Unit) {
    val dark = isSystemInDarkTheme()
    val ctx = LocalContext.current
    val scheme = when {
        dynamic && Build.VERSION.SDK_INT >= 31 -> if (dark) dynamicDarkColorScheme(ctx) else dynamicLightColorScheme(ctx)
        dark -> Dark
        else -> Light
    }
    MaterialTheme(colorScheme = scheme, typography = BrandTypography, shapes = BrandShapes, content = content)
}
```

Conventions: `sp` for text, `dp` for layout, edge to edge with `WindowInsets`, predictive back, `Modifier.minimumInteractiveComponentSize()`, window size classes for adaptive layouts. For One UI flavor, add a collapsing large header and bottom aligned actions.

## React Native and Expo

```ts
// theme.ts, generated from tokens.json
export const tokens = {
  light: { bg: "#F7F8FA", text: "#17191E", primary: "#2F5BD3" },
  dark:  { bg: "#0D0F12", text: "#F7F8FA", primary: "#8FA9F0" },
  space: { 2: 8, 4: 16, 6: 24 },
  radius: { md: 12, lg: 20 },
} as const;

import { useColorScheme } from "react-native";
export const useTheme = () => tokens[useColorScheme() === "dark" ? "dark" : "light"];
```

Conventions: `Platform.select` for iOS vs Android differences (tab bar style, back, haptics), `react-native-safe-area-context`, `allowFontScaling` on (default), `accessibilityRole` and `accessibilityLabel`, `expo-font` for brand fonts. Use `expo:expo-ui` or `expo:expo-native-ui` for native controls, `expo:expo-design-system` for a shared component library, `expo:expo-animation` for motion when installed.

## Flutter

```dart
// Generated from tokens.json. Edit tokens.json, not this file.
final lightScheme = ColorScheme.fromSeed(seedColor: const Color(0xFF2F5BD3), brightness: Brightness.light)
    .copyWith(surface: const Color(0xFFF7F8FA), onSurface: const Color(0xFF17191E));
final darkScheme = ColorScheme.fromSeed(seedColor: const Color(0xFF2F5BD3), brightness: Brightness.dark);

ThemeData brandTheme(ColorScheme s) => ThemeData(
  useMaterial3: true,
  colorScheme: s,
  textTheme: GoogleFonts.interTextTheme(),
  cardTheme: CardTheme(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
);
```

Conventions: `Theme.of(context).colorScheme` in widgets, never hex; `MediaQuery.textScalerOf`; Cupertino widgets on iOS where native feel matters (`.adaptive` constructors); `Semantics` widget for labels.

## Windows and desktop (WinUI 3, Fluent)

```xml
<!-- Generated from tokens.json. Edit tokens.json, not this file. -->
<ResourceDictionary>
  <ResourceDictionary.ThemeDictionaries>
    <ResourceDictionary x:Key="Light">
      <Color x:Key="BrandPrimaryColor">#2F5BD3</Color>
    </ResourceDictionary>
    <ResourceDictionary x:Key="Dark">
      <Color x:Key="BrandPrimaryColor">#8FA9F0</Color>
    </ResourceDictionary>
    <ResourceDictionary x:Key="HighContrast">
      <Color x:Key="BrandPrimaryColor">{ThemeResource SystemColorHighlightColor}</Color>
    </ResourceDictionary>
  </ResourceDictionary.ThemeDictionaries>
  <CornerRadius x:Key="ControlCornerRadius">4</CornerRadius>
  <CornerRadius x:Key="OverlayCornerRadius">8</CornerRadius>
</ResourceDictionary>
```

Conventions: Mica backdrop on main window, Acrylic on flyouts, `NavigationView`, keyboard accelerators, high contrast theme support. Electron and Tauri apps: use the web tokens, match the OS window chrome, respect system accent where it fits.

## Figma

Export tokens to Figma variables (collections: Primitives, Theme with Light and Dark modes). With the Figma connector installed, use `figma:figma-generate-library` to build the variable collections and components from tokens.json, and `figma:figma-generate-design` to lay out key screens.
