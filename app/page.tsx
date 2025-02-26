"use client";

import IntroLoader from "@/components/loaders/intro-loader";

export default function Home() {
  // const router = useRouter();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //     console.log("Redirecting to /home...");
  //     router.replace("/home"); // ✅ Use replace() instead of push()
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, [router]);

  return <IntroLoader />; // Prevents rendering issues
}
