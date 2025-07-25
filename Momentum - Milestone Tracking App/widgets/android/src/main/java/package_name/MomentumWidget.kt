package com.momentum.milestonetracker.widgets

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.SharedPreferences
import android.graphics.Color
import android.widget.RemoteViews
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.momentum.milestonetracker.R

data class MomentData(
    val id: String,
    val title: String,
    val days: Int,
    val daysText: String,
    val type: String,
    val color: String,
    val icon: String
)

data class WidgetTheme(
    val font: String,
    val backgroundColor: List<String>?,
    val backgroundColorSingle: String?,
    val textColor: String
)

data class WidgetData(
    val moments: List<MomentData>,
    val theme: WidgetTheme,
    val lastUpdated: Long
)

class MomentumWidgetProvider : AppWidgetProvider() {
    
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    private fun updateAppWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int
    ) {
        // Load widget data from SharedPreferences
        val widgetData = loadWidgetData(context)
        val moments = widgetData?.moments ?: emptyList()
        val theme = widgetData?.theme
        
        // Create RemoteViews object
        val views = RemoteViews(context.packageName, R.layout.momentum_widget)
        
        // Apply theme colors
        val textColor = if (theme != null) {
            try {
                Color.parseColor(theme.textColor)
            } catch (e: IllegalArgumentException) {
                Color.WHITE
            }
        } else {
            Color.WHITE
        }
        
        if (moments.isEmpty()) {
            // Show empty state
            views.setTextViewText(R.id.widget_days_number, "")
            views.setTextViewText(R.id.widget_days_text, "No moments yet")
            views.setTextViewText(R.id.widget_title, "Open Momentum to add")
            views.setImageViewResource(R.id.widget_icon, R.drawable.ic_calendar)
            
            // Apply theme text colors
            views.setTextColor(R.id.widget_days_text, textColor)
            views.setTextColor(R.id.widget_title, textColor)
        } else {
            val moment = moments.first()
            
            // Set moment data
            views.setTextViewText(R.id.widget_days_number, moment.days.toString())
            views.setTextViewText(R.id.widget_days_text, moment.daysText)
            views.setTextViewText(R.id.widget_title, moment.title)
            
            // Set icon
            val iconResource = getIconResource(moment.icon)
            views.setImageViewResource(R.id.widget_icon, iconResource)
            
            // Set colors
            try {
                val colorInt = Color.parseColor(moment.color)
                views.setInt(R.id.widget_icon_background, "setBackgroundColor", colorInt)
            } catch (e: IllegalArgumentException) {
                // Fallback to default color
                views.setInt(R.id.widget_icon_background, "setBackgroundColor", Color.parseColor("#FF6B6B"))
            }
            
            // Apply theme text colors
            views.setTextColor(R.id.widget_days_number, textColor)
            views.setTextColor(R.id.widget_days_text, textColor)
            views.setTextColor(R.id.widget_title, textColor)
        }
        
        // Set app name with theme color
        views.setTextViewText(R.id.widget_app_name, "Momentum")
        views.setTextColor(R.id.widget_app_name, textColor)
        
        // Apply background theme if available
        if (theme != null) {
            applyBackgroundTheme(views, theme)
        }
        
        // Update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
    
    private fun loadWidgetData(context: Context): WidgetData? {
        val sharedPrefs = context.getSharedPreferences("momentum_widget_prefs", Context.MODE_PRIVATE)
        val widgetDataJson = sharedPrefs.getString("widgetData", null) ?: return null
        
        return try {
            val gson = Gson()
            val type = object : TypeToken<WidgetData>() {}.type
            gson.fromJson(widgetDataJson, type)
        } catch (e: Exception) {
            null
        }
    }
    
    private fun applyBackgroundTheme(views: RemoteViews, theme: WidgetTheme) {
        try {
            // Apply background color (solid color support for now, gradients would need custom drawable)
            val backgroundColorToUse = when {
                !theme.backgroundColorSingle.isNullOrEmpty() -> theme.backgroundColorSingle
                !theme.backgroundColor.isNullOrEmpty() -> theme.backgroundColor.firstOrNull()
                else -> "#F8F9FA"
            }
            
            backgroundColorToUse?.let { colorStr ->
                val backgroundColor = Color.parseColor(colorStr)
                views.setInt(R.id.widget_background, "setBackgroundColor", backgroundColor)
            }
        } catch (e: Exception) {
            // Fallback to default background
            views.setInt(R.id.widget_background, "setBackgroundColor", Color.parseColor("#F8F9FA"))
        }
    }
    
    private fun getIconResource(iconName: String): Int {
        return when (iconName) {
            "heart" -> R.drawable.ic_heart
            "calendar" -> R.drawable.ic_calendar
            "target" -> R.drawable.ic_target
            "trophy" -> R.drawable.ic_trophy
            "star" -> R.drawable.ic_star
            "rocket" -> R.drawable.ic_rocket
            "coffee" -> R.drawable.ic_coffee
            "book" -> R.drawable.ic_book
            "dumbbell" -> R.drawable.ic_dumbbell
            "graduation-cap" -> R.drawable.ic_graduation_cap
            "home" -> R.drawable.ic_home
            "briefcase" -> R.drawable.ic_briefcase
            "plane" -> R.drawable.ic_plane
            "camera" -> R.drawable.ic_camera
            "music" -> R.drawable.ic_music
            else -> R.drawable.ic_heart
        }
    }
}

// Widget configuration
class MomentumWidgetConfigure {
    companion object {
        fun updateWidgetData(context: Context, widgetData: WidgetData) {
            val sharedPrefs = context.getSharedPreferences("momentum_widget_prefs", Context.MODE_PRIVATE)
            val gson = Gson()
            val widgetDataJson = gson.toJson(widgetData)
            
            sharedPrefs.edit()
                .putString("widgetData", widgetDataJson)
                .apply()
            
            // Update all widgets
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val widgetComponent = android.content.ComponentName(context, MomentumWidgetProvider::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(widgetComponent)
            
            val provider = MomentumWidgetProvider()
            provider.onUpdate(context, appWidgetManager, appWidgetIds)
        }
    }
}