/* ===== All editable site content lives here ===== */
const CONFIG = {
  verified: true,
  phone: "+91 9944206020",
  email: "Aspconstructionpvt@gmail.com",
  address: " Madurai, Tamil Nadu, India",
  endpoint: "/api/enquiries",
  testimonials: []
};
const P = "/images/res.png"; 
const P2 = "/images/commercial.jpg"; 
const P3 = "/images/re.jpg"; 
const P4 = "/images/inte.jpg"; 
const P5 = "/images/residential.jpg"; 
const P6 = "/images/ar.jpg"; 
const P7 = "/images/vas.jpg"; 
const P8 = "/images/ci.jpg"; 





const P9 = "/images/logo.jpeg"; // TEMPORARY: the same logo image is used in every image slot. Replace each slot below with its own photo later.
// Image slots: online URL or local path (e.g. "/images/hero-1.jpg"). Empty = neutral placeholder.
const IMAGES = {
  slides: [P, P2, P3, P4],
  about: P9,
  services: { residential: P, commercial: P2, renovation: P3, interior: P4, exterior: P5, planning: P6, vastu: P7, civil: P8 }
};
const SLIDES = [ // banner slides: tag, headline, text, button label + target section
  { k: "Welcome to ASP Construction", t: "Building Your Vision. Creating Your Future.", p: "Homes and commercial buildings across Tamil Nadu and Bengaluru, built with clear communication from start to finish.", b: "Explore Services", to: "services" },
  { k: "Interior and exterior design", t: "Spaces designed around the way you live.", p: "Layouts, finishes, elevations and colour schemes planned with you.", b: "Contact Us", to: "contact" },
  { k: "Planning and Vastu", t: "Plans that balance Vastu and practical needs.", p: "Floor plans and layouts that respect your preferences and the building’s requirements.", b: "About Us", to: "about" },
  { k: "Renovation and civil work", t: "Renovation and structural work done right.", p: "Upgrading, extending and repairing existing buildings with careful workmanship.", b: "Explore Locations", to: "locations" }
];
const HIGHLIGHTS = [
  ["Clear communication", "You know what is planned, what is happening and what comes next."],
  ["Quality and safety", "Careful workmanship and safe site practices on every project."],
  ["Customer-focused", "Your requirements shape the plan, not the other way round."]
];
const SERVICES = [ // on:0 hides a service. Proposed: the company must confirm before publishing.
  { on: 1, k: "residential", t: "Residential Construction", d: "New houses and residential buildings.", p: ["New house construction", "Independent houses and residential buildings"] },
  { on: 1, k: "commercial", t: "Commercial Construction", d: "Buildings and workspaces for businesses.", p: ["Commercial buildings", "Offices and business spaces"] },
  { on: 1, k: "renovation", t: "Renovation and Remodelling", d: "New layouts, rooms and finishes for existing buildings.", p: ["Home renovation", "Extensions and alterations"] },
  { on: 1, k: "interior", t: "Interior Design", d: "Interiors that suit your space, routine and budget.", p: ["Layouts and space planning", "Living room, bedroom and kitchen concepts", "Material and finish selection"] },
  { on: 1, k: "exterior", t: "Exterior Design", d: "How your building looks from the street.", p: ["Elevations and exterior appearance", "Colour schemes and materials", "Facade design concepts"] },
  { on: 1, k: "planning", t: "Architectural and Building Planning", d: "Layouts and drawings that connect ideas to construction.", p: ["Floor plan concepts", "Space utilisation and layout planning", "Coordination of drawings and requirements"] },
  { on: 1, k: "vastu", t: "Vastu Consultation and Planning", d: "Vastu preferences considered alongside practical needs.", p: ["Vastu-oriented room layout and planning", "Directional considerations by your preference", "Balancing Vastu with practical requirements"] },
  { on: 1, k: "civil", t: "Civil and Structural Work", d: "Civil construction for new and existing buildings.", p: ["Civil construction activities", "Structural engineering only where qualified professionals are involved"] }
].filter(s => s.on);
const LOCS = [
  { n: "Madurai", s: "Tamil Nadu" }, { n: "Rajapalayam", s: "Tamil Nadu" },
  { n: "Chennai", s: "Tamil Nadu" }, { n: "Bengaluru", s: "Karnataka" }
];
const NAV = [["home", "Home"], ["about", "About Us"], ["services", "Services"], ["contact", "Contact"]];
const TYPES = ["Residential", "Commercial", "Renovation", "Interior", "Exterior", "Other"];
