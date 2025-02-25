"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { enquiryPost } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const enquiryMutate = useMutation({
    mutationKey: ["enquiries"],
    mutationFn: async (formData: { name: string; email: string; phone: string; message: string }) =>
      enquiryPost(formData),
    onSuccess: () => {
      console.log("Enquiry added successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      // You can refetch queries or update UI here
    },
    onError: (error) => {
      console.error("Error adding enquiry:", error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    enquiryMutate.mutate(formData);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-center text-muted-foreground mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let&apos;s create something beautiful together
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
              {/* <div className="flex space-x-4 mb-4">
                <Link
                  href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FaFacebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FaInstagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FaTwitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div> */}

              <p className="mb-2 flex items-center">
                <Phone className="w-5 mr-2" />
                <Link className="hover:text-neutral-700" href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>
                  {process.env.NEXT_PUBLIC_PHONE}
                </Link>
              </p>
              <p className="mb-2 flex items-center">
                <Mail className="w-5 mr-2" />
                <Link className="hover:text-neutral-700" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL?.trim()}`}>
                  {process.env.NEXT_PUBLIC_EMAIL}
                </Link>
              </p>
              {/* <Link
                  className="hover:text-neutral-700 w-fit flex items-center whitespace-pre-wrap"
                  href={`https://wa.me/918949181484`}
                  target="_blank"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2 fill-green-600" />
                  <span className=" text-green-600 font-semibold">WhatsApp</span> - Chat with us
                </Link> */}

              <div className="flex space-x-4 my-4">
                <Link className="group" href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "#"} target="_blank">
                  <FaWhatsapp size={28} className=" fill-green-600 group-hover:fill-green-800" />
                  <span className=" sr-only">WhatsApp</span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_FB_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FaFacebook size={28} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-muted-foreground hover:text-foreground"
                >
                  <FaInstagram size={28} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FaLinkedin size={28} />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>

              <div className="h-1 w-20 bg-primary mb-6"></div>

              <p className="text-muted-foreground">
                We&apos;d love to hear from you! Whether you have a question about our products, need help with a custom
                order, or just want to say hello, don&apos;t hesitate to reach out.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Enquiry Form</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
