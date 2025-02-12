import { Badge } from "@/components/ui/badge";
import StoneImages from "./stone-images";
import RelatedProducts from "./components/related-products";

export default function StoneDetailsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Amethyst</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <StoneImages />

        <div>
          <div className="space-y-4 mb-8">
            <p>
              Amethyst, the alluring violet variety of quartz, has been a prized gem for centuries. Its name derives
              from the Greek word &quot;amethystos,&quot; meaning &quot;not drunken,&quot; as it was believed to prevent
              intoxication. This fascinating crystal ranges in color from pale lilac to deep purple, often exhibiting
              remarkable color zoning.
            </p>
            <p>
              Geologically, amethyst forms in silica-rich environments, typically within volcanic rocks or geodes. The
              distinctive purple hue is attributed to irradiation, iron impurities, and the presence of trace elements.
              The most sought-after specimens often come from Brazil, Uruguay, and Zambia, though beautiful amethysts
              are found worldwide.
            </p>
            <p>
              Beyond its aesthetic appeal, amethyst holds significant metaphysical properties in various cultures.
              It&apos;s often associated with peace, balance, and spiritual growth. Many believe it can enhance
              intuition, promote restful sleep, and aid in meditation practices. In modern crystal healing, amethyst is
              thought to purify one&apos;s energy field and create a protective shield against negative influences.
            </p>
            <p>
              As a February birthstone and the gem for the 6th and 17th wedding anniversaries, amethyst continues to
              captivate jewelry enthusiasts and collectors alike. Its durability (7 on the Mohs scale) and abundance
              make it a versatile choice for various jewelry applications, from statement rings to delicate pendants.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <Badge>Birthstone</Badge>
            <Badge>Purple</Badge>
            <Badge>Quartz</Badge>
            <Badge>Spiritual</Badge>
          </div>
        </div>
      </div>

      <RelatedProducts />
    </div>
  );
}
