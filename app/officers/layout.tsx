import RouteGuard from "@/components/common/RouteGuard";
import OfficersNavBar from "@/components/layout/OfficersNavBar";
import { ChildrenProps } from "@/types/SiteConfig";

export default async function RootLayout({ children }: ChildrenProps) {
    return (
        <div className='w-full font-barlow'>
            <OfficersNavBar />
            <RouteGuard>
                <main
                    style={{ backgroundColor: "#f3f4f6", minHeight: "100vh" }}
                    className='pt-[140px]'
                >
                    <div className='mx-auto py-6 sm:px-6 lg:px-8'>{children}</div>
                </main>
            </RouteGuard>

        </div>
    );
}
