import {
  Component,
  type ErrorInfo,
  type ReactNode,
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

/** Quick probe so we do not mount Spline when the browser cannot create a GL context. */
function canCreateWebGLContext(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const opts: WebGLContextAttributes = { failIfMajorPerformanceCaveat: false };
    return !!(
      canvas.getContext("webgl2", opts) ||
      canvas.getContext("webgl", opts)
    );
  } catch {
    return false;
  }
}

type BoundaryProps = { children: ReactNode; fallback: ReactNode };
type BoundaryState = { hasError: boolean };

class SplineErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[Hero Spline]", error.message, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const Spline = lazy(() => import("@splinetool/react-spline"));

function FallbackUI() {
  return (
    <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded-lg border border-white/10 bg-gradient-to-b from-zinc-950 to-black lg:min-h-[400px]">
      <div className="max-w-sm px-6 text-center">
        <p className="text-sm font-medium text-white/80">3D scene unavailable</p>
        <p className="mt-2 text-xs leading-relaxed text-white/45">
          The browser blocked or lost the WebGL context (often from too many WebGL tabs, disabled
          hardware acceleration, or a GPU driver issue). Try refreshing, closing other 3D tabs, or
          another browser.
        </p>
      </div>
    </div>
  );
}

const SPLINE_WATERMARK_CSS = `
.spline-container > div:last-child,
.spline-container > div > div:last-child,
.spline-container canvas + div,
.spline-container canvas ~ div,
.spline-animation > div:last-child,
.spline-animation canvas + div,
.spline-animation canvas ~ div {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}
`;

type HeroSplineSafeProps = {
  scene: string;
};

/**
 * Loads the Spline scene with guards for missing WebGL and runtime failures so the home page
 * never white-screens when THREE.js cannot get a context.
 */
export function HeroSplineSafe({ scene }: HeroSplineSafeProps) {
  const [useFallback, setUseFallback] = useState(
    () => typeof window !== "undefined" && !canCreateWebGLContext()
  );

  useEffect(() => {
    const onRejection = (e: PromiseRejectionEvent) => {
      const msg = (e.reason as Error | string | undefined)?.toString?.() ?? String(e.reason ?? "");
      if (/WebGL|webgl|THREE|context|Spline/i.test(msg)) {
        setUseFallback(true);
      }
    };
    window.addEventListener("unhandledrejection", onRejection);
    return () => window.removeEventListener("unhandledrejection", onRejection);
  }, []);

  if (useFallback) {
    return <FallbackUI />;
  }

  return (
    <SplineErrorBoundary fallback={<FallbackUI />}>
      <div className="spline-container relative h-full min-h-[280px] bg-transparent lg:min-h-[400px]">
        <Suspense
          fallback={
            <div className="flex h-full min-h-[280px] items-center justify-center lg:min-h-[400px]">
              <div className="animate-pulse text-sm text-white/50">Loading 3D experience…</div>
            </div>
          }
        >
          <Spline
            scene={scene}
            className="spline-animation h-full w-full"
            style={{ background: "#000000", backgroundColor: "#000000" }}
            renderOnDemand
          />
        </Suspense>

        <div className="pointer-events-none absolute inset-0 z-10">
          <style dangerouslySetInnerHTML={{ __html: SPLINE_WATERMARK_CSS }} />
        </div>
      </div>
    </SplineErrorBoundary>
  );
}
