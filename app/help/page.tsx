"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FitproLayout from "@/components/fitpro-layout"
import { HelpCircle, MessageSquare, Mail, Phone, Search, ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function HelpPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [faqs] = useState<FAQItem[]>([
    {
      id: "1",
      question: "How do I start a workout?",
      answer: "Go to the Workouts section, select a workout you like, and click Start. Follow the instructions for each exercise.",
    },
    {
      id: "2",
      question: "Can I track my progress?",
      answer: "Yes! Visit the Progress section to view your workout history, charts, and personal records.",
    },
    {
      id: "3",
      question: "How do I join the community?",
      answer: "You're already part of our community! Go to the Community section to share your achievements and interact with other members.",
    },
    {
      id: "4",
      question: "Is my data secure?",
      answer: "We use industry-standard encryption and security measures to protect your personal information.",
    },
    {
      id: "5",
      question: "Can I modify my workout plan?",
      answer: "Yes, you can customize any workout by adjusting reps, sets, and rest time to match your fitness level.",
    },
    {
      id: "6",
      question: "How do I reset my password?",
      answer: "Go to Settings > Security and click 'Update Password'. You'll need your current password to proceed.",
    },
  ])

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <FitproLayout role="user">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
          <p className="text-gray-400">Find answers to your questions</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="fitpro-input pl-12 py-3 rounded-xl"
          />
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="fitpro-card text-center hover:border-blue-500/50 transition-all cursor-pointer">
            <CardContent className="p-6">
              <MessageSquare className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-400 text-sm mb-4">Chat with our support team in real-time</p>
              <Button className="w-full fitpro-button text-sm rounded-lg">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="fitpro-card text-center hover:border-blue-500/50 transition-all cursor-pointer">
            <CardContent className="p-6">
              <Mail className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Email Support</h3>
              <p className="text-gray-400 text-sm mb-4">support@fitpro.com</p>
              <Button className="w-full fitpro-button text-sm rounded-lg">Send Email</Button>
            </CardContent>
          </Card>

          <Card className="fitpro-card text-center hover:border-blue-500/50 transition-all cursor-pointer">
            <CardContent className="p-6">
              <Phone className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-400 text-sm mb-4">+1 (555) 123-4567</p>
              <Button className="w-full fitpro-button text-sm rounded-lg">Call Us</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <Card
                  key={faq.id}
                  className="fitpro-card cursor-pointer hover:border-blue-500/50 transition-all"
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold flex-1">{faq.question}</h3>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>

                    {expandedFAQ === faq.id && (
                      <p className="text-gray-400 text-sm mt-4 pt-4 border-t border-slate-700">{faq.answer}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="fitpro-card">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No FAQs found matching your search</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </FitproLayout>
  )
}
