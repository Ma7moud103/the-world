import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const joseFin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap"
});
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis"
  },
  description:
    "Luxurious cabin hotel, located in the heart of the italian dolomits"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${joseFin.className} min-h-screen antialiased  relative bg-primary-950 text-primary-100 flex flex-col `}
      >
        <Header />

        <div className="flex-1 grid px-8 py-12">
          <main className="w-full max-w-7xl mx-auto">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
