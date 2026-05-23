import { HeroSection } from '@/components/sections/HeroSection';
import { CurrentDeploymentSection } from '@/components/sections/CurrentDeploymentSection';
import { DeploymentLogSection } from '@/components/sections/DeploymentLogSection';
import { CapabilityMatrixSection } from '@/components/sections/CapabilityMatrixSection';
import { TransmissionSection } from '@/components/sections/TransmissionSection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CurrentDeploymentSection />
      <DeploymentLogSection />
      <CapabilityMatrixSection />
      <TransmissionSection />
      <FooterSection />
    </main>
  );
}
