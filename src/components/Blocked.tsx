
export default function Blocked() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Blocked</h1>
        <p className="text-gray-700 text-lg mb-6">
          This domain has been blocked. Please contact your administrator for further details.
        </p>
        <div className="mt-6">
          <a
            href="mailto:admin@yourdomain.com"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Contact Admin
          </a>
        </div>
      </div>
    </div>
  );
}
