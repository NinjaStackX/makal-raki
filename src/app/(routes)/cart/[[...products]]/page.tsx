import React from "react";
interface Params {
  params: { products: string[] };
}
const product = async ({ params }: Params) => {
  const Products = (await params) || { products: ["a", "b"] };
  return (
    <div>
      {Products.products.map((e, i) => (
        <div key={i}>{e}</div>
      ))}
    </div>
  );
};

export default product;
