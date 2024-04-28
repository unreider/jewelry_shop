import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  console.log("product.image", product.image);
  return (
    <div key={product.id} className="group relative">
      <div className="w-full h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        {/* <img
          src={`/${product.image}`}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        /> */}

        {/* NOT WORKING!!! */}
        <Image
          // fill
          // src="/uploads/11.png"
          src={product.image}
          width={100}
          height={100}
          alt={product.name}
        />

        {/* <img src="@/public/uploads/1714302061490-photo_2024-04-28-14.50.10.jpeg" alt={product.name} /> */}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="font-medium text-gray-700">
            <Link href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h2>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <p className="text-sm text-gray-900">{product.description}</p>
      </div>
    </div>
  );
}
