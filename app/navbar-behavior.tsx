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

    syncStickyHeader();
    bindMenus();
    normalizeLinks();

    window.addEventListener("resize", syncStickyHeader);
    return () => window.removeEventListener("resize", syncStickyHeader);
  }, []);

  return null;
}
