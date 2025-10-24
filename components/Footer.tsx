import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/assets/Mozilla-logo.png" alt="Mozilla Logo" className="h-8 w-auto mb-2" />
            <h3 className="font-bold mb-4">Mozilla Campus Club of SLIIT</h3>
            <p className="text-sm text-gray-600">
              Empowering students through open source technology and innovation.
              <br />
              <b>#welovetech!</b> 🦊❤️
            </p>
          </div>

          <div className="md:pl-4">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="text-sm hover:text-primary">
                About
              </Link>
              <Link href="/events" className="text-sm hover:text-primary">
                Events
              </Link>
              <Link href="/blog" className="text-sm hover:text-primary">
                Blog
              </Link>
              <Link href="/contact" className="text-sm hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="md:pl-4">
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="text-sm space-y-2">
              <p>SLIIT Malabe Campus</p>
              <p>New Kandy Road</p>
              <p>Malabe, Sri Lanka</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:infosliitmcc@gmail.com"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  infosliitmcc@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold mb-4">Follow Us on Socials!</h4>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/sliitmozilla" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              {/* <Link href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link> */}
              <Link href="https://www.instagram.com/sliitmozilla" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/Mozilla-Campus-Club-of-SLIIT"
                className="hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://www.youtube.com/@sliitmozilla" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/sliitmozilla/"
                className="hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://discord.gg/EqEUDnmkDZ"
                className="hover:text-primary block lg:hidden"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-6 hidden lg:block">
              <Link
                href="https://discord.gg/EqEUDnmkDZ"
                target="_blank"
                className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded transition-colors"
              >
                Join Us on Discord
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Mozilla Campus Club of SLIIT. Made with ❤️ by SLIIT
          Mozillians
        </div>
      </div>
    </footer>
  )
}
