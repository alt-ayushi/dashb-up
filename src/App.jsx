import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Layout from "./components/Layout";

export default function App() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-[#5030E5] hover:bg-[#4020D5] text-sm",
              },
            }}
          />
        </div>
      </SignedOut>

      <SignedIn>
        <Layout />
      </SignedIn>
    </>
  );
}
