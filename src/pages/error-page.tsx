export default function ErrorPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-white">
      <h1 className="mb-8 text-6xl font-semibold">Oops!</h1>
      <p className="mb-6 text-2xl font-medium">
        Sorry, an unexpected error has occurred.
      </p>
    </div>
  );
}
