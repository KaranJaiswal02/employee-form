import ThankYou from "@/components/forms/ThankYou";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThankYou />
    </Suspense>
  );
}