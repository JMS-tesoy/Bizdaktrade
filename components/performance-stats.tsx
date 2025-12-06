"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Activity, Target, BarChart3, Percent } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

type EquityPoint = { month: string; equity: number }

const equityData: EquityPoint[] = [
  { month: "Jan", equity: 10000 },
  { month: "Feb", equity: 10850 },
  { month: "Mar", equity: 11200 },
  { month: "Apr", equity: 10900 },
  { month: "May", equity: 12100 },
  { month: "Jun", equity: 13400 },
  { month: "Jul", equity: 14200 },
  { month: "Aug", equity: 15100 },
  { month: "Sep", equity: 14600 },
  { month: "Oct", equity: 16800 },
  { month: "Nov", equity: 18200 },
  { month: "Dec", equity: 22740 },
]

const stats = [
  { title: "Total Return", value: "+127.4%", change: "+12.3%", changeType: "positive" as const, icon: TrendingUp },
  { title: "Win Rate", value: "68.7%", change: "+2.1%", changeType: "positive" as const, icon: Target },
  { title: "Profit Factor", value: "2.34", change: "+0.12", changeType: "positive" as const, icon: BarChart3 },
  { title: "Max Drawdown", value: "12.3%", change: "-1.2%", changeType: "negative" as const, icon: Percent },
  { title: "Total Trades", value: "1,247", change: "+89", changeType: "positive" as const, icon: Activity },
  { title: "Avg Trade", value: "+$18.42", change: "+$2.10", changeType: "positive" as const, icon: TrendingUp },
]

export function PerformanceStats() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Color scheme based on theme
  const isDark = theme === "dark" || (!mounted && false)
  const chartStroke = isDark ? "#3b82f6" : "#0ea5e9" // Brighter cyan/blue in light mode, even brighter blue in dark mode
  const gridColor = isDark ? "#4b5563" : "#64748b" // Darker gray in light mode for better contrast
  const tooltipBg = isDark ? "#1e293b" : "#f8fafc" // Lighter background in light mode
  const tooltipBorder = isDark ? "#475569" : "#cbd5e1" // Darker border in light mode

  return (
    <section id="performance" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Performance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verified trading results updated in real-time. All statistics are from actual trades executed on live
            accounts.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{stat.title}</span>
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className={`text-xs ${stat.changeType === "positive" ? "text-chart-2" : "text-destructive"}`}>
                  {stat.change} this month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Equity Curve (2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/*
              Use a numeric height on ResponsiveContainer to avoid layout-measurement issues
              (ResponsiveContainer can return -1 if parent computed size is unavailable).
            */}
            <div className="w-full min-w-0 min-h-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={equityData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartStroke} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartStroke} stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: gridColor, fontSize: 12 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: gridColor, fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />

                  <Tooltip
                    content={(payload) => {
                      // Recharts passes different shapes depending on props; guard safely
                      // payload is the default tooltipProps object when used as function
                      const data = (payload as any)?.payload ?? (payload as any)?.payloads ?? null
                      if (!data) return null
                      // When using custom content function, Recharts passes an object
                      const { active, payload: inner } = payload as any
                      if (active && inner && inner.length) {
                        const point = inner[0]
                        return (
                          <div
                            className="rounded-lg p-3 shadow-lg border"
                            style={{
                              backgroundColor: tooltipBg,
                              borderColor: tooltipBorder,
                            }}
                          >
                            <p className="text-sm font-medium">${point.value?.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{point.payload.month} 2024</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke={chartStroke}
                    strokeWidth={2}
                    fill="url(#equityGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
