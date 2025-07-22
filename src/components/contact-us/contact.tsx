// File: src/components/home/home.tsx

import { ContactSecFour } from "./contact-us-sec-four/contact-us-sec-four";
import { ContactSecOne } from "./contact-us-sec-one/contact-us-sec-one";
import { ContactSecThree } from "./contact-us-sec-three/contact-us-sec-three";
import { ContactSecTwo } from "./contact-us-sec-two/contact-us-sec-two";

export function ConatctPage() {
  return (
    <div>
      <ContactSecOne />
      <ContactSecTwo />
      <ContactSecThree />
      <ContactSecFour />
    </div>
  );
}
