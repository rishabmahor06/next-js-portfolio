import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";

export default function GithubRedirectCard() {
  return (
    <Card className="w-full h-fit max-w-xl overflow-hidden shadow-lg mt-5">
      <CardContent className="p-6 md:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-heading text-xl tracking-tight lg:text-3xl">
              My Location
            </h2>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Laxmi Nagar, Delhi
            </p>
          </div>
        </div>
        <p className="mb-5 font-heading text-base text-muted-foreground md:text-lg">
          Google Map embed added for your shared address.
        </p>
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.001077640821!2d77.2763337420188!3d28.62972980150726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcad2277af63%3A0xa44f8b23c84bd369!2sLaxmi%20Nagar!5e0!3m2!1sen!2sus!4v1776250599758!5m2!1sen!2sus"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map showing Laxmi Nagar, Delhi"
            className="block"
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 md:px-8 md:pb-8">
        <Link
          href={"https://maps.app.goo.gl/ctJZgk3gAPiCNV7o6"}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full bg-transparent border-2 transition-all duration-300 py-6"
          )}
        >
          <span className="mr-2">Open in Google Maps</span>
          <ExternalLink className="w-5 h-5" />
        </Link>
      </CardFooter>
      <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
    </Card>
  );
}
