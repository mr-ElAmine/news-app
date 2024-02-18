import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Box } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { isSignedIn } = useUser();

  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const pages = [
    { route: "/news", name: "News" },
    { route: "https://portfolio-app-3j2f.vercel.app/", name: "Contact" },
  ];

  return (
    <Navbar
      maxWidth="full"
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand className="flex justify-center sm:justify-start">
          <Link href={!isSignedIn ? "/" : "/news"}>
            <Box size={50} color="#000000" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {pages.map((page, index) => (
          <div key={`${page}-${index}`}>
            <NavbarItem isActive={currentPath === page.route ? true : false}>
              <Link
                color="foreground"
                href={page.route}
                size="lg"
                underline={currentPath === page.route ? "always" : "hover"}
              >
                {page.name}
              </Link>
            </NavbarItem>
          </div>
        ))}
      </NavbarContent>
      {isSignedIn ? (
        <NavbarContent justify="end">
          <UserButton afterSignOutUrl="/" />
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Button
              as={Link}
              href="/sign-in/"
              radius="sm"
              size="md"
              variant="ghost"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="/sign-up/"
              variant="flat"
              radius="sm"
              size="md"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu className="border">
        {pages.map((page, index) => (
          <div key={`${page}-${index}`}>
            <NavbarMenuItem>
              <Button
                as={Link}
                className="w-full"
                href={page.route}
                size="md"
                variant={currentPath === page.route ? "faded" : "solid"}
              >
                {page.name}
              </Button>
            </NavbarMenuItem>
          </div>
        ))}
        {!isSignedIn && (
          <NavbarItem>
            <Button
              as={Link}
              href="/sign-in/"
              radius="sm"
              size="md"
              variant="flat"
              className="w-full"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
