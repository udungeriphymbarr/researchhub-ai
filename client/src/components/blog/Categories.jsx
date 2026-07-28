const categories = [
  "Research Tips",
  "Project Writing",
  "AI for Students",
  "Final Year Guide",
  "Methodology",
  "Literature Review",
  "APA Referencing",
  "SIWES",
];

function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">

      <h2 className="text-3xl font-bold mb-8">
        Explore Categories
      </h2>

      <div className="flex flex-wrap gap-4">

        {categories.map((category) => (

          <button
            key={category}
            className="
            px-6
            py-3
            rounded-full
            bg-white
            shadow
            hover:bg-blue-600
            hover:text-white
            transition
            "
          >
            {category}
          </button>

        ))}

      </div>

    </section>
  );
}

export default Categories;