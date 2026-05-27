import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-800">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}