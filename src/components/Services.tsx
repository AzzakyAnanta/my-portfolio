import { Code, Palette, Brain, Smartphone, Database, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Building responsive, fast, and scalable web applications using modern technologies and best practices.",
      features: ["React & Next.js", "Laravel & PHP", "API Integration"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive interfaces that provide exceptional user experiences and drive engagement.",
      features: ["Figma Design", "Prototyping", "User Research"],
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Implementing cutting-edge AI solutions to enhance your applications with intelligent features.",
      features: ["ChatGPT Integration", "ML Models", "Automation"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications that work seamlessly on iOS and Android devices.",
      features: ["React Native", "PWA", "App Optimization"],
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Building robust server-side applications with secure authentication and efficient data management.",
      features: ["RESTful APIs", "Database Design", "Cloud Services"],
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Improving website speed, SEO, and overall performance to deliver the best user experience.",
      features: ["Speed Optimization", "SEO", "Analytics"],
    },
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">What I can do for you</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
