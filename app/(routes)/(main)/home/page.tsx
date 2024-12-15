import CategorySection from "@/components/home-page/category-section";
import CustomizeSection from "@/components/home-page/customize-section";
import GalleryGrid from "@/components/home-page/gallery-grid";
import HeroSection from "@/components/home-page/hero-section";
// import ProductSlide from "@/components/home-page/product-slide";
import SubCategorySection from "@/components/home-page/sub-category-section";
import WeCareSection from "@/components/home-page/we-care-section";
import YourSpace from "@/components/home-page/your-space-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      {/* <ProductSlide /> */}
      <YourSpace />
      <SubCategorySection />
      <CustomizeSection />
      <GalleryGrid />
      <WeCareSection />
    </>
  );
}
