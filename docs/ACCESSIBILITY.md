# Accessibility Guide

This document outlines the accessibility features and best practices implemented in the Just Eat Restaurant Demo app.

## Overview

The application has been built with accessibility as a core principle, following WCAG 2.1 AA guidelines. We've implemented comprehensive keyboard navigation, screen reader support, and visual accessibility features.

## Key Accessibility Features

### 1. Semantic HTML & ARIA

- **Semantic markup**: Proper use of HTML5 elements (`<nav>`, `<main>`, `<section>`, `<header>`, etc.)
- **ARIA roles**: Applied where semantic HTML isn't sufficient (`role="button"`, `role="dialog"`, `role="list"`)
- **ARIA properties**: Extensive use of `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live`
- **ARIA states**: Dynamic states like `aria-current`, `aria-expanded`, `aria-checked`

### 2. Keyboard Navigation

- **Tab order**: Logical tab sequence through all interactive elements
- **Focus management**: Proper focus handling in modals and drawers
- **Keyboard shortcuts**: Enter and Space key support for custom interactive elements
- **Escape key**: Closes modals and drawers
- **Focus indicators**: High-contrast, visible focus outlines

### 3. Screen Reader Support

- **Live regions**: `aria-live` for dynamic content updates
- **Descriptive labels**: Clear, contextual labels for all interactive elements
- **Status announcements**: Loading states, error messages, and result counts
- **Screen reader only content**: Hidden descriptive text using `.sr-only` class

### 4. Visual Accessibility

- **Color contrast**: Meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- **Focus indicators**: High-contrast, 2px outlines with appropriate offset
- **Text sizing**: Responsive text that scales properly
- **High contrast mode**: Support for `prefers-contrast: high`

### 5. Motion & Animation

- **Reduced motion**: Respects `prefers-reduced-motion: reduce`
- **Essential animations only**: Loading indicators and smooth page transitions
- **No auto-playing content**: User-controlled interactions only

## Component-Specific Accessibility

### SearchBox
- Role and aria-label for screen readers
- Clear button with descriptive label
- Proper keyboard navigation

### FiltersSidebar & FiltersSidebarDrawer
- Dialog role with modal behavior
- Focus management and trap
- Escape key handling
- ARIA labels for toggle switches
- Screen reader descriptions for filter states

### DetailCard (Restaurant Cards)
- Button role with keyboard navigation
- Comprehensive aria-label with restaurant details
- Proper tab order

### Pagination
- Navigation landmark
- Current page indication with aria-current
- Descriptive button labels
- Disabled state handling

### Forms (PostcodeSelect)
- Proper form structure with semantic elements
- Required field indication
- Error states and validation
- Keyboard submission support

### Maps (MapView)
- Descriptive iframe title
- Container with img role and descriptive label
- Loading optimization

### Loading & Error States
- Live regions for status updates
- Role="status" and role="alert" appropriately used
- Descriptive content for screen readers

## Testing

### Manual Testing
1. **Keyboard navigation**: Tab through all interactive elements
2. **Screen reader testing**: Test with VoiceOver (macOS), NVDA (Windows), or ORCA (Linux)
3. **Zoom testing**: Ensure usability at 200% zoom
4. **High contrast testing**: Test in high contrast mode

### Automated Testing
- ESLint accessibility rules (jsx-a11y plugin)
- Jest tests include accessibility assertions
- Playwright E2E tests include accessibility checks

### Browser Support
- Modern browsers with accessibility API support
- Assistive technology compatibility
- Progressive enhancement approach

## Best Practices Implemented

1. **Semantic HTML first**: Use proper HTML elements before adding ARIA
2. **Progressive enhancement**: Core functionality works without JavaScript
3. **Clear focus indicators**: Always visible, high contrast
4. **Meaningful error messages**: Clear, actionable feedback
5. **Consistent navigation patterns**: Predictable user experience
6. **Responsive design**: Works on all device sizes
7. **Performance**: Fast loading reduces cognitive load

## Common Patterns

### Focus Management
```tsx
// Focus trap in modals
useEffect(() => {
  if (open) {
    const drawer = document.querySelector('[role="dialog"]');
    if (drawer) {
      (drawer as HTMLElement).focus();
    }
  }
}, [open]);
```

### ARIA Labeling
```tsx
// Comprehensive labeling
<button
  aria-label={`${name} restaurant - ${rating} stars, ${deliveryTime} delivery`}
  aria-describedby="card-help"
>
```

### Live Regions
```tsx
// Status updates
<div role="status" aria-live="polite">
  Loading restaurants...
</div>
```

## Future Improvements

1. **Voice control**: Add support for voice navigation
2. **Gesture support**: Touch gestures for mobile accessibility
3. **Personalization**: User preference storage for accessibility settings
4. **Advanced ARIA**: More sophisticated ARIA patterns as needed
5. **Language support**: Multi-language accessibility features

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Contact

For accessibility questions or to report issues, please open an issue in the project repository with the "accessibility" label.
