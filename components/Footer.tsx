export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} ServiceNexus. All rights reserved.
      </div>
    </footer>
  );
}
