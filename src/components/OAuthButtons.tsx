"use client";

import { Button } from "@/components/ui/button";
import { createClient, supabase } from "@/lib/supabase/client";
import { Github } from "lucide-react";
import { useState } from "react";

export default function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    // const supabasee = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });
    if (error) throw error;
    setIsLoading(false);
  };

  return (
    <div className="gap-2 max-sm:flex-col mb-3 flex justify-center items-center">
      <Button
        className="flex items-center"
        variant={"outline"}
        onClick={() => handleOAuthSignIn("google")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="120"
          height="120"
          viewBox="0 0 64 64"
          stroke="black"
          strokeWidth={4}
          fill="transparent"
        >
          <path d="M30.997,28.126l20.738,0.029C53.545,36.731,50.236,54,30.997,54C18.844,54,8.992,44.15,8.992,32s9.852-22,22.005-22	c5.708,0,10.907,2.173,14.817,5.736l-6.192,6.19c-2.321-1.988-5.329-3.196-8.625-3.196c-7.33,0-13.273,5.941-13.273,13.27	s5.942,13.27,13.273,13.27c6.156,0,10.412-3.644,11.978-8.738H30.997V28.126z"></path>
        </svg>
        {isLoading ? "...Loading" : "Sign in with Google"}
      </Button>
      <Button
        className="flex items-center"
        variant={"outline"}
        onClick={() => handleOAuthSignIn("github")}
      >
        <Github />
        {isLoading ? "...Loading" : "Sign in with GitHub"}
      </Button>
    </div>
  );
}
