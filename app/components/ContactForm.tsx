"use client";

import { FormEvent } from "react";

type ContactFormProps = {
  courses: readonly string[];
};

export function ContactForm({ courses }: ContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const whatsapp = String(formData.get("whatsapp") ?? "").trim();
    const course = String(formData.get("course") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const lines = [
      "Assalam o Alaikum, I want to enroll.",
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      whatsapp ? `WhatsApp: ${whatsapp}` : "",
      course ? `Course: ${course}` : "",
      message ? `Message: ${message}` : "",
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/923413839634?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="contact-form-panel">
      <div className="contact-form-panel__header">
        <p className="contact-form-panel__eyebrow">Send Us a Message</p>
        <h3>Talk to Our Enrollment Team</h3>
        <p>
          Fill out the form and we will guide you with course selection, timing, and enrollment
          details.
        </p>
      </div>

      <form className="contact-form-panel__form" onSubmit={handleSubmit}>
        <label className="contact-form-panel__field contact-form-panel__field--half">
          <span>Full Name</span>
          <input type="text" name="name" placeholder="Enter your name" required />
        </label>
        <label className="contact-form-panel__field contact-form-panel__field--half">
          <span>Email Address</span>
          <input type="email" name="email" placeholder="Enter your email" required />
        </label>
        <label className="contact-form-panel__field contact-form-panel__field--half">
          <span>WhatsApp Number</span>
          <input type="tel" name="whatsapp" placeholder="Enter WhatsApp number" required />
        </label>
        <label className="contact-form-panel__field contact-form-panel__field--half">
          <span>Select Course</span>
          <select name="course" defaultValue="" required>
            <option value="" disabled>
              Choose a course
            </option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </label>
        <label className="contact-form-panel__field contact-form-panel__field--full">
          <span>Message</span>
          <textarea
            name="message"
            rows={6}
            placeholder="Tell us your course requirement"
            required
          />
        </label>
        <button type="submit">Enroll Now</button>
      </form>
    </section>
  );
}
