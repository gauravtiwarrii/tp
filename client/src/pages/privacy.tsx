import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_NAME } from "@/lib/constants";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: March 15, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {SITE_NAME} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                please do not access the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-2">Personal Data</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Register for an account</li>
                <li>Sign up for our newsletter</li>
                <li>Respond to surveys</li>
                <li>Submit feedback or contact us</li>
                <li>Participate in promotions or contests</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                This information may include your name, email address, and other contact or identifying information.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Automatically Collected Data</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited</li>
                <li>Time and date of your visit</li>
                <li>Time spent on pages</li>
                <li>Unique device identifiers</li>
                <li>Other diagnostic data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use of Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Types of cookies we use:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Essential cookies:</strong> Necessary for the website to function properly</li>
                <li><strong>Preference cookies:</strong> Allow us to remember your preferences and settings</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Marketing cookies:</strong> Used to track visitors across websites for advertising purposes</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may use the information we collect from you for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Provide, maintain, and improve our website</li>
                <li>Personalize your experience</li>
                <li>Send newsletters, updates, and promotional materials</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor usage of our website</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Service Providers:</strong> Third parties that perform services on our behalf, such as web hosting, data analysis, and payment processing</li>
                <li><strong>Business Partners:</strong> With your consent, we may share your information with our business partners to offer you certain products, services, or promotions</li>
                <li><strong>Legal Requirements:</strong> If required by law or in response to valid requests by public authorities</li>
                <li><strong>Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We implement appropriate technical and organizational measures to protect the security of your personal information. 
                However, please note that no method of transmission over the Internet or electronic storage is 100% secure, 
                and we cannot guarantee absolute security of your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date at the top of this page. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">{SITE_NAME}</p>
                <p className="text-gray-600 dark:text-gray-300">Email: privacy@sillygeeks.tech</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}