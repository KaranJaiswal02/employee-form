export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="pt-16 min-h-screen">
            {children}
        </div>
    );
}