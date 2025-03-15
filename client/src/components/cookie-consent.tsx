import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface CookieConsentProps {
  privacyPolicyUrl: string;
}

export default function CookieConsent({ privacyPolicyUrl }: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      // Show the consent banner if no consent is stored
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    // Store consent in localStorage
    localStorage.setItem("cookie-consent", "true");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowConsent(false);
  };

  const handleDecline = () => {
    // Store decline in localStorage (only essential cookies)
    localStorage.setItem("cookie-consent", "essential-only");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-8">
            <h3 className="text-white font-semibold text-lg mb-2">We value your privacy</h3>
            <p className="text-gray-300 text-sm md:text-base">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. Read our{" "}
              <Link href={privacyPolicyUrl} className="text-primary underline hover:text-primary-500">
                Privacy Policy
              </Link>{" "}
              to learn more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white"
              onClick={handleDecline}
            >
              Essential Only
            </Button>
            <Button onClick={handleAccept}>
              Accept All
            </Button>
          </div>
          <button 
            onClick={handleDecline} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Close cookie consent banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}