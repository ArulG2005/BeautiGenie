class SalonService {
  static getServices() {
    return [
      // Hair Services
      { name: "Haircut & Blowdry", duration: 90, price: 65, description: "Precision haircut with professional blowout" },
      { name: "Balayage Highlights", duration: 180, price: 150, description: "Hand-painted highlights for natural sun-kissed look" },
      { name: "Keratin Treatment", duration: 120, price: 200, description: "Smoothing treatment for frizzy hair" },
      { name: "Bridal Updo", duration: 60, price: 85, description: "Elegant wedding hairstyle" },
      
      // Nail Services
      { name: "Gel Manicure", duration: 60, price: 45, description: "Long-lasting gel polish with nail shaping" },
      { name: "Spa Pedicure", duration: 75, price: 55, description: "Luxurious foot treatment with massage" },
      { name: "Nail Art Design", duration: 30, price: 25, description: "Custom nail art (add-on service)" },
      
      // Skin & Face
      { name: "Teen Facial", duration: 50, price: 60, description: "Gentle facial for young skin" },
      { name: "Gold Facial", duration: 90, price: 120, description: "Luxury anti-aging treatment with 24k gold" },
      { name: "Bridal Makeup Trial", duration: 90, price: 95, description: "Makeup consultation before wedding" },
      
      // Waxing & Hair Removal
      { name: "Full Leg Wax", duration: 45, price: 60, description: "Complete leg hair removal" },
      { name: "Bikini Wax", duration: 30, price: 45, description: "Standard bikini line waxing" },
      { name: "Brazilian Wax", duration: 45, price: 75, description: "Complete hair removal" },
      
      // Special Treatments
      { name: "Henna Tattoo", duration: 60, price: 50, description: "Decorative temporary body art" },
      { name: "Eyelash Extensions", duration: 120, price: 150, description: "Classic set of lash extensions" },
      { name: "Microblading", duration: 120, price: 300, description: "Semi-permanent eyebrow enhancement" },
      
      // Spa Packages
      { name: "Princess Package", duration: 180, price: 200, description: "Haircut, manicure, and mini facial (ages 6-12)" },
      { name: "Teen Glow Up", duration: 210, price: 175, description: "Facial, manicure, and eyebrow shaping" },
      { name: "Bridal Package", duration: 300, price: 350, description: "Hair, makeup, and manicure for wedding day" }
    ];
  }
  static getServicesByCategory() {
    const services = this.getServices();
    return {
      hair: services.filter(s => s.name.includes("Hair") || s.name.includes("Treatment")),
      nails: services.filter(s => s.name.includes("Manicure") || s.name.includes("Pedicure") || s.name.includes("Nail")),
      skin: services.filter(s => s.name.includes("Facial") || s.name.includes("Makeup")),
      waxing: services.filter(s => s.name.includes("Wax")),
      special: services.filter(s => s.name.includes("Package") || s.name.includes("Henna") || s.name.includes("Lash"))
    };
  }
}