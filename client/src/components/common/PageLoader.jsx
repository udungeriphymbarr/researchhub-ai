function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div
        className="
        w-14
        h-14
        border-4
        border-blue-100
        border-t-blue-600
        rounded-full
        animate-spin
        "
      />

      <p className="mt-6 text-gray-500">Preparing your dashboard...</p>
    </div>
  );
}

export default PageLoader;
