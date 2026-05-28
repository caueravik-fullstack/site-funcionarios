export default function Container({ children }) {
  return (
    <div className="max-w-8xl mx-auto px-6">
      {children}
    </div>
  );
}