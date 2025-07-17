import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { EventBooking, EventStatus } from "@shared/api";

// Mock data for demonstration
const mockBookings: EventBooking[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    customerPhone: "+1 (555) 123-4567",
    eventType: "Wedding",
    eventDate: "2024-06-15",
    eventTime: "18:00",
    location: "Grand Hotel Ballroom, Downtown",
    description:
      "Elegant wedding reception for 150 guests with cocktail hour, dinner, and dancing.",
    specialInstructions:
      "Vegetarian and gluten-free options needed. Special lighting for photos.",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    customerName: "Tech Corp Inc.",
    customerEmail: "events@techcorp.com",
    customerPhone: "+1 (555) 987-6543",
    eventType: "Corporate Event",
    eventDate: "2024-03-20",
    eventTime: "14:00",
    location: "Convention Center, Room A",
    description:
      "Annual company conference with keynote speakers and networking sessions.",
    specialInstructions:
      "A/V equipment needed for presentations. Catering for 200 people.",
    status: "approved",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "3",
    customerName: "Michael Chen",
    customerEmail: "michael.chen@email.com",
    customerPhone: "+1 (555) 456-7890",
    eventType: "Birthday Party",
    eventDate: "2024-02-28",
    eventTime: "15:00",
    location: "Community Center Park",
    description:
      "50th birthday celebration with family and friends. Outdoor party with BBQ.",
    status: "declined",
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-09T11:30:00Z",
  },
];

export default function Admin() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<EventBooking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] =
    useState<EventBooking[]>(mockBookings);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<EventBooking | null>(
    null,
  );

  useEffect(() => {
    if (isAuthenticated) {
      // Filter bookings based on search and status
      let filtered = bookings;

      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (booking) => booking.status === statusFilter,
        );
      }

      if (searchQuery) {
        filtered = filtered.filter(
          (booking) =>
            booking.customerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            booking.customerEmail
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            booking.eventType.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      setFilteredBookings(filtered);
    }
  }, [bookings, statusFilter, searchQuery, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication check (in real app, this would be API call)
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: EventStatus,
  ) => {
    try {
      // TODO: Implement API call to update status
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : booking,
        ),
      );

      toast({
        title: "Status Updated",
        description: `Booking has been ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      case "declined":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Declined
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Login form for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Admin Login
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access the event management dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-gray-700">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Sign In
                </Button>
              </form>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
                <p className="text-xs text-gray-500">Username: admin</p>
                <p className="text-xs text-gray-500">Password: admin123</p>
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/"
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  ← Back to booking
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              EventPro Admin
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              View Site
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {bookings.filter((b) => b.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bookings.filter((b) => b.status === "approved").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Declined</p>
                  <p className="text-2xl font-bold text-red-600">
                    {bookings.filter((b) => b.status === "declined").length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Event Bookings
            </CardTitle>
            <CardDescription>
              Manage and review all event booking requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by customer name, email, or event type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bookings Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {booking.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.customerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{booking.eventType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {formatDate(booking.eventDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatTime(booking.eventTime)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-gray-500">
                        {formatDate(booking.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                                <DialogDescription>
                                  Review booking information and update status
                                </DialogDescription>
                              </DialogHeader>
                              {selectedBooking && (
                                <div className="space-y-6">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Customer Information
                                      </h4>
                                      <div className="space-y-1 text-sm">
                                        <p>
                                          <strong>Name:</strong>{" "}
                                          {selectedBooking.customerName}
                                        </p>
                                        <p>
                                          <strong>Email:</strong>{" "}
                                          {selectedBooking.customerEmail}
                                        </p>
                                        <p>
                                          <strong>Phone:</strong>{" "}
                                          {selectedBooking.customerPhone}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Event Details
                                      </h4>
                                      <div className="space-y-1 text-sm">
                                        <p>
                                          <strong>Type:</strong>{" "}
                                          {selectedBooking.eventType}
                                        </p>
                                        <p>
                                          <strong>Date:</strong>{" "}
                                          {formatDate(
                                            selectedBooking.eventDate,
                                          )}
                                        </p>
                                        <p>
                                          <strong>Time:</strong>{" "}
                                          {formatTime(
                                            selectedBooking.eventTime,
                                          )}
                                        </p>
                                        <p>
                                          <strong>Location:</strong>{" "}
                                          {selectedBooking.location}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Description
                                    </h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                      {selectedBooking.description}
                                    </p>
                                  </div>

                                  {selectedBooking.specialInstructions && (
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">
                                        Special Instructions
                                      </h4>
                                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                        {selectedBooking.specialInstructions}
                                      </p>
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between pt-4 border-t">
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        Current Status:
                                      </p>
                                      {getStatusBadge(selectedBooking.status)}
                                    </div>
                                    <div className="flex gap-2">
                                      {selectedBooking.status !==
                                        "approved" && (
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleStatusUpdate(
                                              selectedBooking.id,
                                              "approved",
                                            )
                                          }
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                          Approve
                                        </Button>
                                      )}
                                      {selectedBooking.status !==
                                        "declined" && (
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() =>
                                            handleStatusUpdate(
                                              selectedBooking.id,
                                              "declined",
                                            )
                                          }
                                        >
                                          <XCircle className="h-4 w-4 mr-1" />
                                          Decline
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusUpdate(booking.id, "approved")
                                }
                                disabled={booking.status === "approved"}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusUpdate(booking.id, "declined")
                                }
                                disabled={booking.status === "declined"}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Decline
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
