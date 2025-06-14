import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import axios from 'axios';
import { getLocalStorage } from '@/lib/local-storage';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
});



interface BaseRequest {
  _id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  contactNumber: string;
  priority: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  user: string;
  type: 'blood' | 'bed';
  date: Date | string;
  location?: string;
  description: string;
}

interface BloodRequest extends BaseRequest {
  type: 'blood';
  bloodGroup: string;
  units: number;
  purpose: string;
  hospitalName: string;
  bloodBank?: {
    _id: string;
    name?: string;
    location?: string;
    contact?: string;
  };
  createdAt: Date | string;
}

interface BedRequest extends BaseRequest {
  type: 'bed';
  bedType: string;
  medicalCondition: string;
  priority: string;
  hospital?: {
    _id: string;
    name?: string;
    location?: string;
    contact?: string;
  };
  timestamp: Date | string;
}

type CombinedRequest = BloodRequest | BedRequest;


const fetchUserRequestHistory = async (): Promise<CombinedRequest[]> => {
  const token = getLocalStorage("swasthyasetu_token");
  if (!token) throw new Error("Authentication token not found");

  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await api.get<{ success: boolean; data: CombinedRequest[] }>('/requests/history');
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch request history');
    }
    throw new Error('An unexpected error occurred');
  }
};

const fetchRequestDetails = async (requestId: string, type: 'blood' | 'bed'): Promise<CombinedRequest> => {
  const token = getLocalStorage("swasthyasetu_token");
  if (!token) throw new Error("Authentication token not found");

  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await api.get<{ success: boolean; data: CombinedRequest }>(`/requests/${type}/${requestId}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch request details');
    }
    throw new Error('An unexpected error occurred');
  }
};

export function RequestHistory() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<CombinedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<CombinedRequest | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    const loadRequests = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const data = await fetchUserRequestHistory();
        setRequests(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load requests",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [user, toast]);

  const handleViewRequest = async (request: CombinedRequest) => {
    try {
      const details = await fetchRequestDetails(request._id, request.type);
      setSelectedRequest(details);
      setIsViewDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load request details",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading requests...</div>;
  }

  if (!requests.length) {
    return <div className="p-4 text-center text-muted-foreground">No requests found</div>;
  }

  console.log(requests)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request Type</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{request.description}</span>
                  {request.type === 'blood' && (
                    <span className="text-xs text-muted-foreground">
                      {request.bloodGroup} • {request.units} unit{request.units > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{request.patientName}</span>
                  <span className="text-xs text-muted-foreground">
                    {request.patientAge} yrs • {request.patientGender}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {request.location || 'Unknown'}
                {request.type === 'bed' && request.hospital?.location && (
                  <span className="block text-xs text-muted-foreground">
                    {request.hospital.location}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{new Date(request.date).toLocaleDateString()}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(request.date).toLocaleTimeString()}
                  </span>
                </div>
              </TableCell>
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
                    request.status === "Approved" || request.status === "Completed"
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewRequest(request)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Enhanced Request Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Request Details</span>
              <Badge
                variant={
                  selectedRequest?.status === "Approved" || selectedRequest?.status === "Completed"
                    ? "default"
                    : selectedRequest?.status === "Pending"
                      ? "outline"
                      : "destructive"
                }
              >
                {selectedRequest?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              {/* Request Type and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Request Type</p>
                  <p className="font-medium"> <span>{selectedRequest.description}</span>
                    {selectedRequest.type === 'blood' && (
                      <span className="text-xs text-muted-foreground">
                        {selectedRequest.bloodGroup} • {selectedRequest.units} unit{selectedRequest.units > 1 ? 's' : ''}
                      </span>
                    )}</p>
                </div>
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
              </div>

              {/* Patient Information */}
              <div className="grid grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p>{selectedRequest.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p>{selectedRequest.patientAge} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p>{selectedRequest.patientGender}</p>
                </div>
              </div>

              {/* Contact and Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p>{selectedRequest.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Request Date</p>
                  <p>{new Date(selectedRequest.date).toLocaleString()}</p>
                </div>
              </div>

              {/* Type-Specific Details */}
              {selectedRequest.type === 'blood' ? (
                <>
                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <p className="font-medium">{selectedRequest.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Units Required</p>
                      <p>{selectedRequest.units}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Bank</p>
                      <p>{selectedRequest.bloodBank?.name || selectedRequest.hospitalName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Purpose</p>
                    <p className="whitespace-pre-wrap">{selectedRequest.purpose}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Bed Type</p>
                      <p>{selectedRequest.bedType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hospital</p>
                      <p>{selectedRequest.hospital?.name || 'Unknown Hospital'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{selectedRequest.hospital?.location || 'Unknown'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Medical Condition</p>
                    <p className="whitespace-pre-wrap">{selectedRequest.medicalCondition}</p>
                  </div>
                </>
              )}

              {/* Additional Information */}
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">Request ID</p>
                <p className="font-mono text-sm">{selectedRequest._id}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}