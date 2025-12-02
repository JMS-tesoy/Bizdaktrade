"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Activity, Target, BarChart3, Percent } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const equityData = [
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
  {
    title: "Total Return",
    value: "+127.4%",
    change: "+12.3%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Win Rate",
    value: "68.7%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Target,
  },
  {
    title: "Profit Factor",
    value: "2.34",
    change: "+0.12",
    changeType: "positive" as const,
    icon: BarChart3,
  },
  {
    title: "Max Drawdown",
    value: "12.3%",
    change: "-1.2%",
    changeType: "negative" as const,
    icon: Percent,
  },
  {
    title: "Total Trades",
    value: "1,247",
    change: "+89",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    title: "Avg Trade",
    value: "+$18.42",
    change: "+$2.10",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function PerformanceStats() {
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
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData}>
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                            <p className="text-sm font-medium">${payload[0].value?.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{payload[0].payload.month} 2024</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke="hsl(var(--chart-2))"
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
