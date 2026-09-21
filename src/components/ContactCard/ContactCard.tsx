import BoyImage from "@/assets/boy_waving.png";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import "./contact-card.css";

function ContactCard() {
  return (
    <div
      className="
        fixed
        z-[100]
        bottom-6
        right-6
        flex
        items-center
        gap-3
        border-2
        border-gray-100/5
        bg-gray-900
        rounded-2xl
        px-4
        shadow-2xl
        animate-contact-card
      "
    >
      <img src={BoyImage} alt="Boy waving" className="w-40 h-auto" />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center font-semibold">
          Like what you see?! Get in touch.
          <br />
          Let's build together!
        </h1>

        <Button
          variant="link"
          onClick={() => {
            const email = "hashirbaig57@gmail.com";
            const subject = encodeURIComponent("Getting in touch");

            window.location.href = `mailto:${email}?subject=${subject}`;
          }}
        >
          Contact me
          <Mail className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default ContactCard;
