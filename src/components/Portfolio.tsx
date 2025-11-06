import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Web", "Mobile", "Design", "AI"];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with Laravel and React",
      category: "Web",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop",
      tags: ["React", "Laravel", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "AI Chat Application",
      description: "Real-time chat powered by AI",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      tags: ["AI", "React", "WebSocket"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking interface",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      tags: ["React Native", "Firebase"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Brand Identity Design",
      description: "Complete brand identity for tech startup",
      category: "Design",
      image: "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=600&h=400&fit=crop",
      tags: ["Figma", "Illustrator"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data",
      category: "Web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["React", "Chart.js", "API"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "AI Image Generator",
      description: "Text-to-image AI powered web application",
      category: "AI",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=600&h=400&fit=crop",
      tags: ["AI", "Python", "React"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg">Check out my recent work</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-4">
                  <Button size="sm" variant="hero" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
