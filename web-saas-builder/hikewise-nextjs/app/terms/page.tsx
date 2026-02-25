import { Metadata } from 'next'
import { FileText, AlertCircle, Mail, Users, CreditCard, Ban, Shield, Scale, Gavel, Globe, RefreshCw, BookOpen } from 'lucide-react'
import { LegalLayout } from '@/components/legal/legal-layout'
import { CollapsibleSection } from '@/components/legal/collapsible-section'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'HikeWise Terms of Service - Read our terms and conditions for using the app.',
}

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'definitions', title: 'Definitions' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'account', title: 'Account Registration' },
  { id: 'acceptable-use', title: 'Acceptable Use' },
  { id: 'user-content', title: 'User Content' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'subscriptions', title: 'Subscriptions and Payments' },
  { id: 'termination', title: 'Termination' },
  { id: 'disclaimers', title: 'Disclaimers' },
  { id: 'limitation-liability', title: 'Limitation of Liability' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'dispute-resolution', title: 'Dispute Resolution' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'general', title: 'General Provisions' },
  { id: 'contact', title: 'Contact Us' },
]

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="February 9, 2026"
      icon={<FileText className="w-8 h-8 text-forest" />}
      sections={sections}
    >
      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12 not-prose">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-amber-800 mb-2">Important Notice</h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              Please read these terms carefully before using HikeWise. By creating an account
              or using our service, you agree to be bound by these terms. If you do not agree,
              you may not use our service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section id="acceptance" className="scroll-mt-24">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-teal" />
          1. Acceptance of Terms
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          By accessing or using HikeWise (&quot;the Service&quot;), you agree
          to be bound by these Terms of Service (&quot;Terms&quot;). These
          Terms apply to all users of the Service, including users of the
          mobile application (iOS and Android) and website.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you are using the Service on behalf of an organization, you
          represent that you have the authority to bind that organization to
          these Terms, and &quot;you&quot; refers to both you and the
          organization.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We may modify these Terms at any time. Your continued use of the
          Service after changes are posted constitutes acceptance of the
          modified Terms.
        </p>
      </section>

      <section id="definitions" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <FileText className="w-7 h-7 text-teal" />
          2. Definitions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          For purposes of these Terms:
        </p>
        <div className="bg-muted rounded-xl p-6 space-y-3 text-sm">
          <div>
            <strong className="text-foreground">Service:</strong>{' '}
            <span className="text-muted-foreground">
              The HikeWise mobile application and website, including all features, content, and functionality
            </span>
          </div>
          <div>
            <strong className="text-foreground">User, You, Your:</strong>{' '}
            <span className="text-muted-foreground">
              The individual or organization using the Service
            </span>
          </div>
          <div>
            <strong className="text-foreground">User Content:</strong>{' '}
            <span className="text-muted-foreground">
              Any content you create, upload, or share through the Service (study notes, goals, messages, etc.)
            </span>
          </div>
          <div>
            <strong className="text-foreground">Premium Features:</strong>{' '}
            <span className="text-muted-foreground">
              Paid features requiring a subscription (unlimited study sessions, AI insights, advanced analytics)
            </span>
          </div>
          <div>
            <strong className="text-foreground">Study Rooms:</strong>{' '}
            <span className="text-muted-foreground">
              Virtual spaces where users can study together and interact with other students
            </span>
          </div>
          <div>
            <strong className="text-foreground">Nora:</strong>{' '}
            <span className="text-muted-foreground">
              Our AI-powered study companion that provides personalized recommendations and insights
            </span>
          </div>
        </div>
      </section>

      <section id="eligibility" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Users className="w-7 h-7 text-teal" />
          3. Eligibility
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            To use HikeWise, you must meet the following requirements:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-teal mt-1">•</span>
              <span>
                <strong>Minimum Age:</strong> You must be at least 13 years old to create an account
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-1">•</span>
              <span>
                <strong>Parental Consent:</strong> If you are between 13 and 18 years old (or the
                age of majority in your jurisdiction), you must have your parent or legal guardian&apos;s
                permission to use the Service
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-1">•</span>
              <span>
                <strong>Legal Capacity:</strong> You must have the legal capacity to enter into
                a binding contract
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-1">•</span>
              <span>
                <strong>Compliance:</strong> You must not be prohibited from using the Service
                under applicable law
              </span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            By using the Service, you represent and warrant that you meet these
            eligibility requirements.
          </p>
        </div>
      </section>

      <section id="account" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <Users className="w-7 h-7 text-teal" />
          4. Account Registration
        </h2>

        <CollapsibleSection title="Account Creation" defaultOpen={true}>
          <p className="mb-3">
            To access certain features of HikeWise, you must create an account. When creating
            an account, you agree to:
          </p>
          <ul className="space-y-2">
            <li>• Provide accurate, current, and complete information</li>
            <li>• Maintain and promptly update your information to keep it accurate</li>
            <li>• Not impersonate any person or entity</li>
            <li>• Not use a name that is offensive, vulgar, or infringes on the rights of others</li>
            <li>• Accept all risks of unauthorized access to your account and information</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Account Security">
          <p className="mb-3">
            You are responsible for maintaining the confidentiality of your account credentials:
          </p>
          <ul className="space-y-2">
            <li>• Keep your password secure and do not share it with others</li>
            <li>• Use a strong, unique password that you don&apos;t use elsewhere</li>
            <li>• Enable two-factor authentication if available</li>
            <li>• Immediately notify us of any unauthorized use of your account</li>
            <li>• Log out from your account at the end of each session on shared devices</li>
          </ul>
          <p className="mt-3 text-sm">
            We are not liable for any losses caused by unauthorized access to your account if
            you fail to safeguard your credentials.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="One Account Per User">
          <p>
            You may only maintain one active account per person. Creating multiple accounts
            is prohibited, except:
          </p>
          <ul className="mt-3 space-y-2">
            <li>• If you close your previous account and wait 30 days before creating a new one</li>
            <li>• If you have written permission from HikeWise</li>
          </ul>
          <p className="mt-3 text-sm">
            Multiple accounts used to abuse features, circumvent restrictions, or manipulate
            leaderboards may result in permanent suspension of all accounts.
          </p>
        </CollapsibleSection>
      </section>

      <section id="acceptable-use" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Ban className="w-7 h-7 text-teal" />
          5. Acceptable Use Policy
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You agree to use the Service only for lawful purposes and in accordance with these Terms.
          You may NOT:
        </p>

        <div className="space-y-4">
          <CollapsibleSection title="Prohibited Activities" defaultOpen={true}>
            <ul className="space-y-3">
              <li>
                <strong>Illegal Activities:</strong> Use the Service for any illegal purpose or
                in violation of any local, state, national, or international law
              </li>
              <li>
                <strong>Unauthorized Access:</strong> Attempt to gain unauthorized access to our
                systems, other users&apos; accounts, or restricted areas of the Service
              </li>
              <li>
                <strong>Interference:</strong> Interfere with or disrupt the Service, servers,
                or networks connected to the Service
              </li>
              <li>
                <strong>Harmful Code:</strong> Upload viruses, malware, trojans, worms, or other
                malicious or destructive code
              </li>
              <li>
                <strong>Automated Access:</strong> Use robots, spiders, scrapers, or other
                automated means to access the Service without our express written permission
              </li>
              <li>
                <strong>Reverse Engineering:</strong> Attempt to reverse engineer, decompile,
                disassemble, or otherwise derive source code from the application
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Prohibited Content">
            <p className="mb-3">
              You may not post, upload, or share User Content that:
            </p>
            <ul className="space-y-2">
              <li>• Is illegal, harmful, threatening, abusive, harassing, or defamatory</li>
              <li>• Infringes on intellectual property rights or other proprietary rights</li>
              <li>• Contains hate speech, discrimination, or promotes violence</li>
              <li>• Is sexually explicit, pornographic, or inappropriate for minors</li>
              <li>• Contains spam, advertisements, or solicitations without permission</li>
              <li>• Impersonates any person or entity, or misrepresents your affiliation</li>
              <li>• Violates the privacy or publicity rights of others</li>
              <li>• Contains false, misleading, or fraudulent information</li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Study Room Conduct">
            <p className="mb-3">
              When participating in Study Rooms, you agree to:
            </p>
            <ul className="space-y-2">
              <li>• Treat other users with respect and courtesy</li>
              <li>• Use appropriate language and maintain a positive environment</li>
              <li>• Not spam messages or disrupt ongoing study sessions</li>
              <li>• Not share personal contact information or solicit outside communication</li>
              <li>• Report inappropriate behavior or content to moderators</li>
              <li>• Not use Study Rooms for commercial purposes or self-promotion</li>
            </ul>
          </CollapsibleSection>
        </div>
      </section>

      <section id="user-content" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <FileText className="w-7 h-7 text-teal" />
          6. User Content
        </h2>

        <CollapsibleSection title="Your Ownership" defaultOpen={true}>
          <p>
            You retain ownership of all User Content you create, upload, or share through HikeWise.
            This includes:
          </p>
          <ul className="mt-3 space-y-2">
            <li>• Study notes and annotations</li>
            <li>• Goals and progress data</li>
            <li>• Messages in Study Rooms</li>
            <li>• Profile information and customizations</li>
            <li>• Any other content you generate within the Service</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="License to Us">
          <p className="mb-3">
            By posting User Content, you grant HikeWise a non-exclusive, worldwide, royalty-free,
            sublicensable, and transferable license to:
          </p>
          <ul className="space-y-2">
            <li>• Use, copy, modify, and display your User Content</li>
            <li>• Distribute and make your User Content available to other users (where applicable)</li>
            <li>• Create derivative works for the purpose of providing and improving the Service</li>
            <li>• Store and backup your User Content on our servers</li>
          </ul>
          <p className="mt-3 text-sm">
            This license exists only to operate, promote, and improve HikeWise. We do not claim
            ownership of your User Content.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Content Moderation">
          <p className="mb-3">
            We reserve the right, but have no obligation, to:
          </p>
          <ul className="space-y-2">
            <li>• Monitor User Content for compliance with these Terms</li>
            <li>• Remove or refuse to publish any User Content that violates these Terms</li>
            <li>• Take action against users who violate these Terms</li>
            <li>• Cooperate with law enforcement when required</li>
          </ul>
          <p className="mt-3 text-sm">
            We do not pre-screen User Content but may review reported content and take
            appropriate action.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Backup Your Content">
          <p>
            While we maintain regular backups, you are responsible for maintaining your own
            backup copies of important User Content. We are not liable for any loss or
            corruption of User Content.
          </p>
        </CollapsibleSection>
      </section>

      <section id="intellectual-property" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <Shield className="w-7 h-7 text-teal" />
          7. Intellectual Property Rights
        </h2>

        <CollapsibleSection title="Our Intellectual Property" defaultOpen={true}>
          <p className="mb-3">
            The Service and all content, features, and functionality (excluding User Content)
            are owned by HikeWise and protected by intellectual property laws, including:
          </p>
          <ul className="space-y-2">
            <li>• Software code and architecture</li>
            <li>• Design, text, graphics, logos, and icons</li>
            <li>• Trademarks, service marks, and trade names</li>
            <li>• Audio, video, and other multimedia content</li>
            <li>• Algorithms, formulas, and proprietary methods</li>
            <li>• Documentation and user interfaces</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Limited License to You">
          <p className="mb-3">
            We grant you a limited, non-exclusive, non-transferable, revocable license to:
          </p>
          <ul className="space-y-2">
            <li>• Access and use the Service for personal, non-commercial purposes</li>
            <li>• Download and use the mobile application on devices you own or control</li>
            <li>• Use the Service in accordance with these Terms</li>
          </ul>
          <p className="mt-3 text-sm">
            This license does not include any right to: (a) resell or make commercial use of
            the Service, (b) modify, reverse engineer, or create derivative works, (c) download
            content except as expressly permitted, or (d) use data mining or similar methods.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Feedback and Suggestions">
          <p>
            If you provide feedback, suggestions, or ideas about the Service (&quot;Feedback&quot;),
            you agree that:
          </p>
          <ul className="mt-3 space-y-2">
            <li>• We may use your Feedback without compensation or attribution</li>
            <li>• You grant us all rights, title, and interest in the Feedback</li>
            <li>• Feedback is provided voluntarily and is not confidential</li>
            <li>• We have no obligation to implement or respond to Feedback</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Trademark Policy">
          <p>
            &quot;HikeWise,&quot; the HikeWise logo, &quot;Nora,&quot; and other marks are
            trademarks of HikeWise. You may not use our trademarks without prior written
            permission, except as necessary to identify HikeWise as the source of the Service.
          </p>
        </CollapsibleSection>
      </section>

      <section id="subscriptions" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <CreditCard className="w-7 h-7 text-teal" />
          8. Subscriptions and Payments
        </h2>

        <CollapsibleSection title="Free and Premium Features" defaultOpen={true}>
          <p className="mb-3">
            HikeWise offers both free and premium features:
          </p>
          <div className="space-y-3">
            <div>
              <strong>Free Tier:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Basic focus timer with limited daily sessions</li>
                <li>• Progress tracking and streaks</li>
                <li>• Access to public Study Rooms</li>
                <li>• Basic analytics</li>
              </ul>
            </div>
            <div>
              <strong>Premium Tier:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Unlimited focus sessions</li>
                <li>• Advanced AI insights with Nora</li>
                <li>• Priority access to Study Rooms</li>
                <li>• Detailed analytics and reports</li>
                <li>• Custom study room creation</li>
                <li>• Ad-free experience</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Billing and Payment">
          <p className="mb-3">
            Premium subscriptions are billed in advance on a recurring basis:
          </p>
          <ul className="space-y-2">
            <li>• <strong>Monthly:</strong> Billed every month until canceled</li>
            <li>• <strong>Annual:</strong> Billed once per year (discounted rate)</li>
          </ul>
          <p className="mt-3 text-sm">
            Payment is processed through Apple App Store, Google Play, or Stripe (for web).
            Pricing is displayed in your local currency and may vary by region.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Automatic Renewal">
          <p>
            Subscriptions automatically renew unless you cancel at least 24 hours before the
            end of the current billing period. You will be charged for the renewal within
            24 hours prior to the end of the current period.
          </p>
          <p className="mt-3 text-sm">
            To cancel, go to your account settings or manage subscriptions through your
            app store account. Cancellation takes effect at the end of the current billing period.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Refund Policy">
          <p className="mb-3">
            Refunds are handled according to the platform where you purchased:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Apple App Store:</strong> Managed by Apple&apos;s refund policy.
              Request refunds through Apple.
            </li>
            <li>
              <strong>Google Play:</strong> Managed by Google&apos;s refund policy.
              Request refunds through Google Play.
            </li>
            <li>
              <strong>Web (Stripe):</strong> We offer a 7-day money-back guarantee for
              first-time subscribers. Contact support@hikewise.app within 7 days of purchase.
            </li>
          </ul>
          <p className="mt-3 text-sm">
            Partial refunds for unused portions of subscription periods are not available.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Price Changes">
          <p>
            We may change subscription prices at any time. Price changes for existing subscribers
            will take effect at the start of the next billing cycle after notice is provided.
            We will notify you at least 30 days before any price increase.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Taxes">
          <p>
            All prices are exclusive of applicable taxes unless stated otherwise. You are
            responsible for paying all taxes associated with your subscription, including
            VAT, GST, or sales tax.
          </p>
        </CollapsibleSection>
      </section>

      <section id="termination" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <Ban className="w-7 h-7 text-teal" />
          9. Account Termination
        </h2>

        <CollapsibleSection title="Termination by You" defaultOpen={true}>
          <p className="mb-3">
            You may terminate your account at any time:
          </p>
          <ul className="space-y-2">
            <li>• Go to Settings → Account → Delete Account</li>
            <li>• Or contact support@hikewise.app to request deletion</li>
          </ul>
          <p className="mt-3 text-sm">
            Upon termination, you will lose access to Premium features immediately. Your
            data will be deleted within 30 days according to our Privacy Policy.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Termination by Us">
          <p className="mb-3">
            We may suspend or terminate your account immediately, without prior notice or
            liability, if:
          </p>
          <ul className="space-y-2">
            <li>• You violate these Terms or our Acceptable Use Policy</li>
            <li>• You engage in conduct harmful to other users or the Service</li>
            <li>• You fail to pay subscription fees</li>
            <li>• Your account is inactive for more than 12 months</li>
            <li>• We are required to do so by law or legal process</li>
            <li>• We decide to discontinue the Service</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Effect of Termination">
          <p className="mb-3">
            Upon termination of your account:
          </p>
          <ul className="space-y-2">
            <li>• Your right to use the Service ceases immediately</li>
            <li>• Your subscription is canceled (no refunds for partial periods)</li>
            <li>• We may delete your User Content and account data</li>
            <li>• Some provisions of these Terms will survive termination</li>
          </ul>
          <p className="mt-3 text-sm">
            Surviving provisions include: intellectual property rights, disclaimer of warranties,
            limitation of liability, indemnification, and dispute resolution.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Reactivation">
          <p>
            If your account is suspended (not deleted), you may request reactivation by
            contacting support and resolving the issue that led to suspension. We reserve
            the right to deny reactivation.
          </p>
        </CollapsibleSection>
      </section>

      <section id="disclaimers" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <AlertCircle className="w-7 h-7 text-teal" />
          10. Disclaimers and Warranties
        </h2>
        <div className="bg-muted border-l-4 border-teal rounded-lg p-6 space-y-4 text-sm">
          <p className="font-medium uppercase tracking-wide">IMPORTANT LEGAL NOTICE:</p>
          <p className="leading-relaxed">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
            WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
          </p>
          <p className="leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, HIKEWISE DISCLAIMS ALL WARRANTIES, INCLUDING
            BUT NOT LIMITED TO:
          </p>
          <ul className="space-y-2 ml-4">
            <li>• IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
            <li>• WARRANTIES REGARDING AVAILABILITY, RELIABILITY, OR ACCURACY OF THE SERVICE</li>
            <li>• WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
            <li>• WARRANTIES REGARDING THE QUALITY, ACCURACY, OR COMPLETENESS OF CONTENT</li>
          </ul>
          <p className="leading-relaxed">
            HIKEWISE IS A STUDY PRODUCTIVITY TOOL AND DOES NOT GUARANTEE ACADEMIC SUCCESS,
            IMPROVED GRADES, OR ANY PARTICULAR RESULTS. YOUR ACADEMIC OUTCOMES DEPEND ON YOUR
            OWN EFFORT, ABILITIES, AND CIRCUMSTANCES BEYOND OUR CONTROL.
          </p>
          <p className="leading-relaxed">
            WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR THAT DEFECTS
            WILL BE CORRECTED. USE OF THE SERVICE IS AT YOUR OWN RISK.
          </p>
        </div>
      </section>

      <section id="limitation-liability" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Shield className="w-7 h-7 text-teal" />
          11. Limitation of Liability
        </h2>
        <div className="bg-muted border-l-4 border-teal rounded-lg p-6 space-y-4 text-sm">
          <p className="font-medium uppercase tracking-wide">LIMITATION OF DAMAGES:</p>
          <p className="leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL HIKEWISE, ITS OFFICERS,
            DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY:
          </p>
          <ul className="space-y-2 ml-4">
            <li>
              • INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
            </li>
            <li>
              • LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES
            </li>
            <li>
              • DAMAGES RESULTING FROM: (a) YOUR USE OR INABILITY TO USE THE SERVICE;
              (b) UNAUTHORIZED ACCESS TO YOUR DATA; (c) STATEMENTS OR CONDUCT OF THIRD PARTIES;
              (d) ANY OTHER MATTER RELATING TO THE SERVICE
            </li>
          </ul>
          <p className="leading-relaxed">
            OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM THESE TERMS OR THE SERVICE SHALL
            NOT EXCEED THE GREATER OF:
          </p>
          <ul className="space-y-2 ml-4">
            <li>• THE AMOUNT YOU PAID TO HIKEWISE IN THE 12 MONTHS PRECEDING THE CLAIM, OR</li>
            <li>• ONE HUNDRED DOLLARS ($100 USD)</li>
          </ul>
          <p className="leading-relaxed">
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES,
            SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
          </p>
        </div>
      </section>

      <section id="indemnification" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Scale className="w-7 h-7 text-teal" />
          12. Indemnification
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You agree to indemnify, defend, and hold harmless HikeWise and its officers, directors,
          employees, contractors, agents, licensors, and suppliers from and against any claims,
          liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including
          reasonable attorneys&apos; fees) arising out of or relating to:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Your use or misuse of the Service</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Your violation of these Terms</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Your User Content or any content you submit, post, or transmit</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Your violation of any rights of another person or entity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Any violation of applicable law or regulation</span>
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
          We reserve the right to assume the exclusive defense and control of any matter
          subject to indemnification by you, in which case you will cooperate with us in
          asserting any available defenses.
        </p>
      </section>

      <section id="dispute-resolution" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <Gavel className="w-7 h-7 text-teal" />
          13. Dispute Resolution
        </h2>

        <CollapsibleSection title="Informal Resolution" defaultOpen={true}>
          <p>
            Before filing a formal dispute, you agree to first contact us at legal@hikewise.app
            to attempt to resolve the dispute informally. We will work in good faith to resolve
            any issues within 30 days.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Binding Arbitration">
          <p className="mb-3">
            If we cannot resolve a dispute informally, you and HikeWise agree to resolve
            disputes through binding arbitration, rather than in court, except:
          </p>
          <ul className="space-y-2">
            <li>• Disputes that qualify for small claims court</li>
            <li>• Claims for injunctive or equitable relief for intellectual property infringement</li>
          </ul>
          <p className="mt-3 text-sm">
            Arbitration will be conducted under the rules of the American Arbitration Association
            (AAA). The arbitrator&apos;s decision is final and binding, and judgment may be
            entered in any court of competent jurisdiction.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Class Action Waiver">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
            <p className="text-sm text-amber-800">
              <strong>IMPORTANT:</strong> You agree to resolve disputes with HikeWise on an
              individual basis only.
            </p>
          </div>
          <p>
            You waive the right to participate in class action lawsuits or class-wide arbitration.
            All disputes must be brought in your individual capacity, not as a plaintiff or
            class member in any purported class or representative proceeding.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Arbitration Costs">
          <p>
            HikeWise will pay all arbitration filing fees and costs for claims under $10,000.
            For claims over $10,000, fees are allocated according to AAA rules. Each party
            bears their own attorneys&apos; fees unless awarded by the arbitrator.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Opt-Out">
          <p>
            You may opt out of arbitration within 30 days of first accepting these Terms by
            sending written notice to legal@hikewise.app. Include your name, address, and
            clear statement that you wish to opt out of arbitration.
          </p>
        </CollapsibleSection>
      </section>

      <section id="governing-law" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Globe className="w-7 h-7 text-teal" />
          14. Governing Law and Jurisdiction
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          These Terms and any disputes arising from them are governed by and construed in
          accordance with the laws of the State of Delaware, United States, without regard to
          its conflict of law provisions.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Any legal action or proceeding (to the extent not subject to arbitration) shall be
          brought exclusively in the federal or state courts located in Delaware, and you
          consent to the personal jurisdiction of such courts.
        </p>
        <p className="text-muted-foreground leading-relaxed text-sm">
          For users outside the United States, you agree that any disputes will be resolved
          according to these provisions, except where prohibited by local law.
        </p>
      </section>

      <section id="changes" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <RefreshCw className="w-7 h-7 text-teal" />
          15. Changes to These Terms
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We reserve the right to modify these Terms at any time. When we make changes:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Notice:</strong> We will notify you by email, in-app notification, or
              prominent notice on our website at least 30 days before material changes take effect
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Effective Date:</strong> The updated Terms will show the &quot;Last Updated&quot;
              date at the top
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Acceptance:</strong> Continued use of the Service after changes take effect
              constitutes acceptance of the modified Terms
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Terminate:</strong> If you do not agree to the modified Terms,
              you may terminate your account before the changes take effect
            </span>
          </li>
        </ul>
      </section>

      <section id="general" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <FileText className="w-7 h-7 text-teal" />
          16. General Provisions
        </h2>

        <div className="space-y-4">
          <CollapsibleSection title="Entire Agreement" defaultOpen={true}>
            <p>
              These Terms, together with our Privacy Policy and any other legal notices or
              policies we publish, constitute the entire agreement between you and HikeWise
              regarding the Service.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Severability">
            <p>
              If any provision of these Terms is found to be invalid, illegal, or unenforceable,
              the remaining provisions will continue in full force and effect. The invalid
              provision will be modified to the minimum extent necessary to make it valid and
              enforceable.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Waiver">
            <p>
              Our failure to enforce any right or provision of these Terms does not constitute
              a waiver of that right or provision. No waiver of any term will be deemed a
              further or continuing waiver of such term or any other term.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Assignment">
            <p>
              You may not assign or transfer these Terms or your rights under them without our
              prior written consent. We may assign our rights and obligations under these Terms
              without restriction, including in connection with a merger, acquisition, or sale
              of assets.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Force Majeure">
            <p>
              We are not liable for any delay or failure to perform due to causes beyond our
              reasonable control, including acts of God, war, terrorism, natural disasters,
              pandemics, government actions, or failures of third-party services.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Export Controls">
            <p>
              The Service may be subject to export control laws. You agree to comply with all
              applicable export and re-export restrictions and will not access or use the Service
              if you are in a country subject to U.S. embargo or if you are on any U.S. list
              of prohibited or restricted parties.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="U.S. Government Users">
            <p>
              If you are a U.S. government entity, the Service is a &quot;Commercial Item&quot;
              as defined in 48 C.F.R. §2.101, and is licensed with only those rights as are
              granted to all other end users under these Terms.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Third-Party Services">
            <p>
              The Service may contain links to third-party websites or services. We are not
              responsible for the content, accuracy, or practices of third parties. Your use
              of third-party services is at your own risk and subject to their terms.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Survival">
            <p>
              Provisions that by their nature should survive termination will survive, including:
              ownership, intellectual property rights, disclaimer of warranties, limitation of
              liability, indemnification, dispute resolution, and general provisions.
            </p>
          </CollapsibleSection>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 mt-12 mb-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Mail className="w-7 h-7 text-teal" />
          17. Contact Us
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          If you have any questions about these Terms of Service or need assistance, please
          contact us:
        </p>
        <div className="bg-muted rounded-xl p-8 not-prose">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Legal Inquiries</p>
                <a
                  href="mailto:legal@hikewise.app"
                  className="font-medium text-foreground hover:text-forest transition-colors"
                >
                  legal@hikewise.app
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">General Support</p>
                <a
                  href="mailto:support@hikewise.app"
                  className="font-medium text-foreground hover:text-forest transition-colors"
                >
                  support@hikewise.app
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Website</p>
                <a
                  href="https://hikewise.app/contact"
                  className="font-medium text-foreground hover:text-forest transition-colors"
                >
                  hikewise.app/contact
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Response Time</p>
                <p className="font-medium text-foreground">Within 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LegalLayout>
  )
}
