import { siteConfig } from "@/config/site";

export const homePanels = [
  {
    id: "home",
    label: "Home",
    eyebrow: "",
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
    title: "A mindset that never loses, I either win or learn.",
    description:
      "Working closely with my startup team has taught me how ideas evolve through discussion, feedback, and shared problem-solving, strengthening both my technical skills and programming mindset. Through these experiences, I have learned to adapt quickly, communicate clearly, and balance independent ownership with collective goals so I can contribute meaningfully while growing alongside others.",
    cta: {
      kind: "panel",
      label: "See credentials",
      target: "credentials",
    },
    meta: ["Collaborative", "Adaptable", "Clear Communicator"],
    aside: "statement",
  },
  {
    id: "work",
    label: "Work",
    eyebrow: "",
    title:
      "Web and Mobile product work built with modern, production-ready stacks.",
    description:
      "My work spans Next.js, React Native with Expo, Flutter, Firebase, Stripe, and Node-based services. This tab can surface selected GitHub projects first, then expand into deeper project modals with context, responsibilities, and outcomes.",
    cta: {
      kind: "panel",
      label: "View credentials",
      target: "credentials",
    },
    meta: [
      "Next.js",
      "React Native (Expo)",
      "Flutter",
      "Firebase",
      "Stripe",
      "Node.js",
    ],
    aside: "selected",
  },
  {
    id: "credentials",
    label: "Credentials",
    eyebrow: "Education and proof",
    title:
      "Academic distinction, technical growth, and supporting credentials.",
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
