import { Droplets } from "lucide-react";

export default function EmptyRequestState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-box">
        <Droplets className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">No Blood Requests</h3>
      <p className="empty-state-description">
        There are currently no incoming blood requests.
      </p>
    </div>
  );
}
