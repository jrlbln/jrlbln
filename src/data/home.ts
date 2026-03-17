import { siteConfig } from "@/config/site";

export const homePanels = [
  {
    id: "home",
    label: "Home",
    eyebrow: "Joerel Santos Belen",
    title: siteConfig.role,
    description:
      "I build full-stack web and mobile products with a focus on clean architecture, reliable delivery, and thoughtful implementation across design and engineering.",
    cta: {
      kind: "panel",
      label: "View works",
      target: "work",
    },
    meta: [siteConfig.location, siteConfig.availability, siteConfig.portfolio],
    aside: "sculpture",
  },
  {
    id: "about",
    label: "About",
    eyebrow: "Lorem ipsum",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    cta: {
      kind: "panel",
      label: "See credentials",
      target: "credentials",
    },
    meta: ["Lorem ipsum", "Dolor sit amet", "Consectetur adipiscing elit"],
    aside: "statement",
  },
  {
    id: "work",
    label: "Work",
    eyebrow: "Project Highlights",
    title: "Web and mobile product work built with modern, production-ready stacks.",
    description:
      "My work spans Next.js, React Native with Expo, Flutter, Firebase, Stripe, and Node-based services. This tab can surface selected GitHub projects first, then expand into deeper project modals with context, responsibilities, and outcomes.",
    cta: {
      kind: "panel",
      label: "View credentials",
      target: "credentials",
    },
    meta: ["Next.js", "React Native (Expo)", "Flutter", "Firebase", "Stripe", "Node.js"],
    aside: "selected",
  },
  {
    id: "credentials",
    label: "Credentials",
    eyebrow: "Education and proof",
    title: "Academic distinction, technical growth, and supporting credentials.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    cta: {
      kind: "link",
      label: "Download CV",
      href: "/CV.pdf",
    },
    meta: ["Lorem ipsum", "Dolor sit amet", "Consectetur", "Adipiscing elit"],
    aside: "contact",
  },
] as const;

export type HomePanel = (typeof homePanels)[number];
