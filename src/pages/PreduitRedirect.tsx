import { useEffect } from "react";

/** Preduit product landing — update if the deployment URL changes */
const PREDUIT_EXTERNAL_URL = "https://preduit-lp-ten.vercel.app/";

/**
 * Client-side route at `/preduit` so in-app links show your domain path,
 * then immediately sends visitors to the external product site.
 */
export default function PreduitRedirect() {
  useEffect(() => {
    window.location.replace(PREDUIT_EXTERNAL_URL);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <p className="text-sm text-gray-600">Opening Preduit…</p>
    </div>
  );
}
