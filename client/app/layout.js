import { League_Spartan } from "next/font/google";
import '@/public/css/fontawesome-free/css/all.min.css';
import '@/public/css/sb-admin-2.min.css';
import './globals.css';
import { UserProvider } from "@/app/context/user.context";

const league = League_Spartan({ subsets: ["latin"] });

export const metadata = {
  title: "TrucaFofo",
  description: "Truco Fofo da FIPP 2024",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="pt-br">
        <body className={league.className}>
          {children}
          <script src="/js/jquery.min.js"></script>
          <script src="/js/sb-admin-2.min.js"></script>
        </body>
      </html>
    </UserProvider>
  );
}
