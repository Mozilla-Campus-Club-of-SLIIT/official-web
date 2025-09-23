/* eslint-disable react/no-unescaped-entities */
import { MovingBanner } from "@/components/ui/moving-banner"
import SenderInit from "@/components/ui/sender-init"
import { Code2, Users, Rocket, Brain } from "lucide-react"

export default function Home() {
  const senderFormId = process.env.NEXT_PUBLIC_SENDER_FORM_ID
  return (
    <div>
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Mission-driven. People-powered.</h1>
          <p className="text-xl opacity-90">Home of The Mozilla Campus Club of SLIIT</p>
        </div>
      </section>

      <MovingBanner text="Join Mozilla Campus Club SLIIT - Where Innovation Meets Open Source 🚀" />

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Areas of Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 border rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-600 cursor-pointer">
            <Code2 className="h-12 w-12 mx-auto mb-4 stroke-orange-600" />
            <h3 className="text-orange-600 font-bold mb-2">Build The Web</h3>
            <p className="text-gray-600">Explore modern web development and open standards</p>
          </div>
          <div className="p-6 border rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-600 cursor-pointer">
            <Users className="h-12 w-12 mx-auto mb-4 stroke-orange-600" />
            <h3 className="text-orange-600 font-bold mb-2">Community Building</h3>
            <p className="text-gray-600">Connect with like-minded tech enthusiasts</p>
          </div>
          <div className="p-6 border rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-600 cursor-pointer">
            <Rocket className="h-12 w-12 mx-auto mb-4 stroke-orange-600" />
            <h3 className="text-orange-600 font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">Create impactful solutions for real-world problems</p>
          </div>
          <div className="p-6 border rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-600 cursor-pointer">
            <Brain className="h-12 w-12 mx-auto mb-4 stroke-orange-600" />
            <h3 className="text-orange-600 font-bold mb-2">Learning</h3>
            <p className="text-gray-600">Continuous learning and skill development</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md cursor-pointer">
              <span className="text-orange-600 text-2xl block text-left mb-2">⁕</span>
              <h3 className="text-orange-600 font-bold mb-2">Skill Development</h3>
              <p className="text-gray-600">
                Enhance your technical skills through workshops and hands-on projects
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md cursor-pointer">
              <span className="text-orange-600 text-2xl block text-left mb-2">⁕</span>
              <h3 className="text-orange-600 font-bold mb-2">Networking</h3>
              <p className="text-gray-600">
                Connect with industry professionals and like-minded students
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md cursor-pointer">
              <span className="text-orange-600 text-2xl block text-left mb-2">⁕</span>
              <h3 className="text-orange-600 font-bold mb-2">Opportunities</h3>
              <p className="text-gray-600">
                Access to exclusive events, internships, and career opportunities
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md cursor-pointer">
              <span className="text-orange-600 text-2xl block text-left mb-2">⁕</span>
              <h3 className="text-orange-600 font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                Engage with a supportive network of peers, mentors, and tech enthusiasts eager to
                share knowledge.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md cursor-pointer">
              <span className="text-orange-600 text-2xl block text-left mb-2">⁕</span>
              <h3 className="text-orange-600 font-bold mb-2">Leadership Growth</h3>
              <p className="text-gray-600">
                Hone your organizational and communication skills by leading events, hackathons, and
                team projects.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md cursor-pointer">
              <span className="text-orange-600 text-2xl block text-left mb-2">⁕</span>
              <h3 className="text-orange-600 font-bold mb-2">Mentorship & Guidance</h3>
              <p className="text-gray-600">
                Learn from experienced developers and alumni who can help you navigate your tech
                career.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-orange-400">Mozilla's legacy</h2>
          <blockquote className="text-xl italic mb-4">
            "The web is not a platform. It's an ocean of possibilities."
          </blockquote>
          <p className="font-semibold">- The Mozilla Community</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get updates about events, workshops, and club news straight to your inbox and stay
            updated.
          </p>
          {/* Sender form container; id comes from env */}
          <div className="sender-form-field" data-sender-form-id={senderFormId}></div>
          <SenderInit />
        </div>
      </section>
    </div>
  )
}
