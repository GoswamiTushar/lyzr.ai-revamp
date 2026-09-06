export const SITE_DATA = {
  site: {
    url: "https://www.lyzr.ai/",
    title: "Lyzr | Take your AI agents to production, faster.",
    description:
      "Enterprise AI Agent Platform. Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else – all governed, observed, and controlled from a single control plane.",
    cookie_banner: {
      text: "We use cookies. This website uses cookies to ensure you get the best experience on our website. For more details, read our Cookie Policy.",
      buttons: ["CUSTOMISE", "REJECT ALL", "ACCEPT ALL"]
    }
  },

  announcement_bar: {
    badge: "NEW",
    text: "Lyzr launches Control Plane for AI Agents",
    cta: {
      label: "Access now →",
      url: "https://www.lyzr.ai/control-plane/"
    }
  },

  header: {
    logo: "lyzr",
    navigation: {
      Solutions: {
        "By Industry": ["Banking", "Insurance", "Government", "Healthcare", "Fintech", "E-commerce"],
        "By Function": ["Revenue", "Marketing", "Customer Service", "Human Resources", "Procurement", "Legal"],
        "By Team": ["Compliance & Governance", "AI & Automation", "Revenue & Sales", "IT & Platform", "Digital Transformation"],
        "By Role": ["CIO", "CTO", "CEO", "Managing Director", "Head of AI"]
      },
      Platform: {
        Products: ["Agent Studio", "Architect", "Control Plane (New)", "Agentic OS (New)", "Sovereign AI (New)", "Lyzr Nitro", "Lyzr Optimus"],
        Modules: ["Responsible AI", "Orchestration as a Service", "Agents as a Service", "Types of Agents", "Hallucination Manager", "Knowledge Base", "Knowledge Graph"],
        "Open Source & Dev": ["Cognis Memory", "AI agent memory", "OpenGAP OSS", "GitAgent OSS", "Docs & API"]
      },
      Customers: "/customers/",
      Pricing: "/pricing/",
      Partners: {
        "Technology Partners": ["Amazon Web Services", "Google Cloud", "Microsoft Azure", "NVIDIA"],
        "Ecosystem Partners": ["Global System Integrators", "Reseller Partners"]
      },
      Resources: {
        Learn: ["Blogs", "Playbook", "Templates", "Courses", "Research", "Types of Agents"],
        "Playbooks & Templates": ["Agents to Production", "Banking Dispute Management", "The Field Guide for Analysts", "AI Sales Agents Use Cases", "Insurance AI Agents Use Cases", "Architect Agent Use cases"],
        Analyze: ["Case Studies", "Comparison", "Assessments", "Glossary", "State of AI Agents", "Wall of Love", "Enterprise Assessment", "Analyst Recognition"],
        Connect: ["Partner Program", "AWS", "Community Forum", "Book a Demo"],
        Featured: ["Template — 100+ AI Usecases", "Playbook — Agents to production"]
      }
    },
    right_ctas: [
      { label: "Agent Usecases", icon: "star" },
      { label: "Agent Studio", url: "https://studio.lyzr.ai/" },
      { label: "Talk to Us", style: "primary" }
    ]
  },

  hero_section: {
    toggle: {
      label: "I'm a Developer",
      type: "switch",
      default: false
    },
    // Developer toggle = true content
    developer: {
      eyebrow: "Agent Infrastructure",
      headline: "The full stack for agent productionization.",
      subheadline:
        "The control plane your enterprise AI operation has been missing. Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else, all governed, observed, and controlled from a single control plane. Your data stays in your environment. Your IP stays yours. You keep full control.",
      stats: [
        { value: "85%", label: "Agent projects reach production" },
        { value: "6", label: "ADLC stages covered end-to-end" },
        { value: "Any", label: "LLM, cloud, or framework" },
        { value: "Git-native", label: "Agents as code. PRs, CI/CD, versioning" },
        { value: "Day 1", label: "SOC 2, GDPR, HIPAA compliant" }
      ]
    },
    // Developer toggle = false content
    enterprise: {
      eyebrow: "Enterprise AI Agent Platform",
      headline: "Take your AI agents to production, faster.",
      subheadline:
        "Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else – all governed, observed, and controlled from a single control plane. Your data stays in your environment. Your IP stays yours. You keep full control.",
      stats: [
        { value: "8 Weeks", label: "Avg time from build to production" },
        { value: "1,000+", label: "Agents live in production" },
        { value: "85%", label: "Agent projects reach production" },
        { value: "500+", label: "Enterprises building on Lyzr" },
        { value: "99.9%", label: "Uptime across deployments" }
      ]
    },
    eyebrow: "ENTERPRISE AI AGENT PLATFORM",
    headline: "Take your AI agents to production, faster.",
    subheadline:
      "Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else – all governed, observed, and controlled from a single control plane. Your data stays in your environment. Your IP stays yours. You keep full control.",
    primary_cta: {
      label: "Talk to Us",
      url: "https://www.lyzr.ai/book-demo"
    },
    visual: {
      type: "Interactive layered diamond stack",
      badge: "8 Weeks to Production",
      layers_preview: [
        "Connect agents from anywhere",
        "Run on any LLM",
        "Simulation Engine",
        "Observability",
        "Hallucination & PII Guard",
        "Access & Governance",
        "Audit & Compliance"
      ],
      active_layer_example: {
        layer: "LAYER 04",
        title: "Observability",
        description: "Full trace on every agent run, in real time.",
        tags: ["End-to-end traces", "Latency monitoring", "Cost per run"]
      },
      view_full_layers_link: "View full layers"
    }
  },

  stats_bar: {
    items: [
      { value: "8 Weeks", label: "Avg time from build to production" },
      { value: "1,000+", label: "Agents live in production" },
      { value: "85%", label: "Agent projects reach production" },
      { value: "500+", label: "Enterprises building on Lyzr" },
      { value: "99.9%", label: "Uptime across deployments" }
    ],
    note: "Stats are animated / dynamically updating on page load (observed values fluctuate slightly across loads)."
  },

  control_plane_layers: {
    title: "Agent Infrastructure",
    subtitle: "The full stack for agent productionization.",
    description:
      "The control plane your enterprise AI operation has been missing. Agents built on AWS, Azure, LangChain, Agentforce, or anywhere else, all governed, observed, and controlled from a single control plane. Your data stays in your environment. Your IP stays yours. You keep full control.",
    layers: [
      {
        id: "01",
        title: "Connect agents from anywhere",
        description: "Every platform. Every cloud. No migration.",
        tags: ["AWS Bedrock", "Azure AI", "GCP Vertex", "LangChain", "On-prem"]
      },
      {
        id: "02",
        title: "Run on any LLM",
        description: "Swap models without rewriting agents.",
        tags: ["GPT-4o", "Claude", "Gemini", "Llama", "Mistral"]
      },
      {
        id: "03",
        title: "Simulation Engine",
        description: "Test every agent before it reaches production.",
        tags: ["1,000s of scenarios", "Adversarial testing", "Six Sigma scoring"]
      },
      {
        id: "04",
        title: "Observability",
        description: "Full trace on every agent run, in real time.",
        tags: ["End-to-end traces", "Latency monitoring", "Cost per run"]
      },
      {
        id: "05",
        title: "Hallucination & PII Guard",
        description: "Every output checked before it reaches a user.",
        tags: ["Live detection", "PII masking", "Block / flag / reroute"]
      },
      {
        id: "06",
        title: "Access & Governance",
        description: "Who can see, use, and modify every agent.",
        tags: ["SSO", "RBAC", "Policy enforcement"]
      },
      {
        id: "07",
        title: "Audit & Compliance",
        description: "Every action logged. Every decision traceable.",
        tags: ["SOC 2", "HIPAA", "GDPR", "Immutable logs"]
      }
    ]
  },

  key_metrics_secondary: [
    { value: "85%", label: "Agent projects reach production" },
    { value: "6", label: "ADLC stages covered end-to-end" },
    { value: "Any", label: "LLM, cloud, or framework" },
    { value: "Git-native", label: "Agents as code. PRs, CI/CD, versioning" },
    { value: "Day 1", label: "SOC 2, GDPR, HIPAA compliant" }
  ],

  trusted_by: {
    title: "Trusted by enterprises across industries"
  },

  three_ways_section: {
    eyebrow: "What enterprises build on Lyzr",
    headline: "Three ways enterprises use the platform.",
    description:
      "The control plane is the foundation. From there, teams pick the depth that fits how they operate. Govern what already exists, build the operating system for a whole function, or run the full stack sovereign inside their own environment.",
    ways: [
      {
        label: "Foundation",
        title: "Govern every agent with a neutral control plane",
        description:
          "Register agents built on any framework, add policy, observability, and cost controls in a week. Your existing stack keeps running. Lyzr adds the layer that makes it enterprise-safe.",
        features: ["Agent Registry", "Policy Engine", "Observability", "Cost Controls"],
        cta: { label: "Explore Control Plane", url: "https://www.lyzr.ai/control-plane/" }
      },
      {
        label: "Featured",
        title: "Build the agentic operating system for your entire function",
        description:
          "A dedicated agent stack for HR, Marketing, Finance, or Customer Service. One workspace where every agent, workflow, and integration lives together and compounds with use.",
        features: ["Agent Studio", "Workflows", "Shared Memory"],
        cta: { label: "Explore Agentic OS", url: "https://www.lyzr.ai/agentic-os/" }
      },
      {
        label: "Regulated",
        title: "Sovereign AI for regulated industries",
        description:
          "Full-stack, air-gapped, and audit-ready. For governments, banks, and healthcare. Models, agents, and data all inside your VPC, your region, your keys, your control.",
        features: ["Air-Gapped", "Data Residency", "Audit Trail", "Your Keys"],
        cta: { label: "Explore Sovereign AI", url: "https://www.lyzr.ai/sovereign-ai/" }
      }
    ]
  },

  agent_studio_section: {
    eyebrow: "Lyzr Agent Studio",
    headline: "One Studio. Infinite Possibilities.",
    description:
      "Design, build, test, and deploy enterprise agents all from a single visual workspace. No infrastructure stitching. No framework wrangling. Just agents in production."
  },

  why_enterprises_choose: {
    eyebrow: "Why Enterprises Choose Lyzr",
    headline: "Five reasons enterprises pick Lyzr.",
    reasons: [
      {
        id: "01",
        category: "Deploy",
        title: "Platform + People + FDEs = 8-Week Delivery.",
        description:
          "Lyzr’s engineers embed with your team. They handle governance, integrations, and compliance sign-off, and stay until your agents are running in production.",
        points: [
          {
            title: "8-week average to production",
            text: "From agent brief to live deployment. Most enterprise AI projects take quarters. Lyzr takes weeks."
          },
          {
            title: "Engineers embedded with your team",
            text: "Forward Deployed Engineers work alongside you end to end, not from a support queue."
          },
          {
            title: "Compliance handled alongside you",
            text: "Governance rules and regulatory sign-off managed with your team, not handed back as homework."
          }
        ],
        highlight: "85% of Lyzr projects reach production. Industry average is under 30%."
      },
      {
        id: "02",
        category: "Build",
        title: "Architect: build any agent, no code needed.",
        description:
          "Describe what you need in plain language. Architect builds the full agent, logic, integrations, access controls, UI, and delivers something your team can use from day one.",
        points: [
          {
            title: "Conversation to application",
            text: "Describe your workflow in plain English. Architect converts it into a working agent stack."
          },
          {
            title: "Connects to your existing systems",
            text: "ERP, CRM, HRIS, documents. Architect wires them in without custom development."
          },
          {
            title: "Governed from the start",
            text: "Role-based access, audit logging, and compliance controls built in, not bolted on."
          }
        ],
        highlight: "No code needed. From idea to working agent, without a developer in the room."
      },
      {
        id: "03",
        category: "Start faster",
        title: "Pre-built Agents: start from what already works.",
        description:
          "200+ agents already proven in environments like yours, across BFSI, healthcare, HR, and operations. Customize for your context. Deploy in days, not months.",
        points: [
          {
            title: "Production-tested across industries",
            text: "BFSI, healthcare, HR, sales, ops. Agents that have shipped in real enterprise environments."
          },
          {
            title: "Customizable to your environment",
            text: "Your data, your tools, your compliance policies. Each agent adapts without starting from scratch."
          },
          {
            title: "Validated before it reaches you",
            text: "Every pre-built agent has been through simulation and compliance testing, not just drafted."
          }
        ],
        highlight: "1,000+ agents live in production across 500+ enterprise customers."
      },
      {
        id: "04",
        category: "Evaluate",
        title: "Simulation + Improvement: catch failures before your customers do.",
        description:
          "Every agent runs through thousands of real-world scenarios before going live. Once live, it monitors itself and improves automatically, no manual intervention.",
        points: [
          {
            title: "1,000s of scenarios before deployment",
            text: "Edge cases, adversarial inputs, domain-specific stress tests, all run before your agent touches production."
          },
          {
            title: "Domain-specific test suites",
            text: "Pre-built scenarios for BFSI, healthcare, HR, not generic benchmarks from a public eval set."
          },
          {
            title: "Self-improving after launch",
            text: "Production logs feed back automatically. Agents get sharper with every run, without you managing it."
          }
        ],
        highlight: "85% of Lyzr agent projects reach production. Simulation is a core reason why."
      },
      {
        id: "05",
        category: "Own",
        title: "No Lock-in: your agents, your IP, always.",
        description:
          "Everything you build lives in your environment, on open protocols, under your control. If you ever move, it all moves with you. No exit penalty.",
        points: [
          {
            title: "Open-source orchestration",
            text: "No proprietary format. No migration tax. The runtime keeps running wherever you take it."
          },
          {
            title: "Deployed in your own VPC",
            text: "Your data never leaves your boundary. Lyzr runs inside your private cloud from day one."
          },
          {
            title: "You own every agent you build",
            text: "The logic, the workflows, the integrations, yours to keep, modify, or move at any time."
          }
        ],
        highlight: "Open Your environment. Your control. Your IP. From day one."
      }
    ]
  },

  productionization_gap: {
    eyebrow: "The Productionization Gap",
    headline: "Your agent is built. Now comes the hard part.",
    description:
      "Between a working prototype and a production agent lies a valley of death. Most projects never cross it. Lyzr builds the bridge.",
    bridge_points: [
      "Full-stack agent infrastructure",
      "Expert engineers embedded with your team",
      "85% ship rate"
    ],
    paths: [
      {
        id: "01",
        title: "Platform + Your Team",
        description:
          "Build custom agents with Agent Studio, Lyzr GPT, and Architect. Full control, any LLM, modular Lyzr Blocks. Your engineers own the IP and the roadmap.",
        tags: ["Agent Studio", "Lyzr Blocks", "Architect"],
        cta: { label: "Start Building →", url: "https://studio.lyzr.ai/" }
      },
      {
        id: "02",
        title: "Platform + Lyzr Engineers",
        description:
          "Our Applied AI architects co-build your first 3 agents, productionize the complex ones, and transfer full ownership to you.",
        tags: ["Co-build", "No Lock-in"],
        cta: { label: "Talk to Us →", url: "https://www.lyzr.ai/book-demo/" }
      },
      {
        id: "03",
        title: "Go Through Expert Partners",
        description:
          "100+ production-ready agents across BFSI, healthcare, telco, HR, sales, and support. Pick, configure, deploy from week one.",
        tags: ["Ready Day 1", "100+ Agents", "All Industries"],
        cta: { label: "Find a Partner →", url: "https://www.lyzr.ai/partners/" }
      }
    ]
  },

  featured_on_stage: {
    items: [
      { event: "Google I/O 2025", note: "Named an Agent2Agent Launch Partner" },
      { event: "AWS Summit NYC", note: "Building Live at AWS Summit" },
      { event: "IBM Think 2025", note: "Added to watsonx Orchestrate Catalog" }
    ]
  },

  recognized_by: {
    items: [
      "Top 100 AI Startup",
      "$100M Fundraise",
      "$500M Valuation",
      "Investor Market Coverage",
      "Tech Innovator in Agentic AI",
      "AI Agent Platform for HR & BFSI",
      "Top AI Agent Orchestration Platform",
      "Top AI Agent Builder Software",
      "Gen AI Innovator 2025",
      "Raised With No Roadshow"
    ]
  },

  security_compliance: {
    items: ["GDPR Compliant", "SOC 2 Type II", "ISO 27001 Certified", "HIPAA Compliant", "CCPA"]
  },

  case_studies_carousel: {
    title: "Powering enterprises of all sizes",
    subtitle: "Agents in production not just demos.",
    description:
      "Real deployments. Measurable outcomes. Enterprises across BFSI, telco, BPO, and content run agents at scale with Lyzr.",
    cases: [
      {
        company: "Accenture",
        title: "Reimagining corporate venture capital",
        quote:
          "AgenticOS running 200+ agents, automating 15+ VC functions including deal sourcing, startup evaluation, due diligence, and investment memo generation all in production, all day, every day.",
        metrics: [
          { value: "200+", label: "Agents in Production" },
          { value: "15+", label: "VC Functions Automated" }
        ],
        tags: ["Multi-agent orchestration", "Agent Studio", "Control Plane"]
      },
      {
        company: "WTW",
        title: "Reimagining retirement advisory",
        quote:
          "Brought customers back from ChatGPT to WTW's intelligent retirement advisor fully governed, compliant, and running in production for over a year.",
        metrics: [
          { value: "1 Yr+", label: "In Production" },
          { value: "100%", label: "Compliant" }
        ],
        tags: ["BFSI compliance", "Hallucination Mgr", "Audit Trail"]
      },
      {
        company: "Hitachi",
        title: "Marketing content at enterprise scale",
        quote:
          "A Marketing AgentHub converting knowledge-base uploads into multi-format content blogs, eBooks, social posts automatically. What used to take weeks now happens in hours.",
        metrics: [
          { value: "4×", label: "Content Output" },
          { value: "Live", label: "In Production" }
        ],
        tags: ["Content automation", "Lyzr GPT", "Multi-format"]
      },
      {
        company: "First Source",
        title: "BPO operations at agent scale",
        quote:
          "A multi-agent BPO orchestration system handling customer support, compliance monitoring, and back-office processing in a highly regulated environment full traceability at every step.",
        metrics: [
          { value: "Multi", label: "Agent System" },
          { value: "Live", label: "Regulated Industry" }
        ],
        tags: ["BPO automation", "Compliance", "Control Plane"]
      },
      {
        company: "Verifone",
        title: "Payments intelligence, agent-driven",
        quote:
          "Agents automating payments operations, compliance checks, and merchant support workflows with full traceability, governance, and hallucination management at every step.",
        metrics: [
          { value: "Full", label: "Audit Trail" },
          { value: "Live", label: "In Production" }
        ],
        tags: ["Payments fintech", "Governance", "PII Detection"]
      }
    ]
  },

  founder_vision: {
    quote:
      "Most agent platforms sell tools and leave teams to figure out the rest. At Lyzr, we believe building agents is now easy and that productionization is where the real work begins. We operate like Palantir for the agent era: platform + people, deep in your data, obsessed with getting agents into production.",
    author: "Siva Surendira",
    title: "Founder & CEO, Lyzr AI"
  },

  testimonials: {
    title: "Why they chose Lyzr",
    items: [
      {
        quote:
          "Lyzr was the only vendor that could articulate and then deliver what happens after the demo. Most platforms stop at the POC. Lyzr stayed through production.",
        company: "Accenture Ventures",
        role: "VP of Technology"
      },
      {
        quote:
          "We achieved a 95% reduction in agent response time across markets. No other platform gave us the observability and control we needed to actually trust our agents in production.",
        company: "Air Asia Move",
        role: "Chief Technology Officer"
      },
      {
        quote:
          "Lyzr gave us a team that understood what production-grade AI means in a regulated environment. They didn't just ship they helped us think through compliance, auditability, and scale.",
        company: "Willis Towers Watson",
        role: "Head of Digital"
      }
    ]
  },

  resources_section: {
    eyebrow: "Resources",
    headline: "Take something with you.",
    description:
      "Playbooks, deep research, and real-world stories from the front lines of enterprise AI deployment.",
    featured: [
      {
        type: "Playbook",
        title: "How to Build Your Agentic AI Roadmap in 2026",
        cta: "Explore Playbook"
      },
      {
        type: "Template",
        title: "101 Enterprise AI Use Cases You Can Deploy Today",
        description:
          "Inside: 100+ production-ready AI agent use cases across Marketing, Sales, HR, Banking, Insurance.",
        cta: "Explore Template"
      },
      {
        type: "Playbook",
        title: "How to take agents to production",
        description: "A practical guide to turn AI prototypes into reliable, production-ready agents",
        cta: "Explore Playbook"
      }
    ]
  },

  final_cta: {
    eyebrow: "Got a use case in mind?",
    headline: "8 weeks from idea to agents in production.",
    description:
      "Platform, engineers, governance all in. Bring your use case and your environment. We'll show you the path from here."
  },

  footer: {
    address: "525 Washington Blvd, 2410, jersey city, NJ 07310, USA",
    newsletter: {
      title: "Join 24,647+ subscribers",
      description: "We share stories around AI agents every 2 weeks. No spam.",
      cta: "Subscribe"
    },
    columns: {
      "Solutions - Agents": [
        "Jazon - AI SDR",
        "Skott - AI Marketer",
        "Dwight - AI RFP Scout",
        "Diane - AI HR agent",
        "Kathy - AI Competitor Analyst",
        "Jeff - AI Support agent"
      ],
      "Platform - Case Studies": [
        "Leading HR tech innovator",
        "Leading energy provider",
        "Global IT giant",
        "HR & workforce leader",
        "Customer service leader",
        "Industrial manufacturing firm"
      ],
      "Comparisons": [
        "Lyzr vs Agentforce",
        "Lyzr vs Langgraph",
        "Lyzr vs Crewai",
        "Lyzr vs Microsoft Copilot",
        "Lyzr vs Google AgentKit",
        "Lyzr vs n8n"
      ],
      "Templates": [
        "100 Use Cases for CFOs",
        "140+ Agentic Use Cases for Healthcare",
        "Customer Support Use Cases",
        "100+ Insurance Agent Use Cases",
        "101 AI Use Cases",
        "12 AI Marketing Use Cases",
        "AI Agents Use Cases for HR",
        "Banking Use Case",
        "12 AI Sales Agents Use Cases"
      ],
      "Playbooks": [
        "HR Automation",
        "Sales Automation",
        "Banking Automation",
        "Content Marketing",
        "GTM Marketing",
        "Agents to production",
        "Performance Management",
        "Fundraising Agent",
        "Agentforce Alternative",
        "Procurement Automation"
      ],
      "Resources": [
        "Blog",
        "Glossary",
        "Webinars",
        "Courses",
        "Usecases",
        "Videos",
        "State of AI Agents",
        "Agent Architect Cohort",
        "AI Readiness Assessment",
        "Research",
        "Lyzr Analyst Recognition"
      ]
    }
  },

  interactive_notes: {
    hero_layers: "Interactive stack of diamonds; hovering/clicking highlights different layers with detailed cards (LAYER 01–07).",
    stats: "Animated counters that increment on scroll/load.",
    case_studies: "Carousel (1/5 indicator observed).",
    developer_toggle: "Switch that may alter hero messaging or visual emphasis for developers vs business users.",
    cookie_consent: "Appears on first visit; blocks some interactions until accepted/rejected."
  }
};
