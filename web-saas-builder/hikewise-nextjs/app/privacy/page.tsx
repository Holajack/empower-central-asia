import { Metadata } from 'next'
import { Shield, Lock, Eye, Trash2, Mail, Globe, Bot, Users, Cookie, Baby, Globe2, Scale, FileText, AlertCircle } from 'lucide-react'
import { LegalLayout } from '@/components/legal/legal-layout'
import { CollapsibleSection } from '@/components/legal/collapsible-section'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'HikeWise Privacy Policy - Learn how we collect, use, and protect your personal data.',
}

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-information', title: 'How We Use Your Information' },
  { id: 'ai-data-processing', title: 'AI Data Processing (Nora)' },
  { id: 'study-rooms-privacy', title: 'Virtual Study Rooms' },
  { id: 'data-sharing', title: 'Data Sharing and Disclosure' },
  { id: 'third-party-integrations', title: 'Third-Party Integrations' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'your-rights', title: 'Your Rights and Choices' },
  { id: 'cookies', title: 'Cookies and Tracking' },
  { id: 'childrens-privacy', title: "Children's Privacy" },
  { id: 'international-transfers', title: 'International Data Transfers' },
  { id: 'california-rights', title: 'California Privacy Rights (CCPA)' },
  { id: 'european-rights', title: 'European Privacy Rights (GDPR)' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
]

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="February 9, 2026"
      icon={<Shield className="w-8 h-8 text-teal" />}
      sections={sections}
    >
      {/* Quick Summary */}
      <div className="bg-muted rounded-2xl p-8 mb-12 not-prose">
        <h2 className="text-xl font-semibold mb-6">Privacy at a Glance</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-teal mt-1 shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Your Data is Encrypted</h3>
              <p className="text-sm text-muted-foreground">
                All data is encrypted in transit and at rest
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Eye className="w-5 h-5 text-teal mt-1 shrink-0" />
            <div>
              <h3 className="font-medium mb-1">No Selling of Data</h3>
              <p className="text-sm text-muted-foreground">
                We never sell your personal information
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Trash2 className="w-5 h-5 text-teal mt-1 shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Delete Anytime</h3>
              <p className="text-sm text-muted-foreground">
                Request complete data deletion at any time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section id="introduction" className="scroll-mt-24">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <FileText className="w-7 h-7 text-teal" />
          1. Introduction
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          HikeWise (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
          committed to protecting your privacy. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when
          you use our mobile application (available on iOS and Android) and
          website at hikewise.app.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          By using HikeWise, you agree to the collection and use of
          information in accordance with this policy. If you do not agree with
          our policies and practices, please do not use our services.
        </p>
      </section>

      <section id="information-we-collect" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-6 flex items-center gap-3">
          <Eye className="w-7 h-7 text-teal" />
          2. Information We Collect
        </h2>

        <CollapsibleSection title="Information You Provide" defaultOpen={true}>
          <ul className="space-y-3">
            <li>
              <strong>Account Information:</strong> Name, email address, and
              password when you create an account
            </li>
            <li>
              <strong>Profile Data:</strong> Avatar, display name, study
              preferences, goals, and academic interests
            </li>
            <li>
              <strong>Study Data:</strong> Focus session durations, subjects
              studied, streaks, achievements, and progress tracking
            </li>
            <li>
              <strong>Communications:</strong> Messages you send through Study
              Rooms, support requests, and feedback
            </li>
            <li>
              <strong>Payment Information:</strong> If you subscribe to premium
              features (processed securely by our payment provider Stripe - we do not store full credit card details)
            </li>
            <li>
              <strong>User-Generated Content:</strong> Study notes, goals, custom tags, and any content you create within the app
            </li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Information Collected Automatically">
          <ul className="space-y-3">
            <li>
              <strong>Device Information:</strong> Device type, operating system
              version, unique device identifiers, mobile network information
            </li>
            <li>
              <strong>Usage Data:</strong> Features used, time spent in app,
              interaction patterns, session frequency, and feature engagement
            </li>
            <li>
              <strong>Log Data:</strong> IP address, browser type, pages visited,
              access times, referring URLs
            </li>
            <li>
              <strong>Analytics:</strong> Aggregated data about app performance
              and user behavior (we use privacy-focused analytics)
            </li>
            <li>
              <strong>Location Data:</strong> Approximate location based on IP address (we do not collect precise GPS location)
            </li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Information from Third Parties">
          <ul className="space-y-3">
            <li>
              <strong>Social Login:</strong> If you sign in with Apple, Google, or other OAuth providers,
              we receive your name, email, and profile picture (if you grant permission)
            </li>
            <li>
              <strong>App Store Data:</strong> Subscription status and transaction history from Apple App
              Store or Google Play Store
            </li>
            <li>
              <strong>Integration Partners:</strong> If you connect third-party services (calendar, task managers),
              we receive only the data necessary for the integration to function
            </li>
          </ul>
        </CollapsibleSection>
      </section>

      <section id="how-we-use-information" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <FileText className="w-7 h-7 text-teal" />
          3. How We Use Your Information
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use the information we collect to:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Provide, maintain, and improve our services</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Personalize your study experience with Nora, our AI companion</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Track your progress and generate personalized insights and recommendations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Enable social features like Study Rooms, leaderboards, and study groups</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Send notifications about streaks, achievements, reminders, and product updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Process payments and manage subscriptions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Respond to support requests and communicate with you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Analyze usage patterns to improve our app and develop new features</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Detect and prevent fraud, abuse, and security incidents</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>Comply with legal obligations and enforce our Terms of Service</span>
          </li>
        </ul>
      </section>

      <section id="ai-data-processing" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Bot className="w-7 h-7 text-teal" />
          4. AI Data Processing (Nora AI Companion)
        </h2>
        <div className="bg-teal/5 border border-teal/20 rounded-xl p-6 mb-6">
          <div className="flex gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
            <p className="text-sm font-medium">Important: How Nora AI Uses Your Data</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Nora, our AI study companion, processes your study data to provide personalized recommendations
            and insights. Here&apos;s what you need to know:
          </p>
        </div>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Data Used:</strong> Nora analyzes your study sessions, subjects, goals, and progress
              to generate personalized recommendations
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>AI Provider:</strong> We use OpenAI&apos;s GPT-4 API for AI processing. Your data
              is sent to OpenAI only when you interact with Nora
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Data Protection:</strong> OpenAI does not use your data to train their models.
              All API communications are encrypted
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Opt-Out:</strong> You can disable Nora AI features at any time in your settings.
              This will prevent any data from being sent to AI providers
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Retention:</strong> AI conversations are stored on our servers for 90 days to
              maintain context, then automatically deleted
            </span>
          </li>
        </ul>
      </section>

      <section id="study-rooms-privacy" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Users className="w-7 h-7 text-teal" />
          5. Virtual Study Rooms Privacy
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Study Rooms are shared spaces where students can study together. Here&apos;s how your privacy is protected:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Visibility Control:</strong> You choose which information is visible to other users
              (display name, avatar, current study status)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Private Data:</strong> Your personal study data, goals, and detailed progress
              are never visible to other users unless you explicitly share them
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Chat Messages:</strong> Messages sent in Study Rooms are visible to all room
              members and stored for 30 days
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Moderation:</strong> We monitor Study Rooms for inappropriate content and may
              review reported messages for safety
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Leave Anytime:</strong> You can leave any Study Room at any time, and your
              presence history will be removed
            </span>
          </li>
        </ul>
      </section>

      <section id="data-sharing" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Globe className="w-7 h-7 text-teal" />
          6. Data Sharing and Disclosure
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We do not sell your personal information. We may share your data with:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Service Providers:</strong> Third parties who help us operate our services
              (cloud hosting, analytics, customer support, payment processing)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Other Users:</strong> Your profile name and study status when using Study Rooms
              or leaderboards (you control visibility settings)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Legal Requirements:</strong> When required by law, subpoena, or to protect
              our rights, property, or safety
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale
              of assets (we will notify you and you can request data deletion)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>With Your Consent:</strong> Any other third parties with your explicit permission
            </span>
          </li>
        </ul>
      </section>

      <section id="third-party-integrations" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Globe2 className="w-7 h-7 text-teal" />
          7. Third-Party Integrations
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          HikeWise integrates with third-party services to enhance your experience. These integrations are optional:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Calendar Sync:</strong> Connect your Google Calendar or Apple Calendar to sync
              study sessions. We access only calendar events you grant permission for.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Cloud Storage:</strong> Optionally backup your study notes to Google Drive,
              Dropbox, or iCloud. We do not access files outside of HikeWise data.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Analytics:</strong> We use privacy-focused analytics (PostHog) that do not
              track users across websites or sell data to third parties.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Payment Processing:</strong> Stripe processes all payments. They handle credit
              card information according to PCI-DSS standards. We never see full card details.
            </span>
          </li>
        </ul>
      </section>

      <section id="data-security" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Lock className="w-7 h-7 text-teal" />
          8. Data Security
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We implement industry-standard security measures to protect your data:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Encryption in Transit:</strong> All data transmitted between your device and
              our servers is encrypted using TLS 1.3
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Encryption at Rest:</strong> All data stored on our servers is encrypted using
              AES-256 encryption
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Regular Security Audits:</strong> We conduct regular security audits and
              vulnerability assessments
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Access Controls:</strong> Staff access to user data is strictly limited and
              logged. All employees undergo security training.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Secure Infrastructure:</strong> We use enterprise-grade cloud providers
              (Vercel, Supabase) with SOC 2 compliance
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Password Protection:</strong> Passwords are hashed using bcrypt with salt.
              We never store plaintext passwords.
            </span>
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
          While we strive to protect your information using commercially acceptable means, no method of
          transmission over the Internet or electronic storage is 100% secure. We cannot guarantee
          absolute security, but we will notify you promptly of any security breach.
        </p>
      </section>

      <section id="data-retention" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Trash2 className="w-7 h-7 text-teal" />
          9. Data Retention
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We retain your data for as long as necessary to provide our services. Our retention policy:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Active Accounts:</strong> Data is retained while your account is active and
              for 90 days after your last login
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Account Deletion:</strong> When you delete your account, personal data is
              permanently deleted within 30 days
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Anonymized Analytics:</strong> Aggregated, anonymized data may be retained
              for up to 2 years for product improvement
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Legal Records:</strong> Financial records and legal compliance data may be
              retained as required by law (typically 7 years)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Backups:</strong> Deleted data may persist in backups for up to 90 days before
              being permanently purged
            </span>
          </li>
        </ul>
      </section>

      <section id="your-rights" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Scale className="w-7 h-7 text-teal" />
          10. Your Rights and Choices
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Depending on your location, you may have the following rights regarding your personal data:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Access:</strong> Request a copy of your personal data in a portable format
              (JSON or CSV)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Correction:</strong> Update or correct inaccurate data directly in your
              account settings
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Deletion:</strong> Request deletion of your personal data (right to be forgotten)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Portability:</strong> Receive your data in a machine-readable format to
              transfer to another service
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Opt-Out:</strong> Unsubscribe from marketing communications (you&apos;ll still
              receive essential service emails)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Restrict Processing:</strong> Limit how we use your data in certain circumstances
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Object:</strong> Object to processing of your data for certain purposes
              (like marketing)
            </span>
          </li>
        </ul>
        <div className="mt-6 bg-muted rounded-xl p-6">
          <p className="text-sm text-muted-foreground">
            To exercise these rights, contact us at{' '}
            <a href="mailto:privacy@hikewise.app" className="text-teal hover:underline font-medium">
              privacy@hikewise.app
            </a>{' '}
            or use the privacy settings in your account. We will respond to your request within
            30 days.
          </p>
        </div>
      </section>

      <section id="cookies" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Cookie className="w-7 h-7 text-teal" />
          11. Cookies and Tracking Technologies
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use cookies and similar tracking technologies to improve your experience:
        </p>
        <CollapsibleSection title="Essential Cookies" defaultOpen={true}>
          <p>
            Required for the app to function properly. These cannot be disabled:
          </p>
          <ul className="mt-3 space-y-2">
            <li>• Authentication cookies (keep you logged in)</li>
            <li>• Security cookies (prevent fraud and abuse)</li>
            <li>• Session cookies (maintain your session state)</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Analytics Cookies">
          <p>
            Help us understand how you use HikeWise to improve the app:
          </p>
          <ul className="mt-3 space-y-2">
            <li>• Page views and navigation patterns</li>
            <li>• Feature usage and engagement metrics</li>
            <li>• Performance and error tracking</li>
          </ul>
          <p className="mt-3 text-sm">
            You can opt out of analytics cookies in your account settings or browser preferences.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Marketing Cookies">
          <p>
            Used to show you relevant content and measure campaign effectiveness:
          </p>
          <ul className="mt-3 space-y-2">
            <li>• Personalized content recommendations</li>
            <li>• Ad campaign performance tracking</li>
            <li>• Social media integration</li>
          </ul>
          <p className="mt-3 text-sm">
            You can opt out of marketing cookies through your browser or our cookie consent banner.
          </p>
        </CollapsibleSection>

        <p className="text-muted-foreground text-sm mt-6">
          To control cookies, adjust your browser settings or use our cookie preference center
          (accessible from the website footer). Note that disabling certain cookies may limit
          functionality.
        </p>
      </section>

      <section id="childrens-privacy" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Baby className="w-7 h-7 text-teal" />
          12. Children&apos;s Privacy (COPPA Compliance)
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 mb-2">Age Requirement</p>
              <p className="text-sm text-amber-700">
                HikeWise is designed for users aged 13 and older. We do not knowingly collect
                personal information from children under 13.
              </p>
            </div>
          </div>
        </div>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Age Verification:</strong> We ask users to confirm they are 13+ during registration
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Parental Rights:</strong> If you believe your child under 13 has created an
              account, contact us immediately at privacy@hikewise.app
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Data Deletion:</strong> If we learn we have collected data from a child under
              13, we will delete it immediately
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Teen Safety:</strong> For users aged 13-17, we recommend parental supervision
              and provide enhanced privacy settings
            </span>
          </li>
        </ul>
      </section>

      <section id="international-transfers" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Globe2 className="w-7 h-7 text-teal" />
          13. International Data Transfers
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          HikeWise is operated from the United States. If you access our services from outside
          the US, your data may be transferred to and processed in the United States or other
          countries where our service providers operate.
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Legal Framework:</strong> We rely on Standard Contractual Clauses (SCCs)
              approved by the European Commission for EU data transfers
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Safeguards:</strong> We ensure appropriate safeguards are in place for
              all international transfers
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Data Protection:</strong> Regardless of location, your data receives the
              same level of protection described in this policy
            </span>
          </li>
        </ul>
      </section>

      <section id="california-rights" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Scale className="w-7 h-7 text-teal" />
          14. California Privacy Rights (CCPA)
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you are a California resident, the California Consumer Privacy Act (CCPA) provides
          you with additional rights:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Know:</strong> Request disclosure of the categories and specific
              pieces of personal information we collect
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Delete:</strong> Request deletion of personal information we
              have collected
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Opt-Out:</strong> Opt out of the &quot;sale&quot; of personal
              information (we do not sell your data)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Non-Discrimination:</strong> We will not discriminate against
              you for exercising your CCPA rights
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Authorized Agent:</strong> You may designate an authorized agent to
              make requests on your behalf
            </span>
          </li>
        </ul>
        <div className="mt-6 bg-muted rounded-xl p-6">
          <p className="text-sm font-medium mb-2">California Privacy Notice</p>
          <p className="text-sm text-muted-foreground">
            In the past 12 months, we collected the following categories of personal information:
            identifiers, commercial information, internet activity, and inferences. We do not
            sell personal information. To exercise your CCPA rights, contact{' '}
            <a href="mailto:privacy@hikewise.app" className="text-teal hover:underline font-medium">
              privacy@hikewise.app
            </a>
            .
          </p>
        </div>
      </section>

      <section id="european-rights" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Globe className="w-7 h-7 text-teal" />
          15. European Privacy Rights (GDPR)
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you are in the European Economic Area (EEA), United Kingdom, or Switzerland,
          the General Data Protection Regulation (GDPR) provides you with specific rights:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Legal Basis:</strong> We process your data based on (1) contract performance,
              (2) legitimate interests, (3) consent, or (4) legal obligations
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right of Access:</strong> Obtain confirmation of whether we process your
              data and receive a copy
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Rectification:</strong> Correct inaccurate or incomplete data
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Erasure:</strong> Request deletion of your data (&quot;right to
              be forgotten&quot;)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Restriction:</strong> Limit processing of your data in certain
              circumstances
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Data Portability:</strong> Receive your data in a structured,
              commonly used format
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Object:</strong> Object to processing based on legitimate interests
              or for direct marketing
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where
              processing is based on consent
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Right to Lodge a Complaint:</strong> File a complaint with your local
              data protection authority
            </span>
          </li>
        </ul>
        <div className="mt-6 bg-muted rounded-xl p-6">
          <p className="text-sm text-muted-foreground">
            To exercise your GDPR rights or for questions about data processing, contact our
            Data Protection Officer at{' '}
            <a href="mailto:dpo@hikewise.app" className="text-teal hover:underline font-medium">
              dpo@hikewise.app
            </a>
            .
          </p>
        </div>
      </section>

      <section id="changes" className="scroll-mt-24 mt-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <FileText className="w-7 h-7 text-teal" />
          16. Changes to This Privacy Policy
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          technology, legal requirements, or other factors.
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Notification:</strong> We will notify you of significant changes by email,
              in-app notification, or prominent notice on our website
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Review:</strong> We encourage you to review this policy periodically
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Effective Date:</strong> Changes become effective when posted, unless
              otherwise stated
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal mt-1">•</span>
            <span>
              <strong>Continued Use:</strong> Continued use of HikeWise after changes constitutes
              acceptance of the updated policy
            </span>
          </li>
        </ul>
      </section>

      <section id="contact" className="scroll-mt-24 mt-12 mb-12">
        <h2 className="text-3xl font-bold text-forest mb-4 flex items-center gap-3">
          <Mail className="w-7 h-7 text-teal" />
          17. Contact Us
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          If you have questions about this Privacy Policy, want to exercise your rights, or
          have privacy concerns, please contact us:
        </p>
        <div className="bg-muted rounded-xl p-8 not-prose">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email (General)</p>
                <a
                  href="mailto:privacy@hikewise.app"
                  className="font-medium text-foreground hover:text-teal transition-colors"
                >
                  privacy@hikewise.app
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Data Protection Officer</p>
                <a
                  href="mailto:dpo@hikewise.app"
                  className="font-medium text-foreground hover:text-teal transition-colors"
                >
                  dpo@hikewise.app
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Website</p>
                <a
                  href="https://hikewise.app/contact"
                  className="font-medium text-foreground hover:text-teal transition-colors"
                >
                  hikewise.app/contact
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Response Time</p>
                <p className="font-medium text-foreground">Within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LegalLayout>
  )
}
