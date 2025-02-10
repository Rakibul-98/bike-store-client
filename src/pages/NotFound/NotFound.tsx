
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <p>Please try a different URL.</p>
        <a href="/">Back to Homepage</a>
      </div>
    </div>
  );
}
