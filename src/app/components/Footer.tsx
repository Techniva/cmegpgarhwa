import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center space-y-4">
        {/* About */}
        <h3 className="text-xl font-bold">CMEGP Loan Assistance</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Chief Minister’s Employment Generation Programme provides financial support 
          to entrepreneurs and small businesses for creating new opportunities.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-400 mt-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Ranchi, Jharkhand
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> +91 9XX XXX XXXX
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> support@cmegp.gov.in
          </div>
        </div>

        {/* Bottom Bar */}
        <p className="text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} CMEGP - All rights reserved.
        </p>
      </div>
    </footer>
  )
}
