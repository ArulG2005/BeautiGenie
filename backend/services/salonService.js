class SalonService {
    static getServices() {
      return [
        { name: "Haircut", duration: 60, price: 50, description: "Professional haircut with styling" },
        { name: "Manicure", duration: 45, price: 35, description: "Basic manicure with polish" },
        { name: "Facial", duration: 90, price: 80, description: "Deluxe facial treatment" },
        { name: "Massage", duration: 60, price: 70, description: "Relaxing full-body massage" },
        { name: "Waxing", duration: 30, price: 40, description: "Eyebrow or lip waxing" }
      ];
    }
  }
  
  module.exports = SalonService;