import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  EventBooking,
  CreateEventBookingRequest,
  EventStatus,
} from "@shared/api";

interface BookingContextType {
  bookings: EventBooking[];
  addBooking: (booking: CreateEventBookingRequest) => Promise<EventBooking>;
  updateBookingStatus: (id: string, status: EventStatus) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Initial mock data
const initialBookings: EventBooking[] = [
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

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<EventBooking[]>(initialBookings);

  const addBooking = async (
    bookingRequest: CreateEventBookingRequest,
  ): Promise<EventBooking> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newBooking: EventBooking = {
      id: Math.random().toString(36).substr(2, 9),
      ...bookingRequest,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = async (
    id: string,
    status: EventStatus,
  ): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, status, updatedAt: new Date().toISOString() }
          : booking,
      ),
    );
  };

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, updateBookingStatus }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}
