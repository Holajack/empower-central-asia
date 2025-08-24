
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";

const ContactForm = () => {
  return (
    <GoHighLevelForm
      formType="contact"
      title="Send Us a Message"
      description="We'd love to hear from you. Fill out the form below and we'll get back to you within 24-48 hours."
      submitButtonText="Send Message"
    />
  );
};

export default ContactForm;
