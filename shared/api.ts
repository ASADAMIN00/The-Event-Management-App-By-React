/**
 * Shared types and interfaces for Event Management App
 */

export type EventStatus = "pending" | "approved" | "declined";

export interface EventBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description: string;
  specialInstructions?: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventBookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description: string;
  specialInstructions?: string;
}

export interface UpdateEventStatusRequest {
  id: string;
  status: EventStatus;
}

export interface EventBookingResponse {
  success: boolean;
  booking?: EventBooking;
  message: string;
}

export interface EventBookingsListResponse {
  success: boolean;
  bookings: EventBooking[];
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

export const EVENT_TYPES = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Conference",
  "Workshop",
  "Concert",
  "Festival",
  "Exhibition",
  "Seminar",
  "Other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];
