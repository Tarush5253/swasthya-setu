import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function BloodRequestsList() {
  // This would typically come from an API
  const requests = [
    {
      id: "BR-001",
      patientName: "Ananya Gupta",
      bloodGroup: "A+",
      units: 2,
      requestDate: "2023-06-12 09:30 AM",
      priority: "High",
      status: "Pending",
    },
    {
      id: "BR-002",
      patientName: "Rajesh Kumar",
      bloodGroup: "O-",
      units: 1,
      requestDate: "2023-06-12 10:15 AM",
      priority: "Critical",
      status: "Pending",
    },
    {
      id: "BR-003",
      patientName: "Meera Sharma",
      bloodGroup: "B+",
      units: 3,
      requestDate: "2023-06-12 08:45 AM",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "BR-004",
      patientName: "Suresh Patel",
      bloodGroup: "AB+",
      units: 2,
      requestDate: "2023-06-11 11:20 PM",
      priority: "High",
      status: "Approved",
    },
    {
      id: "BR-005",
      patientName: "Kavita Singh",
      bloodGroup: "A-",
      units: 1,
      requestDate: "2023-06-11 07:30 PM",
      priority: "Medium",
      status: "Rejected",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.patientName}</TableCell>
              <TableCell>{request.bloodGroup}</TableCell>
              <TableCell>{request.units}</TableCell>
              <TableCell>{request.requestDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.priority === "Critical"
                      ? "destructive"
                      : request.priority === "High"
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
                    request.status === "Approved" ? "success" : request.status === "Pending" ? "outline" : "destructive"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {request.status === "Pending" ? (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
