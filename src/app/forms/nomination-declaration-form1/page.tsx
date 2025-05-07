import NominationForm1 from "@/components/forms/NominationForm1";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NominationForm1 />
    </Suspense>
  );
}