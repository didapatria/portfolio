import { SectionLabel } from '../SectionLabel';
import { TerminalBlock } from '../TerminalBlock';

export function TransmissionSection() {
  return (
    <section style={{ padding: '0 0 128px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <SectionLabel>TRANSMISSION CHANNEL</SectionLabel>
        <TerminalBlock />
      </div>
    </section>
  );
}
