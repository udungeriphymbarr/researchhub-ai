import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      title: "Topic Generator",
      description:
        "Generate unique research topics instantly with AI.",
      icon: "📚",
    },
    {
      title: "Research Questions",
      description:
        "Create quality academic research questions.",
      icon: "❓",
    },
    {
      title: "Literature Review",
      description:
        "Generate Chapter Two literature reviews faster.",
      icon: "📝",
    },
    {
      title: "PDF Export",
      description:
        "Export your research work professionally.",
      icon: "📄",
    },
    {
      title: "Methodology Writer",
      description:
        "Generate research methodology instantly.",
      icon: "📊",
    },
    {
      title: "Project Management",
      description:
        "Organize and manage all research projects.",
      icon: "📁",
    },
  ];

  const tools = [
    "Topic Generator",
    "Research Questions",
    "Problem Statement",
    "Objectives",
    "Methodology",
    "Significance",
    "Literature Review",
    "Abstract Generator",
    "Projects",
    "PDF Export",
  ];

  return (
    <div className="bg-gray-50">

      {/* Hero */}

      <section id="home" className="py-28 px-6 text-center">

        <div className="max-w-5xl mx-auto">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            AI-Powered Academic Research Assistant
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight">
            Research Smarter
            <span className="text-blue-600">
              {" "}with AI
            </span>
          </h1>

          <p className="text-gray-600 text-xl mt-6 max-w-3xl mx-auto">
            Generate research topics, create
            literature reviews, write abstracts,
            manage projects and export professional
            PDFs — all in one platform.
          </p>

          <div className="flex justify-center gap-4 mt-10 flex-wrap">

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-100 transition"
            >
              Login
            </Link>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-3xl font-bold text-blue-600">
                10+
              </h3>
              <p className="text-gray-500">
                AI Research Tools
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-3xl font-bold text-green-600">
                PDF
              </h3>
              <p className="text-gray-500">
                Professional Export
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-3xl font-bold text-purple-600">
                24/7
              </h3>
              <p className="text-gray-500">
                AI Assistance
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Dashboard Preview */}

<section className="py-20 px-6">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-4xl font-bold text-center mb-4">
      Built For Modern Academic Research
    </h2>

    <p className="text-center text-gray-500 mb-12">
      Everything you need in one dashboard.
    </p>

    <div className="bg-white rounded-3xl shadow-2xl p-8 border">

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-blue-50 p-5 rounded-xl">
          <h3 className="font-bold">
            Projects
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            12
          </p>
        </div>

        <div className="bg-green-50 p-5 rounded-xl">
          <h3 className="font-bold">
            Topics
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            48
          </p>
        </div>

        <div className="bg-purple-50 p-5 rounded-xl">
          <h3 className="font-bold">
            Literature Reviews
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            21
          </p>
        </div>

        <div className="bg-orange-50 p-5 rounded-xl">
          <h3 className="font-bold">
            Exports
          </h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            9
          </p>
        </div>

      </div>

    </div>

  </div>

</section>

      {/* Features */}

      <section id="features" className="py-20 bg-white px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose ResearchHub AI?
          </h2>

          <p className="text-center text-gray-500 mb-14">
            Everything you need to create quality academic research.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <div className="text-6xl mb-4">
                📁
              </div>

              <h3 className="text-xl font-bold">
                Create Project
              </h3>

              <p className="text-gray-600 mt-3">
                Organize your research with dedicated projects.
              </p>
            </div>

            <div>
              <div className="text-6xl mb-4">
                🤖
              </div>

              <h3 className="text-xl font-bold">
                Generate Content
              </h3>

              <p className="text-gray-600 mt-3">
                Use AI to generate research materials instantly.
              </p>
            </div>

            <div>
              <div className="text-6xl mb-4">
                📄
              </div>

              <h3 className="text-xl font-bold">
                Export PDF
              </h3>

              <p className="text-gray-600 mt-3">
                Download professional reports in seconds.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Tools */}

      <section className="bg-white py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Research Tools Included
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">

            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-100 text-center p-4 rounded-xl"
              >
                {tool}
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Testimonials */}

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            What Students Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                ResearchHub AI saved me hours of work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                My literature review became much easier.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                Excellent tool for final year students.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Pricing */}

<section id="pricing" className="bg-white py-20 px-6">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-4xl font-bold text-center mb-12">
      Simple Pricing
    </h2>

    <div className="grid md:grid-cols-2 gap-8">

      <div className="border rounded-3xl p-8">

        <h3 className="text-2xl font-bold">
          Free
        </h3>

        <p className="text-5xl font-bold my-6">
          ₦0
        </p>

        <ul className="space-y-3">
          <li>✓ Topic Generator</li>
          <li>✓ Research Questions</li>
          <li>✓ Projects</li>
          <li>✓ PDF Export</li>
        </ul>

      </div>

      <div className="bg-blue-600 text-white rounded-3xl p-8">

        <h3 className="text-2xl font-bold">
          Premium
        </h3>

        <p className="text-5xl font-bold my-6">
          Soon
        </p>

        <ul className="space-y-3">
          <li>✓ Unlimited AI Generations</li>
          <li>✓ Citation Generator</li>
          <li>✓ DOCX Export</li>
          <li>✓ Advanced Research Writer</li>
        </ul>

      </div>

    </div>

  </div>

</section>

      {/* CTA */}

      <section className="bg-blue-600 text-white py-24 text-center px-6">

        <h2 className="text-5xl font-bold">
          Ready to Start Researching?
        </h2>

        <p className="mt-6 text-xl max-w-2xl mx-auto">
          Join students using AI to create
          better academic research faster.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-10 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100"
        >
          Start Free Today
        </Link>

      </section>

    </div>
  );
}

export default Home;