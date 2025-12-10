"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { SendButton } from "@/components/buttons"
import { HelpCircle, Mail, Phone, Clock, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function PhysiotherapistHelp() {
	const [openFaq, setOpenFaq] = useState<string | null>(null)

	const faqs = [
		{
			id: 1,
			question: "How do I add a new patient?",
			answer: "Go to the Patients tab in your dashboard and click 'Add Patient'. Fill in their details including name, email, phone, age, and their medical condition.",
		},
		{
			id: 2,
			question: "How do I track patient progress?",
			answer: "Navigate to the Progress menu and select the patient. You can add progress records with mobility, strength, and pain level metrics.",
		},
		{
			id: 3,
			question: "Can I message patients?",
			answer: "Yes, click the message icon next to any patient in your dashboard. You can send and receive messages directly through the messaging modal.",
		},
		{
			id: 4,
			question: "How do I generate access keys?",
			answer: "Access keys are managed by SuperAdmins only. Contact your system administrator for key generation.",
		},
		{
			id: 5,
			question: "How do I update my profile information?",
			answer: "Go to Profile in the menu and click 'Edit Profile'. Update your professional details, license number, and specialization.",
		},
	]

	return (
		<SidebarSleek role="physiotherapist">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
					<p className="text-gray-400">Get assistance with your physiotherapy dashboard</p>
				</div>

				{/* Contact Support */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="fitpro-card">
						<CardContent className="p-6 text-center">
							<Mail className="w-10 h-10 text-blue-500 mx-auto mb-3" />
							<p className="text-white font-semibold mb-1">Email Support</p>
							<p className="text-gray-400 text-sm">support@fitpro.com</p>
						</CardContent>
					</Card>

					<Card className="fitpro-card">
						<CardContent className="p-6 text-center">
							<Phone className="w-10 h-10 text-green-500 mx-auto mb-3" />
							<p className="text-white font-semibold mb-1">Call Us</p>
							<p className="text-gray-400 text-sm">+92-300-1234567</p>
						</CardContent>
					</Card>

					<Card className="fitpro-card">
						<CardContent className="p-6 text-center">
							<Clock className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
							<p className="text-white font-semibold mb-1">Support Hours</p>
							<p className="text-gray-400 text-sm">Mon-Fri 9AM-6PM</p>
						</CardContent>
					</Card>
				</div>

				{/* Quick Search */}
				<Card className="fitpro-card">
					<CardContent className="p-6">
						<Input placeholder="Search help topics..." className="fitpro-input rounded-xl" />
					</CardContent>
				</Card>

				{/* FAQs */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<HelpCircle className="w-5 h-5" />
							Frequently Asked Questions
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{faqs.map((faq) => (
							<button
								key={faq.id}
								onClick={() => setOpenFaq(openFaq === String(faq.id) ? null : String(faq.id))}
								className="w-full text-left"
							>
								<div className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors">
									<p className="text-white font-semibold">{faq.question}</p>
									<ChevronDown
										className={`w-5 h-5 text-gray-400 transition-transform ${
											openFaq === String(faq.id) ? "rotate-180" : ""
										}`}
									/>
								</div>
								{openFaq === String(faq.id) && (
									<div className="bg-slate-700/30 p-4 text-gray-300 text-sm">
										{faq.answer}
									</div>
								)}
							</button>
						))}
					</CardContent>
				</Card>

				{/* Contact Form */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white">Send us a Message</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-gray-300 text-sm mb-2 block">Subject</label>
							<Input placeholder="How can we help?" className="fitpro-input rounded-xl" />
						</div>
						<div>
							<label className="text-gray-300 text-sm mb-2 block">Message</label>
							<textarea
								placeholder="Describe your issue..."
								className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
								rows={4}
							></textarea>
						</div>
						<SendButton onClick={() => { /* TODO: implement send */ }} label="Send Message" className="w-full rounded-xl" />
					</CardContent>
				</Card>
			</div>
		</SidebarSleek>
	)
}


