import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  Mail,
  Phone,
  Download,
  ExternalLink,
  BookOpen,
  Video,
  MessageCircle,
  Gift,
  Award,
  ArrowRight,
  FileText,
  Linkedin,
  Bot,
  Globe,
  AlertTriangle,
  Bell,
  Star,
  Heart,
} from "lucide-react";
// Using ₦ symbol directly instead of react-icons

const TechElevatorPaymentConfirmation = () => {
  const [showCelebration, setShowCelebration] = useState(true);
  const [timeToStart, setTimeToStart] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time until program starts (example: next Monday)
  useEffect(() => {
    const calculateTimeToStart = () => {
      const now = new Date();
      const startDate = new Date();
      
      // Set to next Monday at 10:00 AM
      const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
      startDate.setDate(now.getDate() + daysUntilMonday);
      startDate.setHours(10, 0, 0, 0);

      const difference = startDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeToStart({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeToStart();
    const timer = setInterval(calculateTimeToStart, 1000);

    // Hide celebration after 3 seconds
    const celebrationTimer = setTimeout(() => {
      setShowCelebration(false);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(celebrationTimer);
    };
  }, []);

  const nextSteps = [
    {
      step: 1,
      title: "Check Your Email",
      description: "We've sent you a welcome email with all the important details and calendar invites.",
      icon: <Mail className="w-6 h-6" />,
      color: "from-blue-600 to-blue-700",
      action: "Check your inbox and spam folder",
    },
    {
      step: 2,
      title: "Join Our WhatsApp Group",
      description: "Connect with your cohort and instructors for updates and support.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-green-600 to-green-700",
      action: "WhatsApp link sent to your email",
    },
    {
      step: 3,
      title: "Download Required Software",
      description: "Get Microsoft Excel and other tools ready for the program.",
      icon: <Download className="w-6 h-6" />,
      color: "from-purple-600 to-purple-700",
      action: "Installation guide in your email",
    },
    {
      step: 4,
      title: "Attend Orientation",
      description: "Join us for the program kickoff and meet your instructors.",
      icon: <Video className="w-6 h-6" />,
      color: "from-red-600 to-red-700",
      action: "Monday, 10:00 AM WAT",
    },
  ];

  const bonusItems = [
    {
      title: "5 Professional Dashboard Templates",
      value: "₦15,000",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "LinkedIn Optimization Guide",
      value: "₦10,000",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      title: "AI Resume Builder Tool",
      value: "₦10,000",
      icon: <Bot className="w-5 h-5" />,
    },
    {
      title: "Private Community Access",
      value: "₦10,000",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const programSchedule = [
    {
      week: 1,
      title: "Excel Mastery & Dashboard Creation",
      date: "Week of Jan 29",
      sessions: ["Mon 10AM", "Wed 7PM", "Fri 6PM"],
    },
    {
      week: 2,
      title: "Advanced Excel & Financial Dashboards",
      date: "Week of Feb 5",
      sessions: ["Mon 10AM", "Wed 7PM", "Fri 6PM"],
    },
    {
      week: 3,
      title: "AI-Powered CV & Portfolio Creation",
      date: "Week of Feb 12",
      sessions: ["Mon 10AM", "Wed 7PM", "Fri 6PM"],
    },
    {
      week: 4,
      title: "LinkedIn & Global Mentorship",
      date: "Week of Feb 19",
      sessions: ["Mon 10AM", "Wed 7PM", "Mentorship Sessions"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">   

      {/* Navigation with Logo */}
      <nav className="relative flex justify-between items-center z-40 w-full py-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/img/mixedLogo.png"
            alt="Nebiant Logo"
            className="h-8 md:h-10 w-auto rounded-lg shadow-lg"
          />
        </a>
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),transparent_50%)]"></div>

      {/* Main Content */}
      <div className="relative pt-8 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-full p-6 mb-6 mx-auto w-fit">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Payment
              </span>{" "}
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Confirmed!
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Congratulations! You've successfully enrolled in Tech Elevator. Your journey to a tech career starts now!
            </p>
            
            {/* Payment Details */}
            <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 max-w-md mx-auto">
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Program:</span>
                  <span>Tech Elevator 4-Week Program</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">₦</span>
                    <span className="font-semibold">40,000</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 font-semibold">✓ Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">What Happens Next?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {nextSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 relative"
                >
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-r ${step.color} p-3 rounded-lg`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-gray-800 px-2 py-1 rounded-full">
                          STEP {step.step}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <ArrowRight className="w-4 h-4" />
                        {step.action}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Program Schedule */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Your 4-Week Schedule</h2>
            <div className="grid gap-4">
              {programSchedule.map((week, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-red-600 px-2 py-1 rounded-full">
                          WEEK {week.week}
                        </span>
                        <span className="text-sm text-gray-400">{week.date}</span>
                      </div>
                      <h3 className="font-bold text-lg">{week.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {week.sessions.map((session, sessionIndex) => (
                        <div
                          key={sessionIndex}
                          className="bg-gray-800/50 px-3 py-1 rounded-full text-sm"
                        >
                          {session}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Important Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold">Class Requirements</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Laptop or desktop computer with internet connection</li>
                  <li>• Microsoft Excel (we'll help you get it if needed)</li>
                  <li>• WhatsApp for group communications</li>
                  <li>• Email access for materials and updates</li>
                  <li>• Dedication to attend all live sessions</li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 border border-green-800/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-green-400" />
                  <h3 className="font-bold">Program Benefits</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Certificate of completion</li>
                  <li>• Job placement assistance</li>
                  <li>• Lifetime community access</li>
                  <li>• 200+ project templates (1-month access)</li>
                  <li>• Personal portfolio website</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help? We're Here for You!</h2>
            <p className="text-gray-300 mb-6">
              Have questions about the program or need technical support? Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400" />
                <span>07072490551 • 07047817037 • 09059948976</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>hello@nebiant.com</span>
              </div>
            </div>
          </div>

          {/* Final Message */}
          <div className="text-center mt-12 pt-8 border-t border-gray-800/50">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-400" />
              <span className="text-xl font-semibold">Thank you for choosing Nebiant!</span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're excited to have you on this journey. Get ready to transform your career and unlock new opportunities in the tech industry. See you in class!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechElevatorPaymentConfirmation;