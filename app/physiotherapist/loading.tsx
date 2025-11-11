"use client"

// English loading skeleton for physiotherapist section (removed Turkish re-export)
export default function PhysiotherapistSectionLoading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-black to-teal-950">
			<div className="text-center">
				<div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
				<p className="text-green-400">Loading...</p>
			</div>
		</div>
	)
}