import { Link } from "react-router-dom";

function Newsletter() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <span className="inline-block bg-white/20 px-4 py-2 rounded-full mb-6">
          🚀 ResearchHub AI
        </span>

        <h2 className="text-5xl font-bold leading-tight">
          Ready to Finish Your Research Faster?
        </h2>

        <p className="mt-8 text-blue-100 text-lg leading-8 max-w-3xl mx-auto">
          Stop wasting hours searching for project ideas.
          Generate research topics, research questions,
          chapter outlines and discover premium academic resources
          all in one place.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            to="/signup"
            className="
            bg-white
            text-blue-700
            px-8
            py-4
            rounded-xl
            font-semibold
            hover:scale-105
            transition
            "
          >
            Create Free Account
          </Link>

          <Link
            to="/store"
            className="
            border
            border-white
            px-8
            py-4
            rounded-xl
            hover:bg-white
            hover:text-blue-700
            transition
            "
          >
            Explore Resources
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;