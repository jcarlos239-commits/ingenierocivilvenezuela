Convert this existing Figma design into a fully functional, production-ready website.

IMPORTANT:
This Figma file is the SOURCE OF TRUTH for the visual design. Do NOT redesign the website.

Reproduce the existing design as accurately as possible, including:
- Layout
- Typography
- Font sizes and weights
- Colors
- Spacing
- Borders
- Border radius
- Shadows
- Icons
- Images
- Buttons
- Cards
- Background images
- Section heights
- Alignment
- Visual hierarchy

The desktop and mobile designs shown in this Figma file must both be implemented as responsive versions of the same website.

TECHNOLOGY

Build the website using:
- React
- TypeScript
- HTML5
- CSS3
- JavaScript/TypeScript
- Reusable React components

Do NOT use Java. JavaScript/TypeScript is the appropriate technology for this website.

Create clean, maintainable and production-ready code.

WEBSITE STRUCTURE

Implement the following sections exactly as they appear in the Figma design:

1. HEADER / NAVIGATION
- Implement the logo/brand.
- Implement all navigation links.
- Navigation links should scroll to the appropriate sections.
- Implement the mobile navigation menu.
- Make the header responsive.
- Preserve the appearance and spacing from the Figma design.

2. HERO SECTION
- Reproduce the existing background image and overlay.
- Preserve the headline, subtitle and supporting text.
- Implement the CTA buttons.
- The WhatsApp button should open WhatsApp using the company's configured phone number.
- The "Learn More" / secondary CTA should scroll to the appropriate section.
- Preserve the visual hierarchy and positioning from Figma.

3. SERVICES SECTION
Create reusable React components for each service card.

The service cards should be interactive where appropriate and maintain the exact visual appearance of the Figma design.

Services include:
- Construcción de Obras Civiles
- Rehabilitación
- Ampliaciones
- Patología Estructural
- Estabilización de Taludes
- Proyectos y Planos

Do not invent additional services or technical claims.

4. HOW WE WORK SECTION
Implement the process shown in the design as a reusable step component.

Include:
- Consulta Inicial
- Presupuesto
- Ejecución
- Entrega y Garantía

Preserve the numbered steps, typography, spacing and visual hierarchy from the Figma design.

5. CALL-TO-ACTION SECTION
Implement the "Solicita Tu Presupuesto" section exactly as designed.

The CTA buttons must be functional.

6. COVERAGE SECTION
Implement the "Cobertura en Toda Venezuela" section.

Preserve the background image, overlay, typography and CTA buttons.

7. FOOTER
Implement the footer exactly as designed.

Include functional:
- WhatsApp link
- Email link
- Phone link if provided
- Navigation links
- Social media links if provided

RESPONSIVE DESIGN

The mobile version shown in the Figma design is extremely important.

Do not simply shrink the desktop version.

Implement proper responsive behavior for:
- Desktop
- Laptop
- Tablet
- Mobile

Use the mobile Figma design as the visual reference for mobile breakpoints.

On mobile:
- Convert the navigation into a hamburger menu.
- Stack cards and content appropriately.
- Preserve the spacing and typography shown in the mobile design.
- Ensure CTA buttons remain easy to tap.
- Ensure no horizontal scrolling occurs.

FUNCTIONALITY

This must be a REAL WEBSITE, not a static prototype.

Implement:
- Working navigation
- Smooth scrolling
- Mobile menu
- Working CTA buttons
- Working WhatsApp links
- Working email links
- Working phone links where applicable
- Hover states
- Focus states
- Active states
- Responsive interactions

CONTACT / QUOTE

The "Solicita Tu Presupuesto" functionality should eventually support a professional project inquiry form.

The form should be prepared to collect:
- Nombre
- Empresa
- Teléfono
- Correo electrónico
- Ubicación del proyecto
- Tipo de proyecto
- Servicio requerido
- Descripción del proyecto
- Presupuesto aproximado
- Fecha estimada
- File/document upload if technically supported

Do not fabricate backend credentials or APIs.

If a backend is required for form submission, structure the frontend so the backend/API can be connected later.

SEO

Implement:
- One primary H1
- Proper H2 and H3 hierarchy
- Semantic HTML5
- Meta title
- Meta description
- Descriptive image alt text
- Open Graph metadata
- Clean URLs
- SEO-friendly structure

PERFORMANCE

Optimize the website for:
- Fast loading
- Responsive images
- Minimal unnecessary dependencies
- Good Core Web Vitals
- Mobile performance

ACCESSIBILITY

Use:
- Semantic HTML
- Accessible buttons
- Accessible navigation
- Keyboard navigation
- Proper form labels
- Appropriate ARIA attributes where necessary
- Sufficient text contrast

CODE STRUCTURE

Use reusable components instead of putting the entire website into one React component.

For example:

src/
  components/
    Header
    Hero
    Services
    ServiceCard
    Process
    ProcessStep
    CTA
    Coverage
    Footer
  pages/
  assets/
  styles/

Keep the code organized and easy to maintain.

IMPORTANT DESIGN RULE:

Do not replace the existing design with a generic template.

Do not change the colors, typography, composition, imagery, section order, or overall visual identity.

The goal is:

FIGMA DESIGN → REAL RESPONSIVE REACT WEBSITE

The final result should look as close as possible to the original Figma design while being a fully functional website with real React components, responsive behavior and working interactions.