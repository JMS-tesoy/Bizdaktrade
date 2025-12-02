import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Settings, Shield, Radio, Users } from "lucide-react"

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Download Expert Advisors</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get the MT5 Expert Advisors to start your copy trading journey
            </p>
          </div>

          <Tabs defaultValue="follower" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="follower" className="gap-2">
                <Users className="h-4 w-4" />
                Follower EA
              </TabsTrigger>
              <TabsTrigger value="master" className="gap-2">
                <Radio className="h-4 w-4" />
                Master EA
              </TabsTrigger>
            </TabsList>

            {/* Follower EA Tab */}
            <TabsContent value="follower" className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Bizdak_Copier.mq5</CardTitle>
                      <CardDescription>For subscribers - Copy trades automatically</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This EA connects to our API and automatically copies all trades to your MT5 account. Requires an
                    active subscription and API key.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="/ea/Bizdak_Copier.mq5" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Follower EA
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card id="follower-installation">
                <CardHeader>
                  <CardTitle>Follower EA Installation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">1</Badge>
                      <div>
                        <p className="font-medium">Download the EA file</p>
                        <p className="text-sm text-muted-foreground">
                          Download Bizdak_Copier.mq5 using the button above
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">2</Badge>
                      <div>
                        <p className="font-medium">Open MT5 Data Folder</p>
                        <p className="text-sm text-muted-foreground">
                          In MT5, go to File → Open Data Folder → MQL5 → Experts
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">3</Badge>
                      <div>
                        <p className="font-medium">Copy the file</p>
                        <p className="text-sm text-muted-foreground">Paste Bizdak_Copier.mq5 into the Experts folder</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">4</Badge>
                      <div>
                        <p className="font-medium">Compile the EA</p>
                        <p className="text-sm text-muted-foreground">
                          Open MetaEditor, find the file and press F7 to compile
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">5</Badge>
                      <div>
                        <p className="font-medium">Enable Web Requests</p>
                        <p className="text-sm text-muted-foreground">
                          {
                            "In MT5, go to Tools → Options → Expert Advisors → Allow WebRequest for listed URL and add your API URL"
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">6</Badge>
                      <div>
                        <p className="font-medium">Attach to Chart</p>
                        <p className="text-sm text-muted-foreground">
                          Drag the EA onto any chart, enter your API key from your dashboard, and enable AutoTrading
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ... existing Follower EA Settings card ... */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Follower EA Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Parameter</th>
                          <th className="text-left py-2 font-medium">Description</th>
                          <th className="text-left py-2 font-medium">Default</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">ApiKey</td>
                          <td className="py-2">Your unique API key from dashboard</td>
                          <td className="py-2">-</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">ApiUrl</td>
                          <td className="py-2">API server URL</td>
                          <td className="py-2">https://your-domain.com</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">LotMultiplier</td>
                          <td className="py-2">Multiply signal lot size (0.5 = half, 2 = double)</td>
                          <td className="py-2">1.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">MaxLotSize</td>
                          <td className="py-2">Maximum lot size per trade</td>
                          <td className="py-2">1.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">Slippage</td>
                          <td className="py-2">Maximum allowed slippage in points</td>
                          <td className="py-2">30</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-foreground">PollInterval</td>
                          <td className="py-2">How often to check for new signals (seconds)</td>
                          <td className="py-2">5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Master EA Tab */}
            <TabsContent value="master" className="space-y-6">
              <Card className="border-chart-2/20 bg-chart-2/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                      <Radio className="h-6 w-6 text-chart-2" />
                    </div>
                    <div>
                      <CardTitle>Bizdak_Master.mq5</CardTitle>
                      <CardDescription>For signal providers - Broadcast your trades</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This EA monitors your trading activity and automatically broadcasts all trades to your followers.
                    Requires your Admin Secret key.
                  </p>
                  <Button className="w-full bg-chart-2 hover:bg-chart-2/90" asChild>
                    <a href="/ea/Bizdak_Master.mq5" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Master EA
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Admin Only</p>
                      <p className="text-sm text-muted-foreground">
                        This EA is for the master trader only. Do not share your Admin Secret with anyone. Your
                        followers should use the Follower EA instead.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card id="master-installation">
                <CardHeader>
                  <CardTitle>Master EA Installation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Badge
                        variant="secondary"
                        className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 bg-chart-2 text-chart-2-foreground"
                      >
                        1
                      </Badge>
                      <div>
                        <p className="font-medium">Download the EA file</p>
                        <p className="text-sm text-muted-foreground">
                          Download Bizdak_Master.mq5 using the button above
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge
                        variant="secondary"
                        className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 bg-chart-2 text-chart-2-foreground"
                      >
                        2
                      </Badge>
                      <div>
                        <p className="font-medium">Open MT5 Data Folder</p>
                        <p className="text-sm text-muted-foreground">
                          In MT5, go to File → Open Data Folder → MQL5 → Experts
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge
                        variant="secondary"
                        className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 bg-chart-2 text-chart-2-foreground"
                      >
                        3
                      </Badge>
                      <div>
                        <p className="font-medium">Copy and Compile</p>
                        <p className="text-sm text-muted-foreground">
                          Paste the file into Experts folder, open MetaEditor and press F7 to compile
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge
                        variant="secondary"
                        className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 bg-chart-2 text-chart-2-foreground"
                      >
                        4
                      </Badge>
                      <div>
                        <p className="font-medium">Enable Web Requests</p>
                        <p className="text-sm text-muted-foreground">
                          {"In MT5, go to Tools → Options → Expert Advisors → Allow WebRequest and add your API URL"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge
                        variant="secondary"
                        className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 bg-chart-2 text-chart-2-foreground"
                      >
                        5
                      </Badge>
                      <div>
                        <p className="font-medium">Configure and Attach</p>
                        <p className="text-sm text-muted-foreground">
                          Drag the EA onto any chart, enter your Admin Secret, set your API URL, and enable AutoTrading
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge
                        variant="secondary"
                        className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 bg-chart-2 text-chart-2-foreground"
                      >
                        6
                      </Badge>
                      <div>
                        <p className="font-medium">Start Trading</p>
                        <p className="text-sm text-muted-foreground">
                          The EA will automatically detect and broadcast all your trades to followers in real-time
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Master EA Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Parameter</th>
                          <th className="text-left py-2 font-medium">Description</th>
                          <th className="text-left py-2 font-medium">Default</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">AdminSecret</td>
                          <td className="py-2">Your admin secret key (keep this private!)</td>
                          <td className="py-2">-</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">ApiUrl</td>
                          <td className="py-2">Your deployed API URL</td>
                          <td className="py-2">https://your-domain.com/api/v1</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-foreground">PollInterval</td>
                          <td className="py-2">Check interval in milliseconds</td>
                          <td className="py-2">1000</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-foreground">EnableLogging</td>
                          <td className="py-2">Show trade activity in MT5 Experts tab</td>
                          <td className="py-2">true</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How the Master EA Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>The Master EA continuously monitors your MT5 account for trading activity:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      <span className="text-foreground font-medium">New Trades</span> - Automatically detected and
                      broadcast to all followers
                    </li>
                    <li>
                      <span className="text-foreground font-medium">Modifications</span> - SL/TP changes are synced in
                      real-time
                    </li>
                    <li>
                      <span className="text-foreground font-medium">Closed Trades</span> - Followers receive close
                      signals instantly
                    </li>
                    <li>
                      <span className="text-foreground font-medium">Partial Closes</span> - Lot size changes are
                      detected and synced
                    </li>
                  </ul>
                  <p>
                    All signals are sent via secure HTTPS to your API, which then distributes them to authenticated
                    followers.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}
