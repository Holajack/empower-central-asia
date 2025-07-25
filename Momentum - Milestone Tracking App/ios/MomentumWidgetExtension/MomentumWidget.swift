import WidgetKit
import SwiftUI

struct MomentumWidgetEntry: TimelineEntry {
    let date: Date
    let moments: [MomentData]
}

struct MomentData: Codable {
    let id: String
    let title: String
    let days: Int
    let daysText: String
    let type: String
    let color: String
    let icon: String
}

struct MomentumWidgetProvider: TimelineProvider {
    func placeholder(in context: Context) -> MomentumWidgetEntry {
        MomentumWidgetEntry(date: Date(), moments: [
            MomentData(
                id: "1",
                title: "Wedding Day",
                days: 127,
                daysText: "days until",
                type: "countdown",
                color: "#FF6B6B",
                icon: "heart"
            )
        ])
    }

    func getSnapshot(in context: Context, completion: @escaping (MomentumWidgetEntry) -> ()) {
        let entry = MomentumWidgetEntry(date: Date(), moments: loadMoments())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let currentDate = Date()
        let entry = MomentumWidgetEntry(date: currentDate, moments: loadMoments())
        
        // Update every hour
        let nextUpdate = Calendar.current.date(byAdding: .hour, value: 1, to: currentDate)!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
    
    func loadMoments() -> [MomentData] {
        // Load moments from UserDefaults shared with the main app
        let sharedDefaults = UserDefaults(suiteName: "group.com.momentum.milestonetracker")
        
        guard let data = sharedDefaults?.data(forKey: "widgetData"),
              let widgetData = try? JSONDecoder().decode(WidgetData.self, from: data) else {
            return []
        }
        
        return widgetData.moments
    }
}

struct WidgetData: Codable {
    let moments: [MomentData]
    let lastUpdated: Double
}

struct MomentumWidgetEntryView : View {
    var entry: MomentumWidgetProvider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.4, green: 0.49, blue: 0.92),
                    Color(red: 0.46, green: 0.29, blue: 0.64)
                ]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            if entry.moments.isEmpty {
                VStack {
                    Image(systemName: "calendar")
                        .font(.title2)
                        .foregroundColor(.white)
                    Text("No moments yet")
                        .font(.caption)
                        .foregroundColor(.white)
                        .fontWeight(.semibold)
                    Text("Open Momentum")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.8))
                }
            } else {
                let moment = entry.moments.first!
                
                VStack(spacing: family == .systemSmall ? 2 : 4) {
                    // Icon
                    ZStack {
                        Circle()
                            .fill(Color(hex: moment.color))
                            .frame(width: family == .systemSmall ? 24 : 32, 
                                   height: family == .systemSmall ? 24 : 32)
                        
                        Image(systemName: getSystemIcon(for: moment.icon))
                            .font(.system(size: family == .systemSmall ? 12 : 16))
                            .foregroundColor(.white)
                    }
                    
                    // Days number
                    Text("\(moment.days)")
                        .font(.system(size: family == .systemSmall ? 28 : 36, 
                                      weight: .bold, 
                                      design: .default))
                        .foregroundColor(.white)
                    
                    // Days text
                    Text(moment.daysText)
                        .font(.system(size: family == .systemSmall ? 10 : 12))
                        .foregroundColor(.white.opacity(0.9))
                    
                    // Title
                    Text(moment.title)
                        .font(.system(size: family == .systemSmall ? 12 : 16, 
                                      weight: .semibold))
                        .foregroundColor(.white)
                        .lineLimit(family == .systemSmall ? 1 : 2)
                        .multilineTextAlignment(.center)
                    
                    if family != .systemSmall {
                        Spacer(minLength: 4)
                        
                        // App name
                        Text("Momentum")
                            .font(.caption2)
                            .foregroundColor(.white.opacity(0.7))
                            .fontWeight(.medium)
                    }
                }
                .padding(family == .systemSmall ? 8 : 16)
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }
    
    func getSystemIcon(for iconName: String) -> String {
        switch iconName {
        case "heart": return "heart.fill"
        case "calendar": return "calendar"
        case "target": return "target"
        case "trophy": return "trophy.fill"
        case "star": return "star.fill"
        case "rocket": return "paperplane.fill"
        case "coffee": return "cup.and.saucer.fill"
        case "book": return "book.fill"
        case "dumbbell": return "dumbbell.fill"
        case "graduation-cap": return "graduationcap.fill"
        case "home": return "house.fill"
        case "briefcase": return "briefcase.fill"
        case "plane": return "airplane"
        case "camera": return "camera.fill"
        case "music": return "music.note"
        default: return "heart.fill"
        }
    }
}

struct MomentumWidget: Widget {
    let kind: String = "MomentumWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: MomentumWidgetProvider()) { entry in
            MomentumWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Momentum Tracker")
        .description("Track your important milestones")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

struct MomentumWidget_Previews: PreviewProvider {
    static var previews: some View {
        MomentumWidgetEntryView(entry: MomentumWidgetEntry(date: Date(), moments: [
            MomentData(
                id: "1",
                title: "Wedding Day",
                days: 127,
                daysText: "days until",
                type: "countdown",
                color: "#FF6B6B",
                icon: "heart"
            )
        ]))
        .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}