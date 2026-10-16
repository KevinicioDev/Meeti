import { Metadata } from "next";
import Hero from "@/shared/components/ui/Hero";
import { generatePageTitle } from "@/shared/utils/metadata";
export const metadata : Metadata = {
  title: generatePageTitle('Inicio')
}

export default async function Home() {
  return (
    <>
      <Hero/>
    </>
  );
}
