import Header from "@/components/ui/Header";

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <>
        <Header/>
        {/* es como un molde para todas tus páginas */}
        {children}
        </>
    );
}  