import Link from "next/link";
import Image from "next/image";
import { AtSign, Phone } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t z-50">
      <div className="container mx-auto px-4 pt-8 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <Image src="/images/logo.svg" alt="Earthy Crafts Logo" width={150} height={50} />
            <p className="mt-2 text-sm text-muted-foreground">Handmade with love</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="text-sm hover:underline">
                  Inspiration
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/customization" className="text-sm hover:underline">
                  Customization
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2 whitespace-nowrap">
              <Phone className="inline-flex w-4 mr-1 mb-0.5" />
              Phone:{" "}
              <Link href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className=" hover:underline">
                {process.env.NEXT_PUBLIC_PHONE}
              </Link>
            </p>
            <p className="text-sm mb-2 whitespace-nowrap">
              <AtSign className="inline-flex w-4 mr-1 mb-0.5" />
              Email:{" "}
              <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL?.trim()}`} className=" hover:underline">
                {process.env.NEXT_PUBLIC_EMAIL}
              </Link>
            </p>
            <div className="flex space-x-4">
              <Link className="group" href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "#"} target="_blank">
                <FaWhatsapp size={24} className=" fill-green-600 group-hover:fill-green-800" />
                <span className=" sr-only">WhatsApp</span>
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_FB_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaFacebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaLinkedin size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 py-4 border-t text-center sm:text-sm text-xs  text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Earthycrafts.</span>
          <span>
            Developed by{" "}
            <Link className="font-bold" href="https://www.mohitjeswani.live">
              MJDevs
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
