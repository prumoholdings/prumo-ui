import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Checkbox } from "./checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Input } from "./input";
import { Label } from "./label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./menubar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Progress } from "./progress";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { ScrollArea } from "./scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Slider } from "./slider";
import { Switch } from "./switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Textarea } from "./textarea";
import { Toggle } from "./toggle";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta: Meta = {
  title: "Primitives/Catalog",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section style={{ marginBottom: "var(--space-stack)" }}>
    <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.75rem" }}>{title}</h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--density-gap)", alignItems: "center" }}>
      {children}
    </div>
  </section>
);

/** A warm-vs-sharp token override wrapper — proves the same primitive re-skins. */
const SKINS: Record<string, React.CSSProperties> = {
  warm: {
    // a warm, rounded, soft register
    ["--primary" as string]: "oklch(0.62 0.16 40)",
    ["--accent" as string]: "oklch(0.85 0.09 70)",
    ["--accent-foreground" as string]: "oklch(0.25 0.04 50)",
    ["--radius" as string]: "1rem",
    ["--background" as string]: "oklch(0.99 0.01 70)",
  },
  sharp: {
    // a cool, square, crisp register
    ["--primary" as string]: "oklch(0.5 0.16 264)",
    ["--accent" as string]: "oklch(0.7 0.12 200)",
    ["--accent-foreground" as string]: "oklch(0.18 0.03 264)",
    ["--radius" as string]: "0.125rem",
    ["--background" as string]: "oklch(0.99 0.004 264)",
  },
};

/** The full inputs / controls family. */
export const FormControls: Story = {
  render: () => (
    <div>
      <Section title="Button variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Section>
      <Section title="Inputs">
        <div style={{ display: "grid", gap: "0.5rem", minWidth: 240 }}>
          <Label htmlFor="s-name">Name</Label>
          <Input id="s-name" placeholder="Type here…" />
          <Label htmlFor="s-bio">Bio</Label>
          <Textarea id="s-bio" placeholder="A few words…" />
        </div>
      </Section>
      <Section title="Toggles & choice">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Checkbox id="c1" aria-label="Accept" /> <Label htmlFor="c1">Checkbox</Label>
          <Switch aria-label="Notifications" />
          <Toggle aria-label="Bold">B</Toggle>
          <ToggleGroup type="single" aria-label="Align">
            <ToggleGroupItem value="l" aria-label="Left">L</ToggleGroupItem>
            <ToggleGroupItem value="c" aria-label="Center">C</ToggleGroupItem>
            <ToggleGroupItem value="r" aria-label="Right">R</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Section>
      <Section title="RadioGroup">
        <RadioGroup defaultValue="a" aria-label="Plan">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <RadioGroupItem value="a" id="r-a" /> <Label htmlFor="r-a">Option A</Label>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <RadioGroupItem value="b" id="r-b" /> <Label htmlFor="r-b">Option B</Label>
          </div>
        </RadioGroup>
      </Section>
      <Section title="Slider">
        <div style={{ width: 240 }}>
          <Slider defaultValue={[40]} max={100} step={1} aria-label="Volume" />
        </div>
      </Section>
      <Section title="Select">
        <Select>
          <SelectTrigger style={{ width: 220 }}>
            <SelectValue placeholder="Pick one…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one">One</SelectItem>
            <SelectItem value="two">Two</SelectItem>
            <SelectItem value="three">Three</SelectItem>
          </SelectContent>
        </Select>
      </Section>
    </div>
  ),
};

/** Display / data primitives. */
export const Display: Story = {
  render: () => (
    <div>
      <Section title="Badges">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </Section>
      <Section title="Avatar">
        <Avatar>
          <AvatarImage src="" alt="" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
      </Section>
      <Section title="Card">
        <Card style={{ maxWidth: 320 }}>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>A token-skinned surface.</CardDescription>
          </CardHeader>
          <CardContent>Body content reads the card foreground role.</CardContent>
        </Card>
      </Section>
      <Section title="Alert">
        <Alert style={{ maxWidth: 420 }}>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>This is an informational alert.</AlertDescription>
        </Alert>
      </Section>
      <Section title="Progress">
        <div style={{ width: 280 }}>
          <Progress value={64} />
        </div>
      </Section>
      <Section title="Separator">
        <div style={{ width: 280 }}>
          above
          <Separator className="my-2" />
          below
        </div>
      </Section>
      <Section title="ScrollArea">
        <ScrollArea className="h-24 w-64 rounded-md border border-border p-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ fontSize: "var(--text-small)" }}>Row {i + 1}</div>
          ))}
        </ScrollArea>
      </Section>
      <Section title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ada</TableCell>
              <TableCell>Engineer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grace</TableCell>
              <TableCell>Admiral</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>
    </div>
  ),
};

/** Navigation primitives. */
export const Navigation: Story = {
  render: () => (
    <div>
      <Section title="Tabs">
        <Tabs defaultValue="a" style={{ width: 360 }}>
          <TabsList>
            <TabsTrigger value="a">Overview</TabsTrigger>
            <TabsTrigger value="b">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Overview content.</TabsContent>
          <TabsContent value="b">Detail content.</TabsContent>
        </Tabs>
      </Section>
      <Section title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>
      <Section title="Pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Section>
      <Section title="Menubar">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Open</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>
      <Section title="Accordion">
        <Accordion type="single" collapsible style={{ width: 360 }}>
          <AccordionItem value="1">
            <AccordionTrigger>What is this?</AccordionTrigger>
            <AccordionContent>A token-skinned disclosure.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>How does it theme?</AccordionTrigger>
            <AccordionContent>Entirely via var(--*) tokens.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>
    </div>
  ),
};

/** Overlays — dialog / popover / tooltip / menus. */
export const Overlays: Story = {
  render: () => (
    <TooltipProvider>
      <Section title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>A token-skinned modal with enter/exit motion.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>
      <Section title="AlertDialog">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete…</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>
      <Section title="Sheet">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Side sheet</SheetTitle>
              <SheetDescription>Slides in from the edge.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Section>
      <Section title="Drawer">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Bottom drawer</DrawerTitle>
              <DrawerDescription>Drag to dismiss.</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </Section>
      <Section title="Popover / HoverCard / Tooltip">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Popover content.</PopoverContent>
        </Popover>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>Hover card content.</HoverCardContent>
        </HoverCard>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>A short hint.</TooltipContent>
        </Tooltip>
      </Section>
      <Section title="DropdownMenu / ContextMenu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Button variant="ghost">Right-click me</Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Cut</ContextMenuItem>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Section>
      <Section title="Command">
        <Command className="rounded-lg border border-border" style={{ maxWidth: 380 }}>
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Section>
      <Section title="Calendar">
        <Calendar mode="single" />
      </Section>
    </TooltipProvider>
  ),
};

/** The same primitives under a WARM vs SHARP token skin — proves re-skinnability. */
export const TokenSkins: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)", gridTemplateColumns: "1fr 1fr" }}>
      {(["warm", "sharp"] as const).map((skin) => (
        <div key={skin} style={{ ...SKINS[skin], background: "var(--background)", padding: "1.5rem", borderRadius: "var(--radius)" }}>
          <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.75rem", textTransform: "capitalize" }}>{skin}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <Button>Primary</Button>
            <Button variant="accent">Accent</Button>
            <Badge>Badge</Badge>
            <Toggle aria-label="t" data-state="on">On</Toggle>
            <Switch defaultChecked aria-label="sw" />
            <Card style={{ width: "100%" }}>
              <CardHeader>
                <CardTitle>{skin} card</CardTitle>
                <CardDescription>Same component, different tokens.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      ))}
    </div>
  ),
};
