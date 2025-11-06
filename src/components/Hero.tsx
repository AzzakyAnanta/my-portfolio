import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
// Pastikan gambar ini ada di direktori: C:/Users/ulinh/ngoding/src/assets/
import profileImage from "../assets/profil.jpeg.jpeg";

const Hero = () => {
  const roles = ["Web Developer", "UI/UX Designer", "AI Enthusiast"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        // Tahan 2 detik sebelum mulai menghapus
        setTimeout(() => setIsDeleting(true), 2000); 
      } else if (isDeleting && displayedText === "") {
        // Jika teks sudah kosong, ganti ke peran berikutnya
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        // Lanjutkan mengetik atau menghapus
        setDisplayedText(
          isDeleting
            ? currentRole.substring(0, displayedText.length - 1)
            : currentRole.substring(0, displayedText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
          
          {/* Profile Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-75 blur-2xl animate-pulse"></div>
            <img
              // Menggunakan variabel profileImage yang sudah diimpor
              src={profileImage}
              alt="Jatnika"
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary shadow-2xl animate-float"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Hi, I'm <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Azzaky</span>
            </h1>
            
            <div className="h-12 md:h-16">
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
                <span className="text-primary font-semibold">{displayedText}</span>
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Creative Web Developer & AI Enthusiast crafting beautiful, user-focused digital experiences
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="hero"
              size="lg"
              className="group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Hire Me
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              Download CV
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;