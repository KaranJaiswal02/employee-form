import StaffFamily from "@/components/forms/StaffFamily";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <StaffFamily />
        </Suspense>
    );
}