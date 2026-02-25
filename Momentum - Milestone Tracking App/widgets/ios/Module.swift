import ExpoModulesCore

public class ExpoWidgetsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoWidgets")

    AsyncFunction("reloadAll") { () -> Void in
      DispatchQueue.main.async {
        if #available(iOS 14.0, *) {
          #if canImport(WidgetKit)
          import WidgetKit
          WidgetCenter.shared.reloadAllTimelines()
          #endif
        }
      }
    }

    AsyncFunction("reloadTimelines") { (kind: String) -> Void in
      DispatchQueue.main.async {
        if #available(iOS 14.0, *) {
          #if canImport(WidgetKit)
          import WidgetKit
          WidgetCenter.shared.reloadTimelines(ofKind: kind)
          #endif
        }
      }
    }
  }
}