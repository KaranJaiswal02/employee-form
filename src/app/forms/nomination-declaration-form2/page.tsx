import NominationForm2 from "@/components/forms/NominationForm2";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <NominationForm2 />
        </Suspense>
    );
}