import CustomizationForm from "./customization-form";

export default function CustomizationPage() {
  return (
    <main className="grid  lg:grid-cols-2 justify-items-center sm:p-8 p-2 gap-8 ">
      <div className=" rounded-lg overflow-hidden shadow-lg bg-white h-[500px] lg:h-full sm:w-96 w-80 lg:w-[450px] flex items-center">
        <video
          src="/videos/custom-video-pt.mp4"
          width={200}
          height={100}
          className="w-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/custom-video-pt.mp4" type="video/mp4" />
        </video>
      </div>

      <CustomizationForm />
    </main>
  );
}
