const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('./models/Testimonial');

dotenv.config();

const DUMMY_TESTIMONIALS = [
    {
        name: "Rajesh Gupta",
        role: "CEO, TechVantage Solutions",
        quote: "Astroxadv provided exceptional counsel during our recent merger. Their precision, dedication, and strategic approach were instrumental in securing a favorable outcome for our company.",
        rating: 5,
        isActive: true
    },
    {
        name: "Anita Sharma",
        role: "Private Client",
        quote: "I was facing a complex property dispute, and the team at Astroxadv handled my case with immense professionalism and empathy. Highly recommended for civil litigation.",
        rating: 5,
        isActive: true
    },
    {
        name: "Vikram Desai",
        role: "Founder, Desai Capital",
        quote: "Their corporate governance advice is unparalleled. We have retained Astroxadv as our primary legal counsel for three years now, and their service has been consistently excellent.",
        rating: 5,
        isActive: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected for Testimonial seeding...");

        // Clear existing testimonials
        await Testimonial.deleteMany({});
        console.log("Cleared existing testimonials.");

        // Insert new dummy testimonials
        const inserted = await Testimonial.insertMany(DUMMY_TESTIMONIALS);
        console.log(`Inserted ${inserted.length} dummy testimonials.`);

        console.log("Seeding complete! You can press CTRL+C to exit.");
        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
