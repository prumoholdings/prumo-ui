import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Avatar, AvatarFallback } from "./avatar";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./pagination";
import { Progress } from "./progress";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Separator } from "./separator";
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

afterEach(cleanup);

describe("primitives — render + a11y smoke", () => {
  it("Button renders and is axe-clean", async () => {
    const { container } = render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Input + Label are associated and axe-clean", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@example.com" />
      </div>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Textarea + Label axe-clean", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Checkbox / Switch / Toggle expose accessible names", async () => {
    const { container } = render(
      <div>
        <Checkbox aria-label="Accept terms" />
        <Switch aria-label="Notifications" />
        <Toggle aria-label="Bold">B</Toggle>
        <ToggleGroup type="single" aria-label="Alignment">
          <ToggleGroupItem value="l" aria-label="Left">L</ToggleGroupItem>
        </ToggleGroup>
      </div>,
    );
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Notifications" })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("RadioGroup with associated labels is axe-clean", async () => {
    const { container } = render(
      <RadioGroup defaultValue="a" aria-label="Plan">
        <div>
          <RadioGroupItem value="a" id="ra" />
          <Label htmlFor="ra">A</Label>
        </div>
        <div>
          <RadioGroupItem value="b" id="rb" />
          <Label htmlFor="rb">B</Label>
        </div>
      </RadioGroup>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Slider exposes a slider role and is axe-clean", async () => {
    const { container } = render(<Slider defaultValue={[50]} max={100} aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Progress exposes role=progressbar", async () => {
    const { container } = render(<Progress value={42} aria-label="Loading" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Badge / Card / Alert / Avatar / Separator render axe-clean", async () => {
    const { container } = render(
      <div>
        <Badge>New</Badge>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Desc</CardDescription>
          </CardHeader>
          <CardContent>Body</CardContent>
        </Card>
        <Alert>
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>Detail</AlertDescription>
        </Alert>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Separator />
      </div>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Tabs switch panels and are axe-clean", async () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    );
    expect(screen.getAllByRole("tab")).toHaveLength(2);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Accordion renders disclosure semantics axe-clean", async () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger>Question</AccordionTrigger>
          <AccordionContent>Answer</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByRole("button", { name: "Question" })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Breadcrumb exposes a labelled nav axe-clean", async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Here</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Pagination exposes a labelled nav axe-clean", async () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Table renders a semantic table axe-clean", async () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
