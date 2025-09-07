"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"
import { useState } from "react"
import { set } from "date-fns"

// const formSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   subject: z.string().min(5, 'Subject must be at least 5 characters'),
//   message: z.string().min(10, 'Message must be at least 10 characters')
// })

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isContactFormSubmitted, setIsContactFormSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID!
    const toYouTemplateID = process.env.NEXT_PUBLIC_TO_YOU_TEMPLATE_ID!
    const autoReplyTemplateID = process.env.NEXT_PUBLIC_AUTO_REPLY_TEMPLATE_ID!
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!

    await emailjs
      .send(serviceID, toYouTemplateID, values, publicKey)
      .then(() => emailjs.send(serviceID, autoReplyTemplateID, values, publicKey))
      .then(() => {
        toast.success("Message sent successfully!")
        form.reset()
      })
      .catch((err) => {
        toast.error("Email sending failed.")
        console.error(err)
      })

    setIsContactFormSubmitted(true)

    setTimeout(() => {
      setIsContactFormSubmitted(false)
      setIsSubmitting(false)
    }, 3000)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Get in Touch</CardTitle>
              <CardDescription>Have questions? We'd love to hear from you.</CardDescription>
            </CardHeader>
            <CardContent>
              {!isContactFormSubmitted ? (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" {...form.register("name")} />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input type="email" placeholder="Email Address" {...form.register("email")} />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input placeholder="Subject" {...form.register("subject")} />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Textarea placeholder="Your Message" {...form.register("message")} />
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              ) : (
                <div className="bg-orange-100 text-orange-700 p-4 rounded">
                  <p className="font-semibold">Message Sent!</p>
                  <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Contact Information</CardTitle>
              <CardDescription>Other ways to reach us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  SLIIT Malabe Campus
                  <br />
                  New Kandy Road
                  <br />
                  Malabe, Sri Lanka
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">infosliitmcc@gmail.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact Numbers</h3>
                <p className="text-gray-600">President: Sadeesha Perera (+94 77 898 2938)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
