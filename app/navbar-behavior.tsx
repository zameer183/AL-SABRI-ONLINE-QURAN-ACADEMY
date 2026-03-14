"use client";

import { useEffect } from "react";

export function NavbarBehavior() {
  useEffect(() => {
    const syncStickyHeader = () => {
      document
        .querySelectorAll<HTMLElement>(".elementor-location-header .elementor-sticky")
        .forEach((header) => {
          header.style.width = "100%";
          header.style.left = "0";
          header.style.top = "0";
          header.style.marginTop = "0";
        });
    };

    const bindMenus = () => {
      document
        .querySelectorAll<HTMLElement>(".elementor-widget-nav-menu")
        .forEach((widget) => {
          const toggle = widget.querySelector<HTMLElement>(".elementor-menu-toggle");
          const dropdown = widget.querySelector<HTMLElement>(".elementor-nav-menu--dropdown");

          if (!toggle || !dropdown || toggle.dataset.bound === "true") {
            return;
          }

          toggle.dataset.bound = "true";

          const setOpen = (open: boolean) => {
            toggle.setAttribute("aria-expanded", String(open));
            dropdown.setAttribute("aria-hidden", String(!open));
            toggle.classList.toggle("elementor-active", open);
            dropdown.classList.toggle("elementor-active", open);
          };

          setOpen(false);

          toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
          });

          dropdown.querySelectorAll<HTMLElement>(".menu-item-has-children > a").forEach((link) => {
            link.addEventListener("click", (event) => {
              if (window.innerWidth > 1024) {
                return;
              }

              const item = link.closest<HTMLElement>(".menu-item-has-children");
              if (!item) {
                return;
              }

              event.preventDefault();
              item.classList.toggle("submenu-open");
            });
          });
        });
    };

    const normalizeLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/source/pages/"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) {
          return;
        }

        const fileName = href.split("/").pop()?.replace(/\.html$/, "") ?? "";
        const nextHref =
          fileName === "alsaifquranacademy.com"
            ? "/"
            : `/${fileName}`;

        link.setAttribute("href", nextHref);
      });

      document
        .querySelectorAll<HTMLAnchorElement>('a[href^="https://alsaifquranacademy.com/"]')
        .forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) {
            return;
          }

          const match = href.match(/^https:\/\/alsaifquranacademy\.com\/([a-z0-9-]+)\/$/i);
          if (!match) {
            if (href === "https://alsaifquranacademy.com/") {
              link.setAttribute("href", "/");
            }
            return;
          }

          link.setAttribute("href", `/${match[1]}`);
        });
    };

    const bindTrialClassForm = () => {
      document
        .querySelectorAll<HTMLFormElement>(".elementor-element-98f3e87 form.elementor-form")
        .forEach((form) => {
          if (form.dataset.boundWhatsapp === "true") {
            return;
          }

          form.dataset.boundWhatsapp = "true";

          const emailInput = form.querySelector<HTMLInputElement>("#form-field-email");
          if (emailInput) {
            emailInput.required = false;
            emailInput.removeAttribute("required");
            emailInput.removeAttribute("aria-required");
          }

          form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const name = String(formData.get("form_fields[name]") ?? "").trim();
            const phone = String(formData.get("form_fields[field_7b4f72c]") ?? "").trim();
            const email = String(formData.get("form_fields[email]") ?? "").trim();
            const course = String(formData.get("form_fields[field_5a0cd19]") ?? "").trim();
            const message = String(formData.get("form_fields[message]") ?? "").trim();

            const lines = [
              "Assalam o Alaikum, I want to schedule a free trial class.",
              name ? `Name: ${name}` : "",
              phone ? `Phone: ${phone}` : "",
              email ? `Email: ${email}` : "",
              course ? `Course: ${course}` : "",
              message ? `Message: ${message}` : "",
            ].filter(Boolean);

            const whatsappUrl = `https://wa.me/923413839634?text=${encodeURIComponent(lines.join("\n"))}`;
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
          });
        });
    };

    syncStickyHeader();
    bindMenus();
    normalizeLinks();
    bindTrialClassForm();

    window.addEventListener("resize", syncStickyHeader);
    return () => window.removeEventListener("resize", syncStickyHeader);
  }, []);

  return null;
}
