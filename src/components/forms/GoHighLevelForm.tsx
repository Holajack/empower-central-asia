import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";

// Validation schemas — messages are set dynamically after region detection
const makeContactSchema = (ru: boolean) =>
  z.object({
    firstName: z.string().min(2, ru ? "Имя должно содержать не менее 2 символов" : "First name must be at least 2 characters"),
    lastName: z.string().min(2, ru ? "Фамилия должна содержать не менее 2 символов" : "Last name must be at least 2 characters"),
    email: z.string().email(ru ? "Пожалуйста, введите корректный адрес электронной почты" : "Please enter a valid email address"),
    phone: z.string().min(10, ru ? "Номер телефона должен содержать не менее 10 цифр" : "Phone number must be at least 10 digits"),
    inquiryType: z.string().min(1, ru ? "Пожалуйста, выберите тип запроса" : "Please select an inquiry type"),
    message: z.string().min(10, ru ? "Сообщение должно содержать не менее 10 символов" : "Message must be at least 10 characters"),
    source: z.string().optional(),
  });

const makeVolunteerSchema = (ru: boolean) =>
  z.object({
    firstName: z.string().min(2, ru ? "Имя должно содержать не менее 2 символов" : "First name must be at least 2 characters"),
    lastName: z.string().min(2, ru ? "Фамилия должна содержать не менее 2 символов" : "Last name must be at least 2 characters"),
    email: z.string().email(ru ? "Пожалуйста, введите корректный адрес электронной почты" : "Please enter a valid email address"),
    phone: z.string().min(10, ru ? "Номер телефона должен содержать не менее 10 цифр" : "Phone number must be at least 10 digits"),
    volunteerType: z.string().min(1, ru ? "Пожалуйста, выберите вид волонтёрства" : "Please select a volunteer opportunity"),
    experience: z.string().min(10, ru ? "Пожалуйста, опишите ваш опыт" : "Please describe your experience"),
    availability: z.string().min(1, ru ? "Пожалуйста, укажите вашу доступность" : "Please specify your availability"),
    motivation: z.string().min(20, ru ? "Пожалуйста, расскажите, почему вы хотите стать волонтёром (не менее 20 символов)" : "Please tell us why you want to volunteer (at least 20 characters)"),
    skills: z.string().min(5, ru ? "Пожалуйста, перечислите ваши навыки" : "Please list your relevant skills"),
  });

type ContactFormData = z.infer<ReturnType<typeof makeContactSchema>>;
type VolunteerFormData = z.infer<ReturnType<typeof makeVolunteerSchema>>;

interface GoHighLevelFormProps {
  formType: "contact" | "volunteer";
  title: string;
  description: string;
  submitButtonText?: string;
  volunteerOpportunity?: string;
  onSuccess?: () => void;
}

const GoHighLevelForm: React.FC<GoHighLevelFormProps> = ({
  formType,
  title,
  description,
  submitButtonText = "Submit",
  volunteerOpportunity,
  onSuccess,
}) => {
  const { isCentralAsia } = useRegion();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema =
    formType === "contact"
      ? makeContactSchema(isCentralAsia)
      : makeVolunteerSchema(isCentralAsia);

  const form = useForm<ContactFormData | VolunteerFormData>({
    resolver: zodResolver(schema),
    defaultValues:
      formType === "contact"
        ? {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            inquiryType: "",
            message: "",
            source: typeof window !== "undefined" ? window.location.pathname : "",
          }
        : {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            volunteerType: volunteerOpportunity || "",
            experience: "",
            availability: "",
            motivation: "",
            skills: "",
          },
  });

  // Google Apps Script endpoint
  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

  const submitToGoogleSheet = async (data: ContactFormData | VolunteerFormData) => {
    try {
      const payload = {
        formType,
        submittedAt: new Date().toISOString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        ...(formType === "contact"
          ? {
              inquiryType: (data as ContactFormData).inquiryType,
              message: (data as ContactFormData).message,
            }
          : {
              volunteerType: (data as VolunteerFormData).volunteerType,
              experience: (data as VolunteerFormData).experience,
              availability: (data as VolunteerFormData).availability,
              motivation: (data as VolunteerFormData).motivation,
              skills: (data as VolunteerFormData).skills,
            }),
      };

      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      return { success: true };
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    }
  };

  const onSubmit = async (data: ContactFormData | VolunteerFormData) => {
    setIsSubmitting(true);

    try {
      await submitToGoogleSheet(data);

      trackConversion(
        formType === "contact" ? "contact_submit" : "volunteer_apply",
        { method: "ghl_form", form_type: formType }
      );
      setIsSubmitted(true);
      toast({
        title: isCentralAsia ? "Успешно!" : "Success!",
        description:
          formType === "contact"
            ? isCentralAsia
              ? "Спасибо, что написали нам. Мы ответим в течение 24–48 часов!"
              : "Thank you for reaching out. We'll get back to you within 24-48 hours!"
            : isCentralAsia
            ? "Спасибо за заявку на волонтёрство. Мы рассмотрим её и свяжемся с вами!"
            : "Thank you for your volunteer application. We'll review it and contact you soon!",
      });

      form.reset();
      onSuccess?.();
    } catch {
      toast({
        title: isCentralAsia ? "Ошибка отправки" : "Submission Error",
        description: isCentralAsia
          ? "При отправке формы возникла проблема. Пожалуйста, попробуйте ещё раз или свяжитесь с нами напрямую."
          : "There was an issue submitting your form. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            {formType === "contact"
              ? isCentralAsia
                ? "Сообщение отправлено!"
                : "Message Sent!"
              : isCentralAsia
              ? "Заявка подана!"
              : "Application Submitted!"}
          </h3>
          <p className="text-gray-600 mb-4">
            {formType === "contact"
              ? isCentralAsia
                ? "Мы ответим вам в течение 24–48 часов."
                : "We'll get back to you within 24-48 hours."
              : isCentralAsia
              ? "Мы рассмотрим вашу заявку и свяжемся с вами."
              : "We'll review your application and contact you soon."}
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-2"
          >
            {formType === "contact"
              ? isCentralAsia
                ? "Отправить ещё одно сообщение"
                : "Submit Another Message"
              : isCentralAsia
              ? "Подать ещё одну заявку"
              : "Submit Another Application"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-800">{title}</CardTitle>
        <CardDescription className="text-lg text-gray-600 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {isCentralAsia ? "Имя" : "First Name"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={isCentralAsia ? "Введите ваше имя" : "Enter your first name"}
                        {...field}
                        className="h-12 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isCentralAsia ? "Фамилия" : "Last Name"}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={isCentralAsia ? "Введите вашу фамилию" : "Enter your last name"}
                        {...field}
                        className="h-12 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {isCentralAsia ? "Электронная почта" : "Email Address"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={isCentralAsia ? "ваш@email.com" : "your@email.com"}
                        {...field}
                        className="h-12 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {isCentralAsia ? "Номер телефона" : "Phone Number"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={isCentralAsia ? "+7 (555) 000-0000" : "(386) 555-0123"}
                        {...field}
                        className="h-12 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form-specific fields */}
            {formType === "contact" ? (
              <>
                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isCentralAsia ? "Как мы можем помочь вам?" : "How can we help you?"}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue
                              placeholder={
                                isCentralAsia ? "Выберите тип запроса" : "Select inquiry type"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="volunteer">
                            {isCentralAsia ? "Возможности волонтёрства" : "Volunteer Opportunities"}
                          </SelectItem>
                          <SelectItem value="programs">
                            {isCentralAsia ? "Информация о программах" : "Program Information"}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {isCentralAsia ? "Корпоративное партнёрство" : "Corporate Partnership"}
                          </SelectItem>
                          <SelectItem value="donation">
                            {isCentralAsia ? "Вопросы о пожертвованиях" : "Donation Questions"}
                          </SelectItem>
                          <SelectItem value="media">
                            {isCentralAsia ? "СМИ и пресса" : "Media & Press"}
                          </SelectItem>
                          <SelectItem value="general">
                            {isCentralAsia ? "Общий вопрос" : "General Inquiry"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {isCentralAsia ? "Ваше сообщение" : "Your Message"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            isCentralAsia
                              ? "Расскажите подробнее о вашем запросе. Чем больше деталей вы предоставите, тем лучше мы сможем помочь."
                              : "Tell us more about your inquiry. The more details you provide, the better we can assist you."
                          }
                          className="min-h-[120px] text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="volunteerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isCentralAsia ? "Направление волонтёрства" : "Volunteer Opportunity"}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue
                              placeholder={
                                isCentralAsia
                                  ? "Выберите направление волонтёрства"
                                  : "Select volunteer opportunity"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="leadership-mentor">
                            {isCentralAsia ? "Наставник по развитию лидерства" : "Leadership Development Mentor"}
                          </SelectItem>
                          <SelectItem value="community-organizer">
                            {isCentralAsia ? "Общественный организатор" : "Community Organizer"}
                          </SelectItem>
                          <SelectItem value="business-trainer">
                            {isCentralAsia ? "Волонтёр-бизнес-тренер" : "Business Training Volunteer"}
                          </SelectItem>
                          <SelectItem value="admin-support">
                            {isCentralAsia ? "Административная поддержка" : "Administrative Support"}
                          </SelectItem>
                          <SelectItem value="outreach-specialist">
                            {isCentralAsia ? "Специалист по работе с аудиторией" : "Outreach Specialist"}
                          </SelectItem>
                          <SelectItem value="event-organizer">
                            {isCentralAsia ? "Организатор мероприятий" : "Event Organizer"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isCentralAsia ? "Соответствующий опыт" : "Relevant Experience"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            isCentralAsia
                              ? "Опишите ваш профессиональный опыт, волонтёрскую деятельность или навыки, которые пригодятся в этой роли."
                              : "Describe your relevant work experience, volunteer experience, or skills that would help in this role."
                          }
                          className="min-h-[100px] text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isCentralAsia ? "Доступность" : "Availability"}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue
                              placeholder={
                                isCentralAsia
                                  ? "Укажите вашу доступность"
                                  : "Select your availability"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2-4-hours-week">
                            {isCentralAsia ? "2–4 часа в неделю" : "2-4 hours per week"}
                          </SelectItem>
                          <SelectItem value="5-8-hours-week">
                            {isCentralAsia ? "5–8 часов в неделю" : "5-8 hours per week"}
                          </SelectItem>
                          <SelectItem value="8-12-hours-week">
                            {isCentralAsia ? "8–12 часов в неделю" : "8-12 hours per week"}
                          </SelectItem>
                          <SelectItem value="flexible">
                            {isCentralAsia ? "Гибкий график" : "Flexible schedule"}
                          </SelectItem>
                          <SelectItem value="project-based">
                            {isCentralAsia ? "Проектная основа" : "Project-based"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isCentralAsia
                          ? "Почему вы хотите стать волонтёром?"
                          : "Why do you want to volunteer with us?"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            isCentralAsia
                              ? "Расскажите, что вас мотивирует и почему вас интересует наша миссия."
                              : "Tell us what motivates you to volunteer and why you're interested in our mission."
                          }
                          className="min-h-[100px] text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isCentralAsia ? "Навыки и экспертиза" : "Skills & Expertise"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            isCentralAsia
                              ? "Например: наставничество в бизнесе, маркетинг, финансовое планирование, организация мероприятий..."
                              : "e.g., Business mentorship, marketing, financial planning, event coordination..."
                          }
                          {...field}
                          className="h-12 text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isCentralAsia
                  ? "Отправка..."
                  : "Submitting..."
                : submitButtonText}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              {isCentralAsia
                ? "Ваши данные надёжно защищены и будут использованы только для подбора наилучших возможностей. Мы уважаем вашу конфиденциальность и никогда не передаём личные сведения третьим лицам."
                : "Your information will be securely stored and used to match you with the best opportunities. We respect your privacy and will never share your information."}
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GoHighLevelForm;
