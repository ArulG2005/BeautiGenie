class SalonModel {
  static async getServices() {
    return [
      { name: "Haircut", description: "A stylish haircut tailored for your unique look." },
      { name: "Facial", description: "A refreshing facial for glowing and radiant skin." },
      { name: "Manicure", description: "Perfect manicure to enhance your hands' elegance and beauty." },
      { name: "Pedicure", description: "Relaxing pedicure to keep your feet soft and beautiful." },
      { name: "Makeup", description: "Flawless makeup for every occasion, enhancing your natural beauty." },
      { name: "Hair Coloring", description: "Add a splash of color to your hair for a vibrant and fresh look." },
      { name: "Skin Care", description: "Luxurious skin treatments to nourish and rejuvenate your skin." },
      { name: "Bridal Package", description: "Complete bridal beauty package to make you look stunning on your special day." },
      { name: "Eyebrow Shaping", description: "Perfectly shaped brows to define your eyes and enhance your look." },
      { name: "Eyelash Extensions", description: "Lush eyelash extensions for a bold and glamorous look." },
      { name: "Hair Straightening", description: "Achieve sleek and smooth hair with our professional straightening treatment." },
      { name: "Waxing", description: "Smooth, hair-free skin with a variety of waxing options." },
      { name: "Massage", description: "Relax and unwind with a therapeutic full-body massage." },
      { name: "Teeth Whitening", description: "Brighten your smile with our effective teeth whitening service." },
      { name: "Nail Art", description: "Creative and stylish nail art to make your nails stand out." },
      { name: "Body Scrub", description: "Exfoliate and rejuvenate your body with a luxurious body scrub." },
      { name: "Hair Treatment", description: "Deep conditioning and nourishing treatments to keep your hair healthy and vibrant." },
      { name: "Foot Reflexology", description: "Relax your feet and stimulate your entire body with a soothing reflexology session." },
      { name: "Tanning", description: "Get a sun-kissed glow with our safe and even tanning treatments." },
      { name: "Acne Treatment", description: "Effective treatment to clear and heal acne-prone skin." },
      { name: "Detoxifying Body Wrap", description: "A detoxifying wrap to cleanse and rejuvenate your skin." },
      { name: "Hair Volumizing", description: "Add volume and body to your hair with professional volumizing treatments." }
    ];
  }

  static async getAvailability(date) {
    const availableSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
    return { availableSlots };
  }
}

module.exports = SalonModel;
