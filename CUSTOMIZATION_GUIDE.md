# Etsy Tag Generator: Customization Guide

This document provides detailed instructions for customizing the colors and text content of your Etsy Tag Generator application.

## Table of Contents

- [Color Customization](#color-customization)
  - [Main Gradient Colors](#main-gradient-colors)
  - [Background Colors](#background-colors)
  - [Button and UI Element Colors](#button-and-ui-element-colors)
  - [Animation and Effect Colors](#animation-and-effect-colors)
- [Text Customization](#text-customization)
  - [Main Page Content](#main-page-content)
  - [Form Labels and Buttons](#form-labels-and-buttons)
  - [Tags Section](#tags-section)
  - [Other UI Elements](#other-ui-elements)
- [Additional Customization](#additional-customization)
  - [Icons](#icons)
  - [Responsive Design Adjustments](#responsive-design-adjustments)
- [Best Practices](#best-practices)

---

## Color Customization

### Main Gradient Colors

The application uses gradient colors for main elements like headings, buttons, and the toggle switch. You can change these by modifying the following CSS in `client/src/index.css`:

#### Heading Gradient (Light Mode)

```css
/* Around line 600 */
body.light-mode h1 {
  background-image: linear-gradient(to right, #6366f1, #8b5cf6, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

#### Button Gradient (Light Mode)

```css
/* Around line 660 */
body.light-mode .flash-button {
  background: linear-gradient(to right, #6366f1, #8b5cf6, #ec4899);
  border: none;
  color: white !important;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}
```

#### Toggle Button Gradient (Light Mode)

```css
/* Around line 580 */
body.light-mode .mode-toggle-bg [data-state="checked"] {
  background: linear-gradient(to right, #6366f1, #8b5cf6) !important;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4) !important;
}

body.light-mode .mode-toggle-bg [data-state="unchecked"] {
  background: linear-gradient(to right, #8b5cf6, #ec4899) !important;
  box-shadow: 0 2px 6px rgba(236, 72, 153, 0.4) !important;
}
```

### Background Colors

#### Dark Mode Background

```css
/* Around line 350-360 */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #0f172a;
  background: radial-gradient(circle, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 70%, rgba(2,6,23,1) 100%);
  overflow: hidden;
}
```

#### Light Mode Background

```css
/* Around line 480 */
.light-anim {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  overflow: hidden;
}
```

### Button and UI Element Colors

#### Standard Buttons (Light Mode)

```css
/* Around line 720 */
body.light-mode button.bg-slate-700,
body.light-mode button.hover\:bg-slate-600 {
  background: linear-gradient(to right, #6366f1, #8b5cf6) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3) !important;
}
```

#### Tag Badges (Light Mode)

```css
/* Around line 650 */
body.light-mode .copy-tag-badge {
  background: linear-gradient(to right, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #334155;
}
```

### Animation and Effect Colors

#### Hexagon Animation

```css
/* Around line 435 */
.animated-hexagons div {
  position: absolute;
  width: 25px;
  height: 25px;
  background: transparent;
  border: 2px solid rgba(99, 102, 241, 0.4);
  animation: movehex 10s linear infinite;
}

.animated-hexagons div:nth-child(even) {
  border-color: rgba(139, 92, 246, 0.3);
  width: 20px;
  height: 20px;
  animation-duration: 15s;
}

.animated-hexagons div:nth-child(3n) {
  border-color: rgba(192, 132, 252, 0.2);
  width: 30px;
  height: 30px;
  animation-duration: 20s;
}
```

## Text Customization

### Main Page Content

To modify the main text content, edit the `client/src/pages/Home.tsx` file.

#### Main Title

```jsx
// Around line 180-190
<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
  Etsy SEO Tag Generator
</h1>
```

#### Subtitle

```jsx
// Around line 190-200
<p className="text-lg sm:text-xl max-w-2xl mx-auto text-slate-400">
  Generate optimized tags for your Etsy listings that boost visibility and increase sales
</p>
```

### Form Labels and Buttons

#### Form Labels

```jsx
// Around line 220-240
<Label className="form-label">Product Description</Label>

// Category dropdown
<Label className="form-label">Category (Optional)</Label>

// Style input field
<Label className="form-label">Style (Optional)</Label>
```

#### Generate Button

```jsx
// Around line 330
<Button type="submit" className="flash-button" disabled={isSubmitting}>
  Generate Tags
</Button>
```

### Tags Section

#### Tags Section Header

```jsx
// Around line 370
<h2 className="text-xl sm:text-2xl font-bold mb-4">
  Generated Tags ({tags.length})
</h2>
```

#### Relevance Score

```jsx
// Around line 380
<div className="flex items-center gap-1">
  <span>Relevance Score:</span>
  <span className="font-semibold">{relevanceScore}/99</span>
  <Tooltip>
    <TooltipTrigger asChild>
      <InfoIcon className="h-4 w-4 text-slate-400 cursor-help" />
    </TooltipTrigger>
    <TooltipContent className="max-w-[200px] text-xs">
      Higher scores indicate tags that are more likely to match what buyers are searching for.
    </TooltipContent>
  </Tooltip>
</div>
```

#### Action Buttons

```jsx
// Around line 400
<Button onClick={handleCopyAll} className="bg-slate-700 hover:bg-slate-600">
  Copy All Tags
</Button>

<Button onClick={handleCopyShareableLink} className="bg-slate-700 hover:bg-slate-600">
  Copy Shareable Link
</Button>
```

### Other UI Elements

#### Not Found Page

Navigate to `client/src/pages/not-found.tsx` to modify the error page content.

## Additional Customization

### Icons

The application uses icons from the Lucide React library. If you want to change icons, refer to their documentation at [lucide.dev](https://lucide.dev/) and replace the icon components.

Example of icon usage:

```jsx
// Sun icon in toggle
<Sun className="h-4 w-4 text-yellow-400" />

// Moon icon in toggle
<Moon className="h-4 w-4 text-slate-300" />

// Info icon next to relevance score
<InfoIcon className="h-4 w-4 text-slate-400 cursor-help" />
```

### Responsive Design Adjustments

Breakpoints for responsive design are defined using Tailwind CSS classes:

- `sm:` - Small devices (640px and up)
- `md:` - Medium devices (768px and up)
- `lg:` - Large devices (1024px and up)
- `xl:` - Extra large devices (1280px and up)

To adjust styles for different screen sizes, modify the corresponding classes.

## Best Practices

### Color Selection

1. **Maintain Consistency**: Use a cohesive color scheme throughout the application.
2. **Accessibility**: Ensure sufficient contrast between text and background colors.
3. **Limit Your Palette**: Use 2-3 primary colors with 1-2 accent colors.
4. **Test in Both Modes**: Verify color changes in both dark and light modes.

### Text Editing

1. **Clear Hierarchy**: Maintain a clear hierarchy with heading sizes.
2. **Concise Content**: Keep text concise, particularly for buttons and labels.
3. **Mobile Friendly**: Ensure text is readable on smaller screens.
4. **Consistent Tone**: Maintain a consistent tone and style throughout.

### Performance Considerations

1. **Animation Effects**: Complex animations can impact performance on older devices.
2. **Image Optimization**: If adding images, ensure they are optimized for web.
3. **Testing**: Always test your changes in different browsers and devices.

---

## Common Color References

| Element | Default Color | CSS Variable/Value |
|---------|--------------|-------------------|
| Primary | Purple       | #6366f1           |
| Secondary | Pink      | #ec4899           |
| Accent | Purple       | #8b5cf6           |
| Dark Background | Navy | #0f172a          |
| Dark Text | Slate     | #1e293b           |
| Light Background | White | #ffffff         |
| Light Text | Slate    | #f8fafc           |

---

For more detailed customization or assistance, please consult the source code or reach out to the developer.