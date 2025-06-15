import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useHospital } from '@/context/HospitalContext'
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BedRequest {
  _id: string
  _v: number
  patientName: string
  patientAge: number
  patientGender: string
  contactNumber: string
  bedType: string
  medicalCondition: string
  priority: "low" | "medium" | "high" | "critical"
  status: "Pending" | "Approved" | "Rejected"
  timestamp: string | Date
  hospital: {
    _id: string
    name?: string
    location?: string
    contact?: string
  }
  user: string
}

export function PatientRequestsList() {
  const { fetchPatientRequests, patientRequests, loading, updateRequestStatus } = useHospital();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<BedRequest | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchPatientRequests();
  }, [fetchPatientRequests]);

  const handleStatusUpdate = async (requestId: string, status: "Approved" | "Rejected") => {
    try {
      await updateRequestStatus(requestId, status);
      toast({
        title: "Success",
        description: `Request ${status.toLowerCase()} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    }
  };

  const handleViewRequest = (request: BedRequest) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  if (loading || !patientRequests) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 justify-center items-center">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (patientRequests.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <p className="text-center text-muted-foreground">No requests found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Bed Type</TableHead>
            <TableHead>Medical Condition</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(patientRequests as BedRequest[]).map((request) => (
            <TableRow key={request._id}>
              <TableCell className="font-medium">{request.patientName}</TableCell>
              <TableCell>{request.bedType}</TableCell>
              <TableCell>{request.medicalCondition}</TableCell>
              <TableCell>{new Date(request.timestamp).toLocaleString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.priority === "high"
                      ? "destructive"
                      : request.priority === "medium"
                      ? "default"
                      : "outline"
                  }
                >
                  {request.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.status === "Approved" 
                      ? "default" 
                      : request.status === "Pending" 
                        ? "outline" 
                        : "destructive"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {request.status === "Pending" ? (
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusUpdate(request._id, "Rejected")}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleStatusUpdate(request._id, "Approved")}
                    >
                      Approve
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewRequest(request)}
                  >
                    View
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p>{selectedRequest.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p>{selectedRequest.patientAge}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p>{selectedRequest.patientGender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p>{selectedRequest.contactNumber}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bed Type</p>
                <p>{selectedRequest.bedType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Medical Condition</p>
                <p>{selectedRequest.medicalCondition}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge
                    variant={
                      selectedRequest.priority === "high"
                        ? "destructive"
                        : selectedRequest.priority === "medium"
                        ? "default"
                        : "outline"
                    }
                  >
                    {selectedRequest.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedRequest.status === "Approved" 
                        ? "default" 
                        : selectedRequest.status === "Pending" 
                          ? "outline" 
                          : "destructive"
                    }
                  >
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Request Date & Time</p>
                <p>{new Date(selectedRequest.timestamp).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}