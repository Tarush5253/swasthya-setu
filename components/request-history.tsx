import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RequestHistory() {
  // This would typically come from an API
  const requests = [
    {
      id: "REQ-001",
      type: "ICU Bed",
      hospital: "City General Hospital",
      requestDate: "2023-06-10",
      status: "Approved",
    },
    {
      id: "REQ-002",
      type: "Blood (A+)",
      hospital: "LifeSource Blood Bank",
      requestDate: "2023-06-08",
      status: "Completed",
    },
    {
      id: "REQ-003",
      type: "Ambulance",
      hospital: "Metro Medical Center",
      requestDate: "2023-06-05",
      status: "Completed",
    },
    {
      id: "REQ-004",
      type: "Normal Bed",
      hospital: "Sunshine Hospital",
      requestDate: "2023-06-12",
      status: "Pending",
    },
    {
      id: "REQ-005",
      type: "Blood (O-)",
      hospital: "Red Cross Blood Center",
      requestDate: "2023-06-11",
      status: "Rejected",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Hospital/Blood Bank</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.hospital}</TableCell>
              <TableCell>{request.requestDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.status === "Approved" || request.status === "Completed"
                      ? "success"
                      : request.status === "Pending"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
