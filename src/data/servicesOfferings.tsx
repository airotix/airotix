import { Brain, Eye, Code, type LucideIcon } from "lucide-react";

export type ServiceOffering = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const SERVICES_OFFERINGS: ServiceOffering[] = [
  {
    icon: Brain,
    title: "AI / ML Automation",
    description:
      "End-to-end AI pipelines, LLM agents, predictive systems, and workflow automations that replace repetitive knowledge work and accelerate decision-making across your organization.",
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    description:
      "Real-time detection, inspection, recognition, and video analytics — deployed on edge devices or in the cloud — that turn cameras into intelligent sensors for your business.",
  },
  {
    icon: Code,
    title: "Web & App Development",
    description:
      "SaaS platforms, AI dashboards, and enterprise web applications built with modern frameworks, designed to integrate seamlessly with your AI and automation systems.",
  },
];
