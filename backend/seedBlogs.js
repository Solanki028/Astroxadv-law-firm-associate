const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/Blog');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for Blog seeding...'))
  .catch(err => {
      console.error(err);
      process.exit(1);
  });

const blogs = [
    {
        title: "Navigating the Changing Landscape of Corporate Governance in 2024",
        slug: "navigating-corporate-governance-2024",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        isPublished: true,
        content: `
            <p>Corporate governance has seen massive shifts over the past year, fundamentally redefining board responsibilities and shareholder expectations. As companies scale, the regulatory scrutiny attached to their operations scales symmetrically.</p>
            <h3>1. The Rise of ESG Compliance</h3>
            <p>Environmental, Social, and Governance (ESG) criteria are no longer optional "nice-to-haves". They are strictly codified requirements across major international markets. Companies without a transparent ESG framework risk severe penalties and reputational damage.</p>
            <blockquote>"The cost of non-compliance is vastly overshadowing the cost of strategic legal partnerships." — Board Insight</blockquote>
            <h3>2. Director Liabilities</h3>
            <p>Recent landmark rulings have pierced the corporate veil with more frequency, exposing directors to personal liability for corporate negligence. We strongly advise our corporate clients to engage in quarterly compliance audits.</p>
            <p>Our Corporate & Commercial team is uniquely positioned to guide your executive board through these turbulent regulatory waters, ensuring airtight compliance while protecting director assets.</p>
        `
    },
    {
        title: "Intellectual Property: Protecting Your Digital Assets in the AI Era",
        slug: "intellectual-property-ai-era",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        isPublished: true,
        content: `
            <p>The explosive growth of generative artificial intelligence has created unprecedented challenges in Intellectual Property (IP) law. For tech startups and established enterprises alike, safeguarding proprietary algorithms and data sets is critical.</p>
            <h3>Understanding Copyright in AI-Generated Works</h3>
            <p>A central debate revolves around whether AI-generated outputs can be copyrighted. Currently, the consensus in many jurisdictions is that copyright requires human authorship. This poses a unique risk for companies leveraging AI for creative or functional output.</p>
            <ul>
                <li><strong>Trade Secrets:</strong> Often, the safest route for AI models is rigorous trade secret protection.</li>
                <li><strong>Patent Eligibility:</strong> Software patents face strict scrutiny under Alice framework but remain a viable option for novel technical solutions.</li>
                <li><strong>Data Licensing:</strong> Ensure your data scraping and usage do not infringe on third-party copyrights.</li>
            </ul>
            <p>Astroxadv’s IP division offers comprehensive audits of your technology stack to secure your intellectual rights against emerging threats.</p>
        `
    },
    {
        title: "Real Estate Transactions: Avoiding Common Legal Pitfalls",
        slug: "real-estate-transactions-pitfalls",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        isPublished: true,
        content: `
            <p>Commercial real estate transactions represent significant capital investments and equally significant legal risks. The complexities of zoning codes, environmental liabilities, and title defects can derail even the most promising acquisitions.</p>
            <h3>The Importance of Rigorous Due Diligence</h3>
            <p>A standard title search is insufficient for modern commercial acquisitions. Buyers must investigate:</p>
            <ul>
                <li>Unrecorded easements and boundary disputes.</li>
                <li>Historical environmental contamination (Phase I & II ESAs).</li>
                <li>Pending municipal zoning changes.</li>
            </ul>
            <blockquote>An ounce of legal due diligence is worth a pound of litigation.</blockquote>
            <p>Our real estate attorneys work symmetrically with brokers and financial institutions to ensure smooth, secure, and legally sound transactions from letter of intent to closing.</p>
        `
    },
    {
        title: "Employment Law Updates: Remote Work and Cross-Border Taxation",
        slug: "employment-law-remote-work",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        isPublished: true,
        content: `
            <p>The permanent transition to remote work for many organizations has triggered entirely new branches of employment litigation, specifically concerning cross-border taxation, jurisdictional compliance, and employee classification.</p>
            <h3>Permanent Establishment Risks</h3>
            <p>When an employee works remotely from a different state or country, they may inadvertently trigger "permanent establishment" for their employer, subjecting the company to local corporate taxes and stringent labor laws.</p>
            <h3>Misclassification of Independent Contractors</h3>
            <p>Hiring global talent often tempts companies to misclassify workers as independent contractors to avoid benefits and tax withholdings. Regulatory bodies are cracking down on this practice globally with massive fines.</p>
            <p>We advise employers on drafting robust remote work policies that mitigate risk while maintaining flexibility for their workforce.</p>
        `
    },
    {
        title: "Criminal Defense: The Importance of Immediate Legal Representation",
        slug: "criminal-defense-immediate-representation",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        isPublished: true,
        content: `
            <p>When facing criminal charges, the actions taken within the first 24 hours of investigation or arrest unilaterally define the trajectory of the case. Retaining immediate, aggressive legal counsel is your absolute constitutional right and tactical necessity.</p>
            <h3>Protecting Against Self-Incrimination</h3>
            <p>Law enforcement is trained to extract information. Without counsel, individuals frequently make prejudicial statements under pressure. The presence of an attorney fundamentally shifts the power dynamic.</p>
            <ul>
                <li><strong>Pre-Charge Intervention:</strong> Our goal is often to prevent charges from ever being formally filed.</li>
                <li><strong>Securing Evidence:</strong> Digital evidence degrades. Witness memories fracture. Immediate action secures exculpatory evidence.</li>
            </ul>
            <p>At Astroxadv, our criminal defense litigators fight ferociously to protect our clients' freedom, reputation, and livelihood from the moment we are engaged.</p>
        `
    },
    {
        title: "Mergers & Acquisitions: Mastering the Letter of Intent",
        slug: "mergers-acquisitions-letter-of-intent",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        isPublished: true,
        content: `
            <p>The Letter of Intent (LOI) is the architectural blueprint of any successful M&A transaction. While largely non-binding, the terms negotiated at this stage establish the psychological and structural framework for the final definitive agreements.</p>
            <h3>Binding vs. Non-Binding Provisions</h3>
            <p>A properly drafted LOI clearly bifurcates binding provisions (like confidentiality and exclusivity) from non-binding financial terms. Ambiguity here is arguably the most common cause of early deal collapse.</p>
            <h3>Working Capital Mechanisms</h3>
            <p>Failure to adequately define working capital targets in the LOI leads to hostile negotiations at closing. Our corporate attorneys specialize in front-loading these complex definitions to ensure transparent, friction-free acquisitions.</p>
            <p>Whether you are on the buy-side or sell-side, our M&A team ensures your strategic interests are legally fortified from day one.</p>
        `
    }
];

const seedDB = async () => {
    try {
        await Blog.deleteMany();
        console.log('Cleared existing blogs.');

        await Blog.insertMany(blogs);
        console.log('Inserted 6 detailed law firm blogs.');

        process.exit();
    } catch (error) {
        console.error('Error seeding blogs:', error);
        process.exit(1);
    }
};

seedDB();
