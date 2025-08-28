'use client'

import { Calendar, Megaphone, Users } from 'lucide-react'

export default function NewsEventsSection() {
  const news = [
    {
      title: "CMEGP Garhwa Disburses 500+ Loans",
      date: "Aug 15, 2025",
      description: "Over 500 small business entrepreneurs received financial support this quarter.",
      icon: Megaphone,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Entrepreneurship Awareness Workshop",
      date: "Aug 10, 2025",
      description: "Aspiring entrepreneurs were trained on eligibility and business planning under CMEGP.",
      icon: Users,
      color: "from-green-500 to-teal-500"
    }
  ]

  const events = [
    {
      title: "Loan Application Drive",
      date: "Sep 5-10, 2025",
      description: "Submit your loan proposals at designated centers across Garhwa.",
      border: "border-blue-500"
    },
    {
      title: "Entrepreneurship Training Program",
      date: "Oct 12-15, 2025",
      description: "Skill development and business management training for small-scale entrepreneurs.",
      border: "border-green-500"
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">CMEGP Garhwa Updates</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* News */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-600" /> Latest News
            </h3>
            <div className="grid gap-4">
              {news.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${item.color} text-white flex items-center justify-center`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 mb-1 block"><Calendar className="inline w-3 h-3 mr-1" /> {item.date}</span>
                    <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" /> Upcoming Events
            </h3>
            <div className="grid gap-4">
              {events.map((event, idx) => (
                <div key={idx} className={`bg-white p-4 rounded-lg shadow border-l-4 ${event.border} hover:shadow-md transition`}>
                  <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                  <span className="text-xs text-gray-500 block mb-1">{event.date}</span>
                  <p className="text-gray-600 text-xs">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
