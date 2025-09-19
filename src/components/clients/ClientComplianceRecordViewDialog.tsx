import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface Client {
  id: string;
  name: string;
  branches?: {
    name: string;
  };
}

interface ClientComplianceRecord {
  id: string;
  client_id: string;
  period_identifier: string;
  status: string;
  completion_date?: string;
  completion_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface ClientComplianceRecordViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  record: ClientComplianceRecord | null;
  completedByUser?: { name: string; created_at: string } | null;
}

export function ClientComplianceRecordViewDialog({
  open,
  onOpenChange,
  client,
  record,
  completedByUser
}: ClientComplianceRecordViewDialogProps) {
  if (!client || !record) return null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return "bg-success/10 text-success border-success/20";
      case 'pending':
        return "bg-warning/10 text-warning border-warning/20";
      case 'overdue':
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Client Compliance Record Details
          </DialogTitle>
          <DialogDescription>
            View details for this client compliance record.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground">Client</h4>
              <p className="font-medium">{client.name}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground">Branch</h4>
              <p className="font-medium">{client.branches?.name || 'Unassigned'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground">Period</h4>
              <p className="font-medium">{record.period_identifier}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground">Status</h4>
              <Badge className={getStatusBadge(record.status)}>
                {getStatusText(record.status)}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground">Completion Date</h4>
              <p className="font-medium">{(() => {
                if (!record.completion_date) return 'N/A';
                const date = new Date(record.completion_date);
                return isNaN(date.getTime()) 
                  ? record.completion_date 
                  : date.toLocaleDateString();
              })()}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground">Created</h4>
              <p className="font-medium">{new Date(record.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          {completedByUser && (
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Inputted By</h4>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{completedByUser.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(completedByUser.created_at).toLocaleDateString()} at{' '}
                  {new Date(completedByUser.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
          {record.notes && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Notes</h4>
              <p className="text-sm bg-muted p-3 rounded-md">
                {record.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}