
import { ArrowRight, Check, FileText, CircleDollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FinancialLiteracy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Financial Literacy Development
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Delivered with the Three-Thirds Learning Cycle: Review → Discover → Plan for lasting change
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">About the Program</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Sustainable money habits come from consistent reflection, actionable knowledge, and immediate practice.
                  Over 6 weeks you'll work through a condensed, field-tested curriculum—adapted from Building Your Finances God's Way for a broad audience—using the Three-Thirds Learning Cycle each session:
                </p>
                
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border-collapse border border-sage-200">
                    <thead>
                      <tr className="bg-sage-50">
                        <th className="border border-sage-200 px-4 py-2 text-sage-700">Learning Segment</th>
                        <th className="border border-sage-200 px-4 py-2 text-sage-700">What Happens</th>
                        <th className="border border-sage-200 px-4 py-2 text-sage-700">Benefit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-sage-200 px-4 py-2 font-medium">Review</td>
                        <td className="border border-sage-200 px-4 py-2">Celebrate last week's wins, troubleshoot challenges, measure progress</td>
                        <td className="border border-sage-200 px-4 py-2">Accountability keeps momentum high</td>
                      </tr>
                      <tr>
                        <td className="border border-sage-200 px-4 py-2 font-medium">Discover</td>
                        <td className="border border-sage-200 px-4 py-2">30-minute interactive lesson + real-life story or demo</td>
                        <td className="border border-sage-200 px-4 py-2">Delivers bite-sized concepts you can remember</td>
                      </tr>
                      <tr>
                        <td className="border border-sage-200 px-4 py-2 font-medium">Plan & Practice</td>
                        <td className="border border-sage-200 px-4 py-2">Hands-on lab and SMART goal-setting</td>
                        <td className="border border-sage-200 px-4 py-2">Turns knowledge into repeatable skills you can share with others</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4">
                  Participants invest 4 hrs/week (two 90-min workshops + personal assignments). Materials work in low-tech settings—paper worksheets, group discussion, and phone follow-ups—so the course functions equally well in urban centers or rural villages.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">Core Focus Areas (6-Module Track)</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-sage-200">
                  <thead>
                    <tr className="bg-sage-50">
                      <th className="border border-sage-200 px-4 py-2 text-sage-700">Module</th>
                      <th className="border border-sage-200 px-4 py-2 text-sage-700">Session Principle</th>
                      <th className="border border-sage-200 px-4 py-2 text-sage-700">Practical Outcomes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">1 · Money Mind-set & Tracking</td>
                      <td className="border border-sage-200 px-4 py-2">Money is a resource to manage, not just spend</td>
                      <td className="border border-sage-200 px-4 py-2">• Heart-attitude check<br />• Net-worth snapshot</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">2 · Spending Plan (Budget)</td>
                      <td className="border border-sage-200 px-4 py-2">A clear plan directs every unit of currency on purpose</td>
                      <td className="border border-sage-200 px-4 py-2">• Zero-based "Every Dollar Counts" budget<br />• Envelope / cash-jar system</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">3 · Debt Freedom</td>
                      <td className="border border-sage-200 px-4 py-2">Reducing debt increases options and peace of mind</td>
                      <td className="border border-sage-200 px-4 py-2">• Complete debt list & interest tally<br />• Chosen payoff strategy (snowball / avalanche)</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">4 · Margin & Contentment</td>
                      <td className="border border-sage-200 px-4 py-2">Emergency savings and contentment reduce financial stress</td>
                      <td className="border border-sage-200 px-4 py-2">• Savings target set<br />• Needs-vs-wants audit</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">5 · Income Growth & Generosity</td>
                      <td className="border border-sage-200 px-4 py-2">Skill growth expands earning capacity; sharing builds community resilience</td>
                      <td className="border border-sage-200 px-4 py-2">• Side-income brainstorm<br />• Personal giving policy & group project</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">6 · Capstone: Teach It Forward</td>
                      <td className="border border-sage-200 px-4 py-2">Teaching others reinforces and multiplies learning</td>
                      <td className="border border-sage-200 px-4 py-2">• Prepare & deliver a 15-min money lesson to family or friends</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-600 italic">
                Note: We focus on budgeting, saving, and debt reduction—topics that apply universally—rather than formal investment products that may be unavailable in some regions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">Weekly Roadmap</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-sage-200">
                  <thead>
                    <tr className="bg-sage-50">
                      <th className="border border-sage-200 px-4 py-2 text-sage-700">Week</th>
                      <th className="border border-sage-200 px-4 py-2 text-sage-700">Learning Focus</th>
                      <th className="border border-sage-200 px-4 py-2 text-sage-700">At-Home Assignment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">1</td>
                      <td className="border border-sage-200 px-4 py-2">Money Mind-set & Tracking</td>
                      <td className="border border-sage-200 px-4 py-2">Track every expenditure for 7 days</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">2</td>
                      <td className="border border-sage-200 px-4 py-2">Spending Plan</td>
                      <td className="border border-sage-200 px-4 py-2">Draft first zero-based budget</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">3</td>
                      <td className="border border-sage-200 px-4 py-2">Debt Freedom</td>
                      <td className="border border-sage-200 px-4 py-2">List debts & choose payoff order</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">4</td>
                      <td className="border border-sage-200 px-4 py-2">Margin & Contentment</td>
                      <td className="border border-sage-200 px-4 py-2">Start funding an emergency jar + 24-hour "no-spend" challenge</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">5</td>
                      <td className="border border-sage-200 px-4 py-2">Income Growth & Generosity</td>
                      <td className="border border-sage-200 px-4 py-2">Identify one skill or side-gig; plan and complete a small give-back act</td>
                    </tr>
                    <tr>
                      <td className="border border-sage-200 px-4 py-2 font-medium">6</td>
                      <td className="border border-sage-200 px-4 py-2">Capstone Share-Back</td>
                      <td className="border border-sage-200 px-4 py-2">Teach one learned concept to someone else</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-sage-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-sage-600 mb-4">Participant Snapshot</h2>
              <blockquote className="border-l-4 border-sage-300 pl-4 italic text-gray-700">
                "Before the course, money terrified me as a single mom. Now I follow a budget, beat my debt, and show other moms how to build secure futures."
                <footer className="mt-2 text-sage-500 not-italic">— A. Tursunov, 2024 Graduate</footer>
              </blockquote>
            </section>

            <div className="flex justify-center gap-4 mt-8">
              <Link to="/contact">
                <Button variant="outline" className="border-sage-300 text-sage-600 hover:bg-sage-50">
                  Request Information
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-sage-500 hover:bg-sage-600">
                  Register for the Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl text-sage-500">
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">6 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">Hybrid (Online/In-person)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commitment:</span>
                  <span className="font-medium">4 hours/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Start Date:</span>
                  <span className="font-medium">May 5, 2025</span>
                </div>
                <div className="pt-4">
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                      Request Information
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <UpcomingEvents />

            <div className="bg-white p-4 rounded-lg border border-sage-200">
              <div className="text-center text-gray-500 text-sm italic">
                Businesses Beyond Borders • Empowering entrepreneurs and communities through practical financial education
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialLiteracy;
