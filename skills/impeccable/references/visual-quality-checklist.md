# Visual Quality Checklist

## Layout

- Stable responsive constraints exist for fixed-format UI such as boards, grids, tiles, toolbars, and counters.
- No horizontal scroll on mobile unless it is an intentional data table pattern.
- Fixed headers, footers, and sidebars do not cover content.
- Spacing follows a consistent 4/8px rhythm.
- Related controls are grouped; unrelated controls have visible separation.

## Typography

- Body text is readable and does not use viewport-scaled font sizes.
- Long labels wrap or truncate intentionally with accessible full text where needed.
- Headings match the density of the surface; compact panels do not use hero-scale type.
- Letter spacing remains normal unless the existing brand system requires otherwise.

## Color And Surfaces

- Color roles are semantic: primary, secondary, surface, border, danger, success, warning, muted.
- Text contrast is sufficient in light and dark themes when both exist.
- Backgrounds are not dominated by a single hue family unless dictated by brand.
- Shadows, borders, and radius follow a consistent scale.

## Components

- Primary, secondary, destructive, disabled, loading, hover, focus, and active states are distinct.
- Icon buttons have labels or tooltips.
- Icons come from one family and share size/stroke rules.
- Cards are used for repeated items, modals, and framed tools, not as nested page-section wrappers.

## Data And Forms

- Tables support scanning: aligned columns, clear headers, readable density, empty state.
- Forms use visible labels, inline validation, helper text for complex fields, and recovery paths.
- Charts include legends/tooltips/labels and do not rely on color alone.

## Motion

- Motion is subtle, purposeful, and 150-300ms for micro-interactions.
- Reduced-motion users are respected when the stack supports it.
- Animations use transform/opacity rather than layout-changing properties.

## Evidence

- Capture or inspect at least one desktop and one mobile viewport for material UI changes.
- Check empty, loading, error, and permission-denied states when relevant.
- Record any state not verified as a known risk.
