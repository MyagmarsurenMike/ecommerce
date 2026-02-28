export default function Footer() {
  return (
    <footer className="bg-cream border-t border-stone-dark/10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-display font-semibold text-stone-dark mb-3">
              MÍNIMO
            </h3>
            <p className="text-sm text-stone-dark/55 font-body leading-relaxed mb-6 max-w-xs">
              Premium furniture crafted for modern living. Timeless pieces that
              transform your space.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                { label: 'f', title: 'Facebook' },
                { label: 'ig', title: 'Instagram' },
                { label: 'tw', title: 'Twitter' },
                { label: 'p', title: 'Pinterest' },
              ].map((s) => (
                <a
                  key={s.title}
                  href="#"
                  aria-label={s.title}
                  className="w-8 h-8 rounded-full border border-stone-dark/20 flex items-center justify-center text-xs font-body text-stone-dark/50 hover:border-stone-accent hover:text-stone-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h4 className="text-sm font-semibold text-stone-dark mb-4">
              Shipping
            </h4>
            <ul className="space-y-3 text-sm text-stone-dark/55 font-body">
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  International Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-stone-dark mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-stone-dark/55 font-body">
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-stone-dark mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-stone-dark/55 font-body">
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-stone-accent transition-colors">
                  Store Locator
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-dark/10 pt-8">
          <p className="text-xs text-stone-dark/40 font-body text-center">
            © 2024 MÍNIMO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
