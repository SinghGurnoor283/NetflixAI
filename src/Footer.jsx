import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 md:px-16 z-50 py-10 text-sm">
      {/* Social Icons */}
      <div className="flex space-x-6 mb-6">
        <Facebook className="hover:text-white cursor-pointer" size={20} />
        <Instagram className="hover:text-white cursor-pointer" size={20} />
        <Twitter className="hover:text-white cursor-pointer" size={20} />
        <Youtube className="hover:text-white cursor-pointer" size={20} />
      </div>

      {/* Grid Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">Audio Description</p>
          <p className="hover:underline cursor-pointer">Investor Relations</p>
          <p className="hover:underline cursor-pointer">Privacy</p>
          <p className="hover:underline cursor-pointer">Contact Us</p>
        </div>
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">Help Centre</p>
          <p className="hover:underline cursor-pointer">Jobs</p>
          <p className="hover:underline cursor-pointer">Legal Notices</p>
          <p className="hover:underline cursor-pointer">Ad Choices</p>
        </div>
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">Gift Cards</p>
          <p className="hover:underline cursor-pointer">Netflix Shop</p>
          <p className="hover:underline cursor-pointer">Cookie Preferences</p>
        </div>
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">Media Centre</p>
          <p className="hover:underline cursor-pointer">Terms of Use</p>
          <p className="hover:underline cursor-pointer">Corporate Information</p>
        </div>
      </div>

      {/* Service Code Button */}
      <button className="border border-gray-600 text-gray-400 px-4 py-1 mb-4 hover:text-white hover:border-white">
        Service Code
      </button>

      {/* Copyright */}
      <p className="text-xs text-gray-500">&copy; 1997–2025 Netflix, Inc.</p>
    </footer>
  );
};

export default Footer;
