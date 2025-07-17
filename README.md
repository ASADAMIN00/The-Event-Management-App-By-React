# EventPro - Event Management App 🎉

A modern and efficient Event Management App built with React that streamlines the entire process of booking and managing events. This app allows customers to easily book events while giving admins full control to approve or decline bookings.

![EventPro Screenshot](https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=EventPro+-+Event+Management+System)

## ✨ Features

### 👥 Customer Side

- **Easy Event Booking**: Intuitive form with event type, date, time, location, and description
- **Contact Information**: Comprehensive customer details capture
- **Special Instructions**: Option to add custom requirements and notes
- **Real-time Submissions**: Instant booking submission with confirmation
- **Responsive Design**: Beautiful interface that works on all devices

### 🔧 Admin Panel

- **Secure Authentication**: Login-protected admin dashboard (demo: admin/admin123)
- **Booking Dashboard**: View all event requests with filtering and search
- **Status Management**: Approve or decline bookings with a single click
- **Detailed View**: Complete booking information in modal dialogs
- **Real-time Updates**: Instant status updates across the system
- **Analytics**: Dashboard statistics for pending, approved, and declined bookings

### 🎨 Design & UX

- **Modern Interface**: Clean, professional design with purple/indigo gradient theme
- **EventPro Branding**: Consistent brand identity throughout the app
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Toast Notifications**: User-friendly feedback for all actions
- **Loading States**: Smooth user experience with proper loading indicators

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router 6** - Client-side routing with SPA mode
- **TailwindCSS 3** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library

### Backend Ready

- **Express Server** - Integrated backend ready for API development
- **Shared Types** - TypeScript interfaces shared between client and server
- **Context API** - State management for booking data

### Development Tools

- **Vitest** - Modern testing framework
- **ESLint & Prettier** - Code quality and formatting
- **Hot Reload** - Both client and server development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eventpro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:8080`
   - The app runs on a single port for both frontend and backend

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### For Customers

1. **Visit the homepage** - Clean booking interface
2. **Fill out the form** - Enter your contact details and event information
3. **Submit booking** - Get instant confirmation
4. **Track status** - Check back or receive notifications (coming soon)

### For Administrators

1. **Access admin panel** - Navigate to `/admin`
2. **Login** - Use demo credentials: `admin` / `admin123`
3. **Review bookings** - View all submissions in the dashboard
4. **Manage requests** - Approve or decline with detailed booking views
5. **Filter & search** - Find specific bookings quickly

## 📁 Project Structure

```
eventpro/
├── client/                     # React frontend
│   ├── components/ui/          # Reusable UI components (Shadcn)
│   ├── contexts/              # React Context providers
│   │   └── BookingContext.tsx # Shared booking state management
│   ├── pages/                 # Route components
│   │   ├── Index.tsx          # Homepage with booking form
│   │   ├── Admin.tsx          # Admin dashboard
│   │   ├── Track.tsx          # Booking tracking (placeholder)
│   │   └── NotFound.tsx       # 404 page
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── App.tsx                # Main app component with routing
│   └── global.css             # TailwindCSS styles and theme
├── server/                    # Express backend
│   ├── routes/                # API route handlers
│   └── index.ts               # Server configuration
├── shared/                    # Shared TypeScript types
│   └── api.ts                 # Interface definitions
└── package.json              # Dependencies and scripts
```

## 🎯 Key Components

### BookingContext

Central state management for all booking operations:

- `addBooking()` - Add new customer booking
- `updateBookingStatus()` - Admin status updates
- `bookings` - Real-time booking data

### Event Types Supported

- Wedding
- Birthday Party
- Corporate Event
- Conference
- Workshop
- Concert
- Festival
- Exhibition
- Seminar
- Other (custom)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run typecheck` - TypeScript validation

### Adding New Features

1. **New API Routes** - Add to `server/routes/`
2. **New Pages** - Create in `client/pages/` and add to `App.tsx`
3. **UI Components** - Extend `client/components/ui/`
4. **Shared Types** - Update `shared/api.ts`

### Code Style

- **TypeScript** throughout for type safety
- **Functional components** with hooks
- **TailwindCSS** for styling
- **Consistent naming** conventions

## 🔐 Demo Credentials

**Admin Access:**

- Username: `admin`
- Password: `admin123`

## 🚧 Coming Soon

### Planned Features

- **Email Notifications** - Automated status update emails
- **Customer Portal** - Account creation and booking history
- **Advanced Analytics** - Event trends and reporting
- **File Uploads** - Event images and documents
- **Payment Integration** - Online booking deposits
- **Calendar Integration** - Sync with Google Calendar
- **Multi-Admin** - Role-based admin permissions

### Backend Integration

Currently uses in-memory state management. Ready for:

- **Database** - MongoDB, PostgreSQL, or any database
- **Authentication** - JWT tokens, OAuth providers
- **File Storage** - AWS S3, Cloudinary for images
- **Email Service** - SendGrid, Mailgun for notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email events@eventpro.com or create an issue in this repository.

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**

_EventPro - Making every event unforgettable through professional planning and seamless execution._
