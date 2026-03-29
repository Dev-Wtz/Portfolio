"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type FormEvent,
  type HTMLAttributes,
} from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";
import SectionFibers from "@/components/layout/SectionFibers";
import {
  CONTACT_MESSAGE_MAX,
  CONTACT_MESSAGE_MIN,
  composeInternationalPhone,
  isValidComposedContactPhone,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
} from "@/lib/contact-validation";
import {
  DEFAULT_PHONE_DIAL_CODE,
  PHONE_DIAL_OPTIONS,
} from "@/lib/phone-prefixes";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FieldState {
  touched: boolean;
  error: string;
}

type FormErrors = Record<keyof FormData, FieldState>;

function focusFirstInvalidField(newErrors: FormErrors): void {
  const order: (keyof FormData)[] = ["name", "email", "phone", "message"];
  queueMicrotask(() => {
    for (const key of order) {
      if (!newErrors[key].error) continue;
      const inputId = key === "phone" ? "phone" : key;
      document.getElementById(inputId)?.focus({ preventScroll: true });
      const errId = key === "phone" ? "phone-error" : `${key}-error`;
      document.getElementById(errId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      break;
    }
  });
}

const INITIAL_ERRORS: FormErrors = {
  name: { touched: false, error: "" },
  email: { touched: false, error: "" },
  phone: { touched: false, error: "" },
  message: { touched: false, error: "" },
};

interface AnimatedInputProps {
  label: string;
  placeholder: string;
  name: keyof FormData;
  type?: "text" | "email" | "tel" | "textarea";
  value: string;
  fieldState: FieldState;
  onChange: (name: keyof FormData, value: string) => void;
  onBlur: (name: keyof FormData, value: string) => void;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  isValidValue?: (value: string) => boolean;
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
  maxLength,
  autoComplete,
  inputMode,
  isValidValue,
}: AnimatedInputProps) {
  const hasError = fieldState.touched && fieldState.error;
  const meetsRules = isValidValue
    ? isValidValue(value)
    : value.trim().length > 0;
  const isValid = fieldState.touched && !fieldState.error && meetsRules;
  const Tag = type === "textarea" ? "textarea" : "input";

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium tracking-wide text-foreground/90 sm:mb-2.5 sm:text-base"
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
          onBlur={(e) => onBlur(name, e.currentTarget.value)}
          rows={type === "textarea" ? 4 : undefined}
          maxLength={maxLength}
          autoComplete={autoComplete}
          {...(type !== "textarea" && inputMode ? { inputMode } : {})}
          required
          aria-required="true"
          className={cn(
            "w-full rounded-xl border px-3.5 py-2.5 text-sm leading-relaxed text-foreground sm:px-4 sm:py-3.5 sm:text-base",
            "bg-accent/[0.048] shadow-[inset_0_1px_0_rgba(45,216,132,0.064)] md:bg-accent/[0.054] md:shadow-[inset_0_1px_0_rgba(45,216,132,0.072)]",
            "placeholder:text-muted placeholder:opacity-90",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
            hasError
              ? "border-red-400/55 focus:border-red-400/50 focus:ring-red-400/35"
              : isValid
                ? "border-accent/50 focus:border-accent/45 focus:ring-accent/40"
                : "border-accent/25 focus:border-accent-secondary/55 focus:ring-accent-secondary/35",
            type === "textarea" && "min-h-[7rem] resize-y sm:min-h-[9.5rem]"
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

interface ContactPhoneFieldProps {
  phoneDialCode: string;
  onDialChange: (code: string) => void;
  nationalValue: string;
  fieldState: FieldState;
  onNationalChange: (value: string) => void;
  onNationalBlur: (value: string) => void;
}

function ContactPhoneField({
  phoneDialCode,
  onDialChange,
  nationalValue,
  fieldState,
  onNationalChange,
  onNationalBlur,
}: ContactPhoneFieldProps) {
  const hasError = fieldState.touched && fieldState.error;
  const meetsRules = isValidComposedContactPhone(
    phoneDialCode,
    nationalValue
  );
  const isValid = fieldState.touched && !fieldState.error && meetsRules;

  const borderRing = hasError
    ? "border-red-400/55 focus:border-red-400/50 focus:ring-red-400/35"
    : isValid
      ? "border-accent/50 focus:border-accent/45 focus:ring-accent/40"
      : "border-accent/25 focus:border-accent-secondary/55 focus:ring-accent-secondary/35";

  const fieldBase = cn(
    "rounded-xl border text-foreground",
    "bg-accent/[0.048] shadow-[inset_0_1px_0_rgba(45,216,132,0.064)] md:bg-accent/[0.054] md:shadow-[inset_0_1px_0_rgba(45,216,132,0.072)]",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
    borderRing
  );

  const inputShell = cn(
    fieldBase,
    "w-full px-3.5 py-2.5 text-sm leading-relaxed sm:px-4 sm:py-3.5 sm:text-base"
  );

  /* Matches phone input sizing; never use w-full here (native select would span the row on mobile). */
  const dialSelectShell = cn(
    fieldBase,
    "box-border w-24 shrink-0 cursor-pointer self-stretch tabular-nums text-center",
    "py-2.5 pl-2.5 pr-8 text-sm leading-relaxed sm:py-3.5 sm:pl-3 sm:pr-8 sm:text-base",
    "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236e8a7c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
    "[background-position:right_0.65rem_center] [background-repeat:no-repeat] appearance-none"
  );

  return (
    <div className="relative">
      <label
        htmlFor="phone"
        className="mb-1.5 block text-sm font-medium tracking-wide text-foreground/90 sm:mb-2.5 sm:text-base"
      >
        {siteCopy.contact.fieldPhone}
      </label>
      <div className="flex flex-row items-stretch gap-2 sm:gap-3">
        <select
          id="phone-dial"
          className={dialSelectShell}
          value={phoneDialCode}
          onChange={(e) => onDialChange(e.target.value)}
          aria-label={siteCopy.contact.ariaPhonePrefix}
        >
          {PHONE_DIAL_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.code}
            </option>
          ))}
        </select>
        <div className="relative min-w-0 flex-1">
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={nationalValue}
            onChange={(e) => onNationalChange(e.target.value)}
            onBlur={(e) => onNationalBlur(e.currentTarget.value)}
            required
            aria-required="true"
            className={cn(inputShell, "pr-10")}
            placeholder={siteCopy.contact.phPhone}
            aria-invalid={!!hasError}
            aria-describedby={hasError ? "phone-error" : undefined}
          />
          <AnimatePresence mode="wait">
            {isValid && (
              <motion.div
                key="valid"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
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
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              >
                <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            id="phone-error"
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
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const submitErrorRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [phoneDialCode, setPhoneDialCode] = useState<string>(
    DEFAULT_PHONE_DIAL_CODE
  );

  useEffect(() => {
    if (isSubmitted) {
      successHeadingRef.current?.focus({ preventScroll: true });
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (submitError) {
      queueMicrotask(() => {
        submitErrorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        submitErrorRef.current?.focus({ preventScroll: true });
      });
    }
  }, [submitError]);

  const validateField = useCallback(
    (name: keyof FormData, value: string): string => {
      switch (name) {
        case "name":
          return isValidContactName(value) ? "" : siteCopy.contact.errName;
        case "email":
          return isValidContactEmail(value) ? "" : siteCopy.contact.errEmail;
        case "phone":
          return isValidComposedContactPhone(phoneDialCode, value)
            ? ""
            : siteCopy.contact.errPhone;
        case "message":
          return isValidContactMessage(value) ? "" : siteCopy.contact.errMessage;
        default:
          return "";
      }
    },
    [phoneDialCode]
  );

  const handleDialChange = useCallback(
    (code: string) => {
      setPhoneDialCode(code);
      setErrors((prev) => ({
        ...prev,
        phone: {
          touched: prev.phone.touched,
          error: prev.phone.touched
            ? isValidComposedContactPhone(code, formData.phone)
              ? ""
              : siteCopy.contact.errPhone
            : "",
        },
      }));
    },
    [formData.phone]
  );

  const handleChange = useCallback(
    (name: keyof FormData, value: string) => {
      const next = name === "name" ? value.replace(/\d/g, "") : value;
      setFormData((prev) => ({ ...prev, [name]: next }));
      setErrors((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          error: prev[name].touched ? validateField(name, next) : "",
        },
      }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof FormData, value: string) => {
      setErrors((prev) => ({
        ...prev,
        [name]: {
          touched: true,
          error: validateField(name, value),
        },
      }));
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setSubmitError(null);

      const newErrors: FormErrors = {
        name: { touched: true, error: validateField("name", formData.name) },
        email: { touched: true, error: validateField("email", formData.email) },
        phone: { touched: true, error: validateField("phone", formData.phone) },
        message: {
          touched: true,
          error: validateField("message", formData.message),
        },
      };

      setErrors(newErrors);

      const hasErr = Object.values(newErrors).some((f) => f.error);
      if (hasErr) {
        focusFirstInvalidField(newErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: composeInternationalPhone(
              phoneDialCode,
              formData.phone
            ).trim(),
            message: formData.message.trim(),
            website: honeypot,
          }),
        });

        interface ContactApiJson {
          ok?: boolean;
          error?: string;
        }
        let data: ContactApiJson = {};
        try {
          data = (await res.json()) as ContactApiJson;
        } catch {
          data = {};
        }

        if (!res.ok) {
          const fallback =
            res.status === 429
              ? siteCopy.contact.errRateLimit
              : siteCopy.contact.errSend;
          setSubmitError(
            typeof data.error === "string" && data.error.length > 0
              ? data.error
              : fallback
          );
          return;
        }

        setIsSubmitted(true);
      } catch {
        setSubmitError(siteCopy.contact.errSend);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, honeypot, phoneDialCode, validateField]
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-12 px-4 sm:py-20 sm:px-6 md:py-28"
      aria-labelledby="heading-contact"
    >
      <SectionFibers preset="contact" />
      <div className="relative z-[3] mx-auto max-w-4xl">
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
                className="flex flex-col items-center rounded-2xl border border-emerald-500/30 bg-surface-over-fibers p-6 text-center sm:p-10 md:p-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="mb-4 h-12 w-12 text-accent" />
                </motion.div>
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mb-3 font-serif text-2xl font-semibold text-foreground outline-none sm:text-3xl"
                >
                  {siteCopy.contact.successTitle}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-foreground/75">
                  {siteCopy.contact.successBody}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={(e) => {
                  void handleSubmit(e);
                }}
                className="relative flex flex-col gap-5 rounded-2xl border border-accent/20 bg-surface-over-fibers p-4 shadow-[inset_0_1px_0_rgba(45,216,132,0.06)] sm:gap-8 sm:p-6 md:p-10"
                noValidate
                aria-label={siteCopy.contact.formAriaLabel}
              >
                <div
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                  aria-hidden="true"
                >
                  <label htmlFor="contact-website">Ne pas remplir ce champ</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                <AnimatedInput
                  label={siteCopy.contact.fieldName}
                  placeholder={siteCopy.contact.phName}
                  name="name"
                  value={formData.name}
                  fieldState={errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  isValidValue={(v) => isValidContactName(v)}
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
                  autoComplete="email"
                  isValidValue={(v) => isValidContactEmail(v)}
                />
                <ContactPhoneField
                  phoneDialCode={phoneDialCode}
                  onDialChange={handleDialChange}
                  nationalValue={formData.phone}
                  fieldState={errors.phone}
                  onNationalChange={(v) => handleChange("phone", v)}
                  onNationalBlur={(v) => handleBlur("phone", v)}
                />
                <div>
                  <AnimatedInput
                    label={siteCopy.contact.fieldMessage}
                    placeholder={siteCopy.contact.phMessage}
                    name="message"
                    type="textarea"
                    value={formData.message}
                    fieldState={errors.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={CONTACT_MESSAGE_MAX}
                    isValidValue={(v) => isValidContactMessage(v)}
                  />
                  <p
                    className="mt-1.5 text-xs leading-snug text-muted sm:text-sm"
                    aria-live="polite"
                  >
                    {formData.message.trim().length}/{CONTACT_MESSAGE_MAX}{" "}
                    caractères — minimum {CONTACT_MESSAGE_MIN} requis
                  </p>
                </div>

                {submitError ? (
                  <p
                    ref={submitErrorRef}
                    id="contact-submit-alert"
                    tabIndex={-1}
                    className="text-center text-sm font-medium text-red-300 outline-none"
                    role="alert"
                    aria-live="assertive"
                  >
                    {submitError}
                  </p>
                ) : null}

                <div className="mt-2 flex justify-center sm:mt-4">
                  <MagneticButton
                    type="submit"
                    variant="accent"
                    className="px-8 py-3 text-sm font-semibold sm:px-12 sm:py-4 sm:text-base"
                    aria-label={siteCopy.contact.ariaSubmit}
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                    {isSubmitting ? siteCopy.contact.sending : siteCopy.contact.submit}
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
