import { Truck } from "lucide-react";

export default function EmptyTransferState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-box">
        <Truck className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">No Blood Transfers</h3>
      <p className="empty-state-description">
        Accepted blood requests will appear here once a transfer is created.
      </p>
    </div>
  );
}
