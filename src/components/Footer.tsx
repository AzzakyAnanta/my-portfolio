import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-muted-foreground text-center flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" /> by{" "}
            <span className="text-primary font-semibold">Jatnika</span>
          </p>
          <p className="text-sm text-muted-foreground">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
