import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">My Blog</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-gray-400">
                About Us
              </Link>
              <Link href="/" className="block text-gray-300 hover:text-gray-400">
                Careers
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-gray-400">
                Blog
              </Link>
              <Link href="/" className="block text-gray-300 hover:text-gray-400">
                Documentation
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-gray-400">
                Privacy Policy
              </Link>
              <Link href="/" className="block text-gray-300 hover:text-gray-400">
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <Link href="https://twitter.com" className="block text-gray-300 hover:text-gray-400">
                Twitter
              </Link>
              <Link href="https://linkedin.com" className="block text-gray-300 hover:text-gray-400">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;