import { notFound } from "next/navigation";
import { PageHeader, BackLink } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getById, donations, donorUser } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Award } from "lucide-react";

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = getById(donations, id);
  if (!donation || !donation.certificateAvailable) notFound();

  return (
    <>
      <BackLink href={`/portal/donations/${id}`} />
      <PageHeader label="Certificate" title="Donation Certificate" />

      <Card className="max-w-2xl mx-auto border-2 border-accent p-12 text-center newsprint-texture">
        <Award className="mx-auto h-12 w-12 text-accent mb-6" strokeWidth={1.5} />
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Certificate of Appreciation</p>
        <h2 className="font-serif text-3xl font-black mb-2">VitalDrops</h2>
        <p className="font-body text-sm text-muted-foreground mb-8">This certifies that</p>
        <p className="font-serif text-4xl font-black text-accent mb-2">{donorUser.name}</p>
        <p className="font-body text-sm text-muted-foreground mb-8">
          has generously donated {donation.volume} of {donation.type} on {formatDate(donation.date)} at {donation.location}.
        </p>
        <div className="flex justify-center gap-12 border-t border-border pt-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Blood Group</p>
            <p className="font-serif text-xl font-bold text-accent">{donation.bloodGroup}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Reference</p>
            <p className="font-mono text-sm">{donation.id.toUpperCase()}</p>
          </div>
        </div>
        <div className="mt-8">
          <Button>Download PDF</Button>
        </div>
      </Card>
    </>
  );
}
