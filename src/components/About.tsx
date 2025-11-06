import { Code2, Palette, Sparkles, Database, Smartphone, Globe } from "lucide-react";

const About = () => {
  const skills = [
    { name: "HTML/CSS", level: 95, icon: Code2 },
    { name: "JavaScript", level: 90, icon: Code2 },
    { name: "React", level: 88, icon: Code2 },
    { name: "Laravel", level: 85, icon: Database },
    { name: "UI/UX Design", level: 92, icon: Palette },
    { name: "AI Integration", level: 80, icon: Sparkles },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg">Get to know me better</p>
          </div>

          {/* About Content */}
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg animate-fade-in-up">
              <p className="text-foreground/90 text-lg leading-relaxed mb-6">
                I'm a passionate web developer with a keen eye for design and a love for creating beautiful, functional websites. 
                My approach combines clean code with user-focused design to deliver digital experiences that truly resonate.
              </p>
              <p className="text-foreground/90 text-lg leading-relaxed">
                With expertise in modern web technologies and a growing interest in AI integration, I'm constantly pushing 
                the boundaries of what's possible on the web while maintaining a focus on performance and accessibility.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">My Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-slide-in-right"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-semibold text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-primary font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 animate-scale-in">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Projects Done</div>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: '100ms' }}>
                <div className="text-4xl font-bold text-primary mb-2">40+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: '200ms' }}>
                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: '300ms' }}>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Awards Won</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
