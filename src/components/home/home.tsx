// File: src/components/home/home.tsx
import { HeroSectionOne } from "./hero-section-one/hero-section-one";
import { HeroSectionThree } from "./hero-section-three/hero-section-three";
import { HeroSectionTwo } from "./hero-section-two/hero-section-two";

export function HomePage() {
  return (
    <div>
      <HeroSectionOne />
      <HeroSectionTwo />
      <HeroSectionThree />
    </div>
  );
}
