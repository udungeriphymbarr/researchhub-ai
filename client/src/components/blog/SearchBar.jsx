function SearchBar() {
  return (
    <section className="max-w-6xl mx-auto px-6 -mt-10">

      <div className="bg-white rounded-2xl shadow-xl p-6">

        <input
          type="text"
          placeholder="Search research articles..."
          className="
          w-full
          border
          rounded-xl
          p-5
          outline-none
          focus:ring-2
          focus:ring-blue-600
          "
        />

      </div>

    </section>
  );
}

export default SearchBar;