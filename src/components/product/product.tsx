import { ProductSecOne } from "./product-sec-one/product-sec-one";
// import { ProductSecThree } from "./product-sec-three/product-sec-three";
import { ProductSecTwo } from "./product-sec-two/product-sec-two";

export function ProductPage() {
  return (
    <div>
      <ProductSecOne />
      <ProductSecTwo />
      {/* <ProductSecThree /> */}
    </div>
  );
}
