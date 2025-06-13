import { DarkThemeToggle } from "flowbite-react";
import CreativeGenerator from "./pages/CreativeGenerator";

export default function App() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>
      <CreativeGenerator />
    </main>
  );
}
