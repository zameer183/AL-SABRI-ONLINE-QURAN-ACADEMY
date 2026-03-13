"use client";

import { useEffect } from "react";

export function AdminStyleIsolation() {
  useEffect(() => {
    const exportedLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[data-exported-site-style="true"]'),
    );
    const exportedInlineStyles = Array.from(
      document.querySelectorAll<HTMLStyleElement>('style[data-exported-site-inline-style="true"]'),
    );

    const previousMedia = exportedLinks.map((link) => link.media);
    const previousDisabled = exportedInlineStyles.map((style) => style.disabled);

    for (const link of exportedLinks) {
      link.media = "not all";
    }

    for (const style of exportedInlineStyles) {
      style.disabled = true;
    }

    return () => {
      exportedLinks.forEach((link, index) => {
        link.media = previousMedia[index] || "all";
      });

      exportedInlineStyles.forEach((style, index) => {
        style.disabled = previousDisabled[index] ?? false;
      });
    };
  }, []);

  return null;
}
