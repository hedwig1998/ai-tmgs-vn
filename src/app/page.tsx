import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col h-full bg-background">
      <ChatInterface user={session.user} />
    </main>
  );
}
