import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">404</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Button asChild className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition-opacity">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tag Generator
          </Link>
        </Button>
      </div>
    </div>
  );
}