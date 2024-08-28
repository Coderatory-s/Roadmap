"use client"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter(); // For navigation

  const handleDashboardClick = () => {
    router.push('/admin'); // Navigate to the admin dashboard
  };

  return (
    <main className="flex min-h-screen flex-col items-center sm:p-32 p-12 mb-14 bg-black sm:text-center text-justify">
    <h1 className="text-4xl font-bold mb-9 text-white text-center ">Create Roadmap</h1>
    <p className="mb-10 text-start  sm:text-center text-white  leading-7 ">
      Welcome to the roadmap creation platform. Here you can manage and organize your tasks efficiently. <br/>
      With our intuitive drag-and-drop interface, you can create roadmaps seamlessly.
      You can easily update or delete your roadmaps.
    </p>
    <Button className="px-4 py-2 bg-white text-black rounded hover:bg-slate-800 hover:text-white" onClick={handleDashboardClick}>
      Open Admin Dashboard
    </Button>
  </main>
  );
}
