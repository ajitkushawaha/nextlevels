import Header from "@/components/layout/Header";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <WhatsAppButton />
    </>
  );
}
