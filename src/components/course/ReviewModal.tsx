import { useState } from "react";
import { Star, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";

interface ReviewModalProps {
  courseName: string;
  userName?: string;
  onClose: () => void;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzLJak2O8gxMycDM8v5MPDrpOLBjEXAMPLE/exec";

export default function ReviewModal({ courseName, userName, onClose }: ReviewModalProps) {
  const { isCentralAsia } = useRegion();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        formType: "course-review",
        courseName,
        userName: userName || "Anonymous",
        rating: String(rating),
        feedback,
        date: new Date().toISOString(),
      });
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body,
        mode: "no-cors",
      });
      setSubmitted(true);
    } catch {
      // Fire-and-forget -- still show success
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600 fill-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
            {isCentralAsia ? "Спасибо за отзыв!" : "Thank You!"}
          </h3>
          <p className="text-gray-600 mb-6">
            {isCentralAsia
              ? "Ваш отзыв помогает нам улучшить наши курсы."
              : "Your feedback helps us improve our courses for everyone."}
          </p>
          <Button onClick={onClose} className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
            {isCentralAsia ? "Закрыть" : "Close"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">
          {isCentralAsia ? "Оставить отзыв" : "Leave a Review"}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {isCentralAsia
            ? `Как вам курс "${courseName}"?`
            : `How was the "${courseName}" course?`}
        </p>

        {/* Star rating */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 ${
                  star <= (hoverRating || rating)
                    ? "text-[#C9922A] fill-[#C9922A]"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Feedback */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={
            isCentralAsia
              ? "Поделитесь своим опытом (необязательно)..."
              : "Share your experience (optional)..."
          }
          className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#C9922A]/50 focus:border-[#C9922A]"
        />

        {/* Submit */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300"
          >
            {isCentralAsia ? "Отмена" : "Cancel"}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || submitting}
            className="flex-1 bg-[#C9922A] hover:bg-[#C9922A]/90 text-white disabled:opacity-50"
          >
            <Send className="w-4 h-4 mr-2" />
            {submitting
              ? isCentralAsia ? "Отправка..." : "Sending..."
              : isCentralAsia ? "Отправить" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
