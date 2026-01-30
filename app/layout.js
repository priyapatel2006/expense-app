import './globals.css';

export const metadata = {
  title: 'Transactions dashboard',
  description: 'Financial transaction management dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-[#101818] dark:text-white min-h-screen font-display">
        {children}
      </body>
    </html>
  );
}
