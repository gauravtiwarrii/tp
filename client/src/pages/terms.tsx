import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_NAME } from "@/lib/constants";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-gray-500 mb-8">Last updated: March 15, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Welcome to {SITE_NAME}. These Terms of Service ("Terms") govern your use of our website located at
                sillygeeks.tech (the "Service") operated by {SITE_NAME} ("us", "we", or "our").
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the 
                terms, then you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use of Our Service</h2>
              
              <h3 className="text-xl font-medium mb-2">2.1 Eligibility</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You must be at least 13 years of age to use the Service. By using the Service, you represent and warrant 
                that you meet all eligibility requirements.
              </p>
              
              <h3 className="text-xl font-medium mb-2">2.2 User Accounts</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you create an account with us, you must provide accurate, complete, and up-to-date information. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any activities 
                or actions under your password.
              </p>
              
              <h3 className="text-xl font-medium mb-2">2.3 Acceptable Use</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree not to use the Service:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To impersonate or attempt to impersonate {SITE_NAME}, a {SITE_NAME} employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>To attempt to access any portion of the Service that you are not authorized to access</li>
                <li>To use the Service for any purpose that is unlawful or prohibited by these Terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Service and its original content (excluding content provided by users or sourced from third parties), 
                features, and functionality are and will remain the exclusive property of {SITE_NAME} and its licensors.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior 
                written consent of {SITE_NAME}.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our Service may allow you to post, link, store, share and otherwise make available certain information, 
                text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to 
                the Service, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By posting Content to the Service, you grant us the right and license to use, modify, perform, display, 
                reproduce, and distribute such Content on and through the Service.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You represent and warrant that: (i) the Content is yours or you have the right to use it and grant us the 
                rights and license as provided in these Terms, and (ii) the posting of your Content on or through the 
                Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other 
                rights of any person.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. AI-Generated Content</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {SITE_NAME} uses artificial intelligence technology to curate, summarize, and generate content. While we 
                strive for accuracy and quality, we cannot guarantee that AI-generated content will be error-free.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We make reasonable efforts to ensure the accuracy of information presented on our Service, but we do not 
                warrant that such information will be error-free, complete, or up-to-date.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Content on the Service is provided for general information purposes only and should not be relied upon or 
                used as the sole basis for making decisions without consulting primary, more accurate, more complete, or 
                more timely sources of information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Links To Other Web Sites</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our Service may contain links to third-party web sites or services that are not owned or controlled by {SITE_NAME}.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {SITE_NAME} has no control over, and assumes no responsibility for, the content, privacy policies, or 
                practices of any third party web sites or services. You further acknowledge and agree that {SITE_NAME} 
                shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be 
                caused by or in connection with use of or reliance on any such content, goods or services available on or 
                through any such web sites or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your 
                account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation Of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In no event shall {SITE_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your 
                access to or use of or inability to access or use the Service; (ii) any conduct or content of any third 
                party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or 
                alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) 
                or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Disclaimer</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. 
                The Service is provided without warranties of any kind, whether express or implied, including, but not 
                limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or 
                course of performance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These Terms shall be governed and construed in accordance with the laws of the United States, without 
                regard to its conflict of law provisions.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
                of these Terms will remain in effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound 
                by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about these Terms, please contact us at legal@sillygeeks.tech.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}