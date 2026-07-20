function ProjectStats({ topics, questions, outlines, generations }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h3 className="text-gray-500">Topics</h3>

        <p className="text-3xl font-bold text-blue-600 mt-2">{topics.length}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h3 className="text-gray-500">Questions</h3>

        <p className="text-3xl font-bold text-green-600 mt-2">
          {questions.length}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h3 className="text-gray-500">Outlines</h3>

        <p className="text-3xl font-bold text-purple-600 mt-2">
          {outlines.length}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h3 className="text-gray-500">Total</h3>

        <p className="text-3xl font-bold text-orange-600 mt-2">
          {generations.length}
        </p>
      </div>
    </div>
  );
}

export default ProjectStats;
