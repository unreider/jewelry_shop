import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={`/${product.image}`}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
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
