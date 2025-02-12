import Image from "next/image";

export default function StoneImages() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image src={selectedImage || imgPlaceholder} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img.image)}
              className={`relative w-20 h-20 rounded-md overflow-hidden ${
                selectedImage === img.image ? "brightness-50" : ""
              }`}
            >
              <Image
                src={img.image || imgPlaceholder}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
