import { notFound } from "next/navigation";
import { Certificate } from "@phosphor-icons/react/dist/ssr";
import { PageHeader, BackLink } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { getById, donations, donorUser } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = getById(donations, id);
  if (!donation || !donation.certificateAvailable) notFound();

  return (
    <>
      <BackLink href={`/portal/donations/${id}`} />
      <PageHeader label="Certificate" title="Donation certificate" />

      <Panel className="mx-auto max-w-2xl border-2 border-accent/40 p-12 text-center">
        <Certificate size={48} className="mx-auto mb-6 text-accent" aria-hidden />
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">Certificate of donation</p>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">VitalDrops</h2>
        <p className="mb-8 text-sm text-muted-foreground">This certifies that</p>
        <p className="mb-2 text-3xl font-semibold tracking-tight text-accent">{donorUser.name}</p>
        <p className="mb-8 text-sm text-muted-foreground">
          donated {donation.volume} of {donation.type} on {formatDate(donation.date)} at {donation.location}.
        </p>
        <div className="flex justify-center gap-12 border-t border-border pt-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Blood group</p>
            <p className="mt-1 font-mono text-lg text-accent">{donation.bloodGroup}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Reference</p>
            <p className="mt-1 font-mono text-sm">{donation.id.toUpperCase()}</p>
          </div>
        </div>
        <div className="mt-8">
          <Button>Download PDF</Button>
        </div>
      </Panel>
    </>
  );
}
