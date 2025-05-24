import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen justify-center flex items-center gap-5">
      <Button asChild>
        <Link href="/sign-in">Log In</Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </main>
  );
}
