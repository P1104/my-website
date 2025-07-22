import { UseCasesSecOne } from "./use-cases-sec-one/use-cases-sec-one";
import { UseCasesSecThree } from "./use-cases-sec-three/use-cases-sec-three";
import { UseCasesSectionTwo } from "./use-cases-sec-two/use-cases-sec-two";

export function UseCasesPage() {
  return (
    <div>
      <UseCasesSecOne />
      <UseCasesSectionTwo />
      <UseCasesSecThree />
    </div>
  );
}
