"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";
import SectionFibers from "@/components/layout/SectionFibers";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FieldState {
  touched: boolean;
  error: string;
}

type FormErrors = Record<keyof FormData, FieldState>;

const INITIAL_ERRORS: FormErrors = {
  name: { touched: false, error: "" },
  email: { touched: false, error: "" },
  message: { touched: false, error: "" },
};

interface AnimatedInputProps {
  label: string;
  placeholder: string;
  name: keyof FormData;
  type?: "text" | "email" | "textarea";
  value: string;
  fieldState: FieldState;
  onChange: (name: keyof FormData, value: string) => void;
  onBlur: (name: keyof FormData) => void;
}

function AnimatedInput({
  label,
  placeholder,
  name,
  type = "text",
  value,
  fieldState,
  onChange,
  onBlur,
}: AnimatedInputProps) {
  const hasError = fieldState.touched && fieldState.error;
  const isValid = fieldState.touched && !fieldState.error && value.length > 0;
  const Tag = type === "textarea" ? "textarea" : "input";

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="mb-2.5 block text-base font-medium tracking-wide text-foreground/90"
      >
        {label}
      </label>
      <div className="relative">
        <Tag
          id={name}
          name={name}
          type={type === "textarea" ? undefined : type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          rows={type === "textarea" ? 6 : undefined}
          className={cn(
            "w-full rounded-xl border px-4 py-3.5 text-base leading-relaxed text-foreground",
            "bg-accent/[0.06] shadow-[inset_0_1px_0_rgba(45,216,132,0.08)]",
            "placeholder:text-muted placeholder:opacity-90",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
            hasError
              ? "border-red-400/55 focus:border-red-400/50 focus:ring-red-400/35"
              : isValid
                ? "border-accent/50 focus:border-accent/45 focus:ring-accent/40"
                : "border-accent/25 focus:border-accent-secondary/55 focus:ring-accent-secondary/35",
            type === "textarea" && "min-h-[9.5rem] resize-y"
          )}
          placeholder={placeholder}
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        <AnimatePresence mode="wait">
          {isValid && (
            <motion.div
              key="valid"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={cn(
                "absolute right-3",
                type === "textarea" ? "top-3.5" : "top-1/2 -translate-y-1/2"
              )}
            >
              <CheckCircle className="h-5 w-5 text-accent" aria-hidden="true" />
            </motion.div>
          )}
          {hasError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={cn(
                "absolute right-3",
                type === "textarea" ? "top-3.5" : "top-1/2 -translate-y-1/2"
              )}
            >
              <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm font-medium leading-snug text-red-300"
            role="alert"
          >
            {fieldState.error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = useCallback(
    (name: keyof FormData, value: string): string => {
      switch (name) {
        case "name":
          return value.trim().length < 2 ? siteCopy.contact.errName : "";
        case "email":
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : siteCopy.contact.errEmail;
        case "message":
          return value.trim().length < 10 ? siteCopy.contact.errMessage : "";
        default:
          return "";
      }
    },
    []
  );

  const handleChange = useCallback(
    (name: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          error: prev[name].touched ? validateField(name, value) : "",
        },
      }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof FormData) => {
      setErrors((prev) => ({
        ...prev,
        [name]: {
          touched: true,
          error: validateField(name, formData[name]),
        },
      }));
    },
    [formData, validateField]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors: FormErrors = {
        name: { touched: true, error: validateField("name", formData.name) },
        email: { touched: true, error: validateField("email", formData.email) },
        message: {
          touched: true,
          error: validateField("message", formData.message),
        },
      };

      setErrors(newErrors);

      const hasErr = Object.values(newErrors).some((f) => f.error);
      if (!hasErr) {
        setIsSubmitted(true);
      }
    },
    [formData, validateField]
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6 md:py-40 overflow-hidden"
      aria-labelledby="heading-contact"
    >
      <SectionFibers preset="contact" />
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          titleId="heading-contact"
          label={siteCopy.contact.label}
          title={siteCopy.contact.title}
          description={siteCopy.contact.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto max-w-xl md:max-w-2xl"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] p-10 text-center sm:p-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="mb-4 h-12 w-12 text-accent" />
                </motion.div>
                <h3 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                  {siteCopy.contact.successTitle}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-foreground/75">
                  {siteCopy.contact.successBody}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 shadow-[inset_0_1px_0_rgba(45,216,132,0.06)] sm:p-8 md:p-10"
                noValidate
              >
                <AnimatedInput
                  label={siteCopy.contact.fieldName}
                  placeholder={siteCopy.contact.phName}
                  name="name"
                  value={formData.name}
                  fieldState={errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AnimatedInput
                  label={siteCopy.contact.fieldEmail}
                  placeholder={siteCopy.contact.phEmail}
                  name="email"
                  type="email"
                  value={formData.email}
                  fieldState={errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AnimatedInput
                  label={siteCopy.contact.fieldMessage}
                  placeholder={siteCopy.contact.phMessage}
                  name="message"
                  type="textarea"
                  value={formData.message}
                  fieldState={errors.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="mt-4 flex justify-center">
                  <MagneticButton
                    type="submit"
                    variant="accent"
                    className="px-12 py-4 text-base font-semibold"
                    aria-label={siteCopy.contact.ariaSubmit}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {siteCopy.contact.submit}
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
