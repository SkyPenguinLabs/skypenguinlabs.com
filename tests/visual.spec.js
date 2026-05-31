const { expect, test } = require("@playwright/test");

const routes = ["/", "/projects/", "/tools/", "/404.html", "/privacy/"];
const footerGroups = ["R&D", "Follow the War", "About", "More", "Nav"];
const footerLinks = [
  "V.I.B.E",
  "FOSS Forest",
  "PakWolf",
  "CTFx",
  "MxOramë",
  "War Room",
  "Mission",
  "Forms Page",
  "General Product(s)",
  "Courses & eBooks",
  "Sitemap",
  "Privacy Policy",
  "Terms of Use"
];

function safeName(route) {
  return route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replaceAll("/", "-").replaceAll(".", "-");
}

test.describe("site chrome visual coverage", () => {
  for (const route of routes) {
    test(`${route} renders shared chrome`, async ({ page, isMobile }, testInfo) => {
      const consoleErrors = [];
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        if (message.text().startsWith("Failed to load resource: the server responded with a status of 404")) return;
        consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => {
        consoleErrors.push(error.message);
      });

      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page.getByRole("link", { name: "SkyPenguinLabs home" }).first()).toBeVisible();

      if (isMobile) {
        await page.getByRole("button", { name: "Open navigation" }).click();
      }

      const headerNav = page.locator(isMobile ? ".mobile-nav" : ".desktop-nav");
      await expect(headerNav.getByRole("link", { name: "Home", exact: true })).toBeVisible();
      await expect(headerNav.getByRole("button", { name: /R&D/ })).toBeVisible();
      await expect(headerNav.getByRole("button", { name: /Utilities/ })).toBeVisible();

      const footer = page.getByRole("contentinfo");
      for (const group of footerGroups) {
        await expect(footer.getByRole("heading", { name: group, exact: true })).toBeVisible();
      }

      for (const link of footerLinks) {
        await expect(footer.getByRole("link", { name: link, exact: true }).last()).toBeVisible();
      }

      if (route === "/404.html" || route === "/privacy/") {
        await expect(page.getByRole("heading", { name: "Signal Lost." })).toBeVisible();
        await expect(page.getByRole("link", { name: "Return Home" })).toBeVisible();
        await expect(page.getByRole("link", { name: "View Projects" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Open Utilities" })).toBeVisible();
      }

      if (isMobile) {
        await page.getByRole("button", { name: "Close navigation" }).click();
      }

      await page.screenshot({
        fullPage: true,
        path: `output/visual/screenshots/${testInfo.project.name}-${safeName(route)}.png`
      });

      expect(consoleErrors).toEqual([]);
    });
  }
});
