import StaffJoining from "@/components/forms/StaffJoining";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <StaffJoining />
    </Suspense>
  );
}