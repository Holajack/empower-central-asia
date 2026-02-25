# Widget Implementation Guide

## Overview
The Momentum app now includes cross-platform widget functionality for both iOS and Android. Users can add widgets to their home screens to quickly view their most important milestones.

## Architecture

### Core Components

1. **WidgetService** (`/services/WidgetService.ts`)
   - Manages widget data updates
   - Handles automatic refresh every hour
   - Formats data for widget consumption
   - Triggers native widget updates

2. **Native Widgets**
   - **iOS**: SwiftUI-based widget (`/widgets/ios/MomentumWidget.swift`)
   - **Android**: Kotlin-based App Widget (`/widgets/android/src/main/java/package_name/MomentumWidget.kt`)

3. **React Native Widget Component** (`/widgets/MomentWidget.tsx`)
   - Used for in-app widget previews
   - Consistent styling across platforms

## Data Flow

1. **User adds/modifies moments** → Storage system automatically calls `WidgetService.updateWidgetData()`
2. **WidgetService** → Formats moment data for widgets and stores in AsyncStorage
3. **Native widgets** → Read formatted data from shared storage
4. **Automatic updates** → Widgets refresh every hour or when data changes

## Widget Features

### Supported Sizes
- **Small**: 155x155 (iOS: systemSmall, Android: 2x2 cells)
- **Medium**: 329x155 (iOS: systemMedium, Android: 4x2 cells)  
- **Large**: 329x345 (iOS: systemLarge, Android: 4x4 cells)

### Display Content
- **Moment icon** with custom color
- **Days count** (large, bold number)
- **Days text** ("days until", "days ago", etc.)
- **Moment title** (truncated if needed)
- **App branding** ("Momentum")

### Empty State
- Shows calendar icon
- "No moments yet" message
- "Open Momentum to add" subtitle

## Configuration

### App.json Configuration
```json
{
  "plugins": [
    [
      "@bittingz/expo-widgets",
      {
        "ios": {
          "src": "./widgets/ios",
          "widgets": [
            {
              "name": "MomentumWidget",
              "displayName": "Momentum Tracker",
              "description": "Track your important milestones",
              "families": ["systemSmall", "systemMedium", "systemLarge"]
            }
          ]
        },
        "android": {
          "src": "./widgets/android",
          "widgets": [
            {
              "name": "MomentumWidget",
              "displayName": "Momentum Tracker",
              "description": "Track your important milestones"
            }
          ]
        }
      }
    ]
  ]
}
```

## File Structure

```
widgets/
├── ios/
│   ├── MomentumWidget.swift      # iOS SwiftUI widget implementation
│   └── Module.swift              # Expo module for widget reload
├── android/
│   ├── src/main/java/package_name/
│   │   └── MomentumWidget.kt     # Android widget provider
│   └── res/
│       ├── layout/
│       │   └── momentum_widget.xml
│       ├── drawable/             # Icon resources
│       ├── xml/
│       │   └── momentum_widget_info.xml
│       └── values/
│           └── strings.xml
└── MomentWidget.tsx              # React Native component
```

## Testing

### Manual Testing
1. Run `expo prebuild` to generate native projects
2. Build app for iOS/Android
3. Add widget to home screen
4. Verify widget displays current moments
5. Add/modify moments in app
6. Verify widget updates accordingly

### Integration Tests
- Use `/app/(tabs)/widget-integration-test.tsx` to verify data flow
- Use `/app/(tabs)/widget-test.tsx` to test visual layouts

## Key Features Implemented

✅ **Cross-platform widget support** (iOS & Android)
✅ **Multiple widget sizes** (Small, Medium, Large)
✅ **Automatic data synchronization** between app and widgets
✅ **Hourly refresh** to keep widgets up-to-date
✅ **Empty state handling** when no moments exist
✅ **Custom moment icons and colors** in widgets
✅ **Proper date calculations** and formatting
✅ **Native performance** using platform-specific implementations

## Troubleshooting

### Common Issues
1. **Widget not appearing**: Ensure `expo prebuild` was run after adding widget configuration
2. **Widget not updating**: Check that `WidgetService.updateWidgetData()` is being called when moments change
3. **Empty widget**: Verify moments exist in storage and widget data is being generated correctly

### Development
- Widgets only work in production builds, not in Expo development mode
- Use the test screens to verify functionality during development
- Check native logs for widget-specific errors

## Future Enhancements
- Add support for multiple moments in medium/large widgets
- Implement interactive widget actions (iOS 17+, Android 12+)
- Add widget configuration options
- Support for custom themes in widgets