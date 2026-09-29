"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackCameraPermission } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type CameraStatus = "idle" | "requesting" | "active" | "error";
type CameraErrorKind = "denied" | "not-found" | "in-use" | "unsupported" | "unknown";

const ERROR_COPY: Record<CameraErrorKind, { title: string; fix: string }> = {
  denied: {
    title: "Camera permission was denied.",
    fix: "Chrome/Edge: click the camera icon in the address bar and allow it. Firefox: click the camera icon in the address bar, allow, then reload. Safari (Mac): Safari menu → Settings for This Website → Camera → Allow. iPhone/Android: check the browser's site permissions in your phone's Settings app too, then reload this page.",
  },
  "not-found": {
    title: "No camera was found.",
    fix: "Check that a camera is connected (or built in) and isn't disabled in your system's camera or privacy settings, then try again.",
  },
  "in-use": {
    title: "Your camera is being used by another app.",
    fix: "Close other apps or browser tabs that might already be using the camera — video calls, other camera tests, screen recorders — then try again.",
  },
  unsupported: {
    title: "Your browser doesn't support camera access.",
    fix: "This needs a modern browser (recent Chrome, Edge, Firefox or Safari) on a secure (https) page. Try updating your browser, or open this page in a different one.",
  },
  unknown: {
    title: "Couldn't access the camera.",
    fix: "Try reloading the page. If it keeps failing, check your browser's site permissions for the camera.",
  },
};

function classifyError(error: unknown): CameraErrorKind {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") return "denied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "not-found";
  if (name === "NotReadableError" || name === "TrackStartError") return "in-use";
  return "unknown";
}

/** Webcam Test: live preview, resolution readout, device picker, local-only snapshot. */
export function WebcamTest() {
  const [status, setStatus] = useState<CameraStatus>("idle");
  const [errorKind, setErrorKind] = useState<CameraErrorKind>("unknown");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [resolution, setResolution] = useState<{ width: number; height: number } | null>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setResolution(null);
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => {
      stopStream();
      if (snapshotUrl) URL.revokeObjectURL(snapshotUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(async (deviceId?: string) => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErrorKind("unsupported");
      setStatus("error");
      return;
    }

    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
      });
      streamRef.current = stream;
      trackCameraPermission("granted");

      const allDevices = await navigator.mediaDevices.enumerateDevices();
      setDevices(allDevices.filter((d) => d.kind === "videoinput"));

      const track = stream.getVideoTracks()[0];
      const settings = track?.getSettings();
      setSelectedDeviceId(settings?.deviceId ?? deviceId ?? "");
      if (settings?.width && settings?.height) {
        setResolution({ width: settings.width, height: settings.height });
      }

      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatus("active");
    } catch (error) {
      const kind = classifyError(error);
      setErrorKind(kind);
      setStatus("error");
      trackCameraPermission(kind === "denied" ? "denied" : "error");
    }
  }, []);

  const switchDevice = useCallback(
    (deviceId: string) => {
      stopStream();
      void start(deviceId);
    },
    [stopStream, start],
  );

  const takeSnapshot = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (snapshotUrl) URL.revokeObjectURL(snapshotUrl);
    canvas.toBlob((blob) => {
      if (blob) setSnapshotUrl(URL.createObjectURL(blob));
    }, "image/png");
  }, [snapshotUrl]);

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Your camera feed never leaves your device — nothing is uploaded anywhere.
      </p>

      {status === "idle" && (
        <button
          type="button"
          onClick={() => void start()}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Start camera
        </button>
      )}

      {status === "requesting" && (
        <p className="text-muted text-sm" aria-live="polite">
          Requesting camera access…
        </p>
      )}

      {status === "error" && (
        <div className="flex max-w-sm flex-col items-center gap-2 text-center" aria-live="polite">
          <p className="text-text text-sm font-medium">{ERROR_COPY[errorKind].title}</p>
          <p className="text-muted text-sm">{ERROR_COPY[errorKind].fix}</p>
          <button
            type="button"
            onClick={() => void start()}
            className="border-border text-text hover:border-primary hover:text-primary mt-2 rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {status === "active" && (
        <div className="flex w-full flex-col items-center gap-4">
          {devices.length > 1 && (
            <label className="text-muted flex items-center gap-2 text-sm">
              Camera
              <select
                value={selectedDeviceId}
                onChange={(e) => switchDevice(e.target.value)}
                className="border-border bg-bg text-text rounded-md border px-2 py-1"
              >
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || "Camera"}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="relative w-full max-w-sm overflow-hidden rounded-lg bg-black">
            <video ref={videoRef} autoPlay playsInline muted className="w-full" />
            <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
              <span className="bg-danger h-1.5 w-1.5 rounded-full motion-safe:animate-pulse" aria-hidden="true" />
              Live
            </span>
          </div>

          <p className="text-muted text-sm" aria-live="polite">
            {resolution ? `${resolution.width} × ${resolution.height}` : "Reading resolution…"}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={takeSnapshot}
              className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
            >
              Take snapshot
            </button>
            <button type="button" onClick={stopStream} className="text-muted hover:text-text text-sm">
              Stop camera
            </button>
          </div>

          {snapshotUrl && (
            <div className="flex w-full max-w-sm flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob URL, not an optimizable remote/static asset */}
              <img src={snapshotUrl} alt="Webcam snapshot preview" className="w-full rounded-lg" />
              <a href={snapshotUrl} download="webcam-test-snapshot.png" className="text-primary text-sm hover:underline">
                Save snapshot
              </a>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}
