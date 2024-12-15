import BackgroundVideo from "../video/background-video";

export default function YourSpace() {
  return (
    <section className="h-screen p-8 relative">
      <h1 className="lg:text-8xl md:text-6xl text-4xl text-center font-black text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap drop-shadow-lg flex flex-col gap-4 z-20">
        <span>Your space, your</span>
        <span>masterpiece</span>
      </h1>
      <BackgroundVideo src="/videos/your-space.mp4" className="rounded-3xl h-full" />
    </section>
  );
}
