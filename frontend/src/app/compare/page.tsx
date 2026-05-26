import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CompareClient } from "./CompareClient";

export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Preparing comparison..." />}>
      <CompareClient />
    </Suspense>
  );
}
