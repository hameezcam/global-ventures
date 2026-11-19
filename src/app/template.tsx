import { MotionRoot } from "@/components/nocturne/client";

/** Re-mounts on every navigation, giving each page its enter transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <MotionRoot>{children}</MotionRoot>;
}
