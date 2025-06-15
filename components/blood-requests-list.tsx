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

interface BloodRequest {
  _id: string
  __v: number
  patientName: string
  patientAge: number
  patientGender: string
  contactNumber: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  units: number
  purpose: string
  priority: "low" | "medium" | "high" | "critical"
  status: "Pending" | "Approved" | "Rejected" | "Completed"
  createdAt: string | Date
  bloodBank: {
    _id: string
    name?: string
    location?: string
    contact?: string
  }
  user: string
  hospitalName: string
}

export function BloodRequestsList() {
  const { fetchBloodRequests, bloodRequests, loading, updateBloodRequestStatus } = useHospital();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchBloodRequests();
  }, [fetchBloodRequests]);

  const handleStatusUpdate = async (requestId: string, status: "Approved" | "Rejected") => {
    try {
      await updateBloodRequestStatus(requestId, status);
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

  const handleViewRequest = (request: BloodRequest) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  if (loading || !bloodRequests) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 justify-center items-center">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (bloodRequests.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <p className="text-center text-muted-foreground">No blood requests found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bloodRequests.map((request) => (
            <TableRow key={request._id}>
              <TableCell className="font-medium">{request.patientName}</TableCell>
              <TableCell>{request.bloodGroup}</TableCell>
              <TableCell>{request.units}</TableCell>
              <TableCell>{request.hospitalName}</TableCell>
              <TableCell>{new Date(request.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.priority === "critical"
                      ? "destructive"
                      : request.priority === "high"
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
            <DialogTitle>Blood Request Details</DialogTitle>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p>{selectedRequest.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Units</p>
                  <p>{selectedRequest.units}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hospital Name</p>
                <p>{selectedRequest.hospitalName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Purpose</p>
                <p>{selectedRequest.purpose}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge
                    variant={
                      selectedRequest.priority === "critical"
                        ? "destructive"
                        : selectedRequest.priority === "high"
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
                <p>{new Date(selectedRequest.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}