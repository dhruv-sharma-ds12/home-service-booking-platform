function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">TrueFix</h2>
          <p className="mt-3 text-gray-400">
            Trusted Home Services at Your Doorstep.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Services</li>
            <li>Bookings</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p>support@truefix.com</p>
          <p>+91 9876543210</p>
        </div>
      </div>

      <p className="text-center mt-8 text-gray-500">
        © 2026 TrueFix. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;