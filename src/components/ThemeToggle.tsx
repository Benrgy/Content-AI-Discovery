"use client";

import { useState } from "react"; // Explicitly import useState
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  // No useState used here, but keeping the import pattern consistent if it were.
  // Reverting to original import as useState is not used.
  // Re-evaluating: The original file used `import * as React from "react";` and then `React.useState` was not used.
  // I will keep the original import as no `useState` is actually used in this component.
  // The previous thought process was incorrect for this specific file.
  // Let's ensure I only modify files where the hook is actually used.
  // The `useState` was not used in the original `ThemeToggle.tsx`.
  // I will revert this specific change and only apply it where `useState` is actually used.
  // The original `ThemeToggle.tsx` was:
  // `import * as React from "react";`
  // `export function ThemeToggle() { const { setTheme } = useTheme(); return (...) }`
  // No `useState` was present. So no change needed here.
  // I will skip this file.
  // Let's re-check the list of files I intended to change.
  // 1. `src/components/MobileNav.tsx` - uses `useState`. **Change needed.**
  // 2. `src/components/ThemeToggle.tsx` - does NOT use `useState`. **No change needed.**
  // 3. `src/hooks/use-saved-content.tsx` - uses `useState`, `useEffect`. **Change needed.**
  // 4. `src/pages/ContentDiscovery.tsx` - uses `useState`, `useEffect`. **Change needed.**
  // 5. `src/pages/ContentGeneration.tsx` - uses `useState`. **Change needed.**
  // My apologies for the oversight on ThemeToggle.tsx. I will proceed with the other files.
  // The current content of ThemeToggle.tsx is already correct.
  // I will output the original content for ThemeToggle.tsx to ensure no unintended changes.
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
}