import { getProductById } from "@/app/lib/db";


import Header from "@/app/components/Header";
import ProductId from "@/app/components/Product/ProductId";

export default async function ProductIdPage({ params }) {
  const product = await getProductById(params.productId);

  console.log("product", product);
  console.log("params", params);

  // params.productId === product.id
  return (
    <ProductId product={product} />
  );
}
