const mongoose = require('mongoose');
const dotenv = require('dotenv');
const About = require('./models/About');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for Content seeding...'))
  .catch(err => {
      console.error(err);
      process.exit(1);
  });

const contents = [
    {
        type: 'home_hero',
        content: {
            tagline: 'Justice Delivered With Integrity',
            description: 'Astroxadv is a premier law firm offering trusted legal counsel across corporate, civil, and criminal law. Your rights are our responsibility.',
            heroImages: [
                'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80',
                'https://images.unsplash.com/photo-1505664147775-dbdf3586cd92?auto=format&fit=crop&w=1920&q=80',
                'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80'
            ]
        }
    },
    {
        type: 'about_us',
        content: {
            text: '<p>Since our founding, Astroxadv has been fiercely dedicated to securing optimal legal outcomes for our clients. We bring decades of combined courtroom experience and corporate legal strategy to the table.</p><p style="margin-top:1rem;">Our attorneys understand that behind every case file is a person or business depending on our expertise. Whether navigating complex corporate litigation, securing intellectual property rights, or providing staunch criminal defense, our commitment to excellence remains unwavering.</p><p style="margin-top:1rem;">We pride ourselves on transparent communication, aggressive representation, and an unparalleled understanding of the law.</p>',
            images: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80'
            ]
        }
    }
];

const seedDB = async () => {
    try {
        for (let item of contents) {
            await About.findOneAndUpdate(
                { type: item.type },
                { content: item.content },
                { upsert: true, new: true }
            );
        }
        console.log('Seeded Home Hero and About Us content with HTML formatting.');
        process.exit();
    } catch (error) {
        console.error('Error seeding content:', error);
        process.exit(1);
    }
};

seedDB();
