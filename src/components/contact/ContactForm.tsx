
import { useRegion } from "@/contexts/RegionContext";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";

const ContactForm = () => {
  const { isCentralAsia } = useRegion();

  return (
    <GoHighLevelForm
      formType="contact"
      title={isCentralAsia ? "Напишите нам" : "Send Us a Message"}
      description={
        isCentralAsia
          ? "Мы рады ответить на ваши вопросы. Заполните форму ниже, и мы свяжемся с вами в течение 24–48 часов."
          : "We'd love to hear from you. Fill out the form below and we'll get back to you within 24-48 hours."
      }
      submitButtonText={isCentralAsia ? "Отправить сообщение" : "Send Message"}
    />
  );
};

export default ContactForm;
