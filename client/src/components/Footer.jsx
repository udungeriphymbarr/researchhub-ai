function Footer() {
  return (
   <footer className="bg-slate-900 text-white py-12 mt-20">

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

    <div>
      <h2 className="text-xl font-bold mb-3">
        ResearchHub AI
      </h2>

      <p className="text-slate-400">
        AI-powered research assistant for students and researchers.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-3">
        Quick Links
      </h3>

      <ul className="space-y-2">
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="/login">Login</a>
        </li>

        <li>
          <a href="/signup">Register</a>
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-3">
        Contact
      </h3>

      <p>
        Email:
        support@researchhubai.com
      </p>

      <p>
<a
  href="https://wa.me/2348057663703"
  target="_blank"
  rel="noreferrer"
  className="text-green-500 hover:underline"
>
  Chat on WhatsApp
</a>
      </p>
    </div>

  </div>

</footer>
  );
}

export default Footer;