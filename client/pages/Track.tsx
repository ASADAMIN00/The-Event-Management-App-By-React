import { Link } from "react-router-dom";
import { Calendar, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Track() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              EventPro
            </span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Book Event
            </Link>
            <Link to="/track" className="text-purple-600 font-medium">
              Track Booking
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="h-20 w-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Track Your Booking
            </h1>
            <p className="text-xl text-gray-600">
              This page is coming soon! We're building a powerful booking
              tracking system.
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Features Coming Soon
              </CardTitle>
              <CardDescription>
                We're working on these exciting features for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Real-time Status Tracking
                    </h4>
                    <p className="text-sm text-gray-600">
                      Track your booking status from submission to approval
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get notified when your booking status changes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Booking History
                    </h4>
                    <p className="text-sm text-gray-600">
                      View all your past and upcoming events in one place
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Direct Communication
                    </h4>
                    <p className="text-sm text-gray-600">
                      Chat directly with our event planning team
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-gray-600 mb-4">
                  Want us to prioritize this feature? Let us know!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Book an Event
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:events@eventpro.com">Contact Us</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              Continue prompting to have this page built out with full
              functionality!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
