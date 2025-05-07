import IdcardForm from "@/components/forms/IdcardForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <IdcardForm />
    </Suspense>
  );
}