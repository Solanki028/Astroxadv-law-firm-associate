const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ServiceCategory = require('./models/ServiceCategory');
const ServiceItem = require('./models/ServiceItem');

dotenv.config();

const PRACTICE_AREAS = [
    {
        title: "Corporate & Commercial Law",
        slug: "corporate-commercial-law",
        description: "Expert guidance for mergers, acquisitions, contract drafting, and corporate governance structures. We help businesses navigate complex regulatory landscapes with precision.",
        detailedContent: `
            <p>Our Corporate & Commercial Law practice is the cornerstone of our firm. We provide comprehensive, strategic legal counsel to domestic and international corporations, financial institutions, and emerging enterprises. In an increasingly complex global market, our attorneys deliver not just legal opinions, but business-oriented solutions.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">Strategic Counsel for Growth</h3>
            <p>From entity formation and corporate governance to complex cross-border mergers and acquisitions, our team acts as an extension of your board of directors. We specialize in identifying regulatory risks before they materialize, ensuring your business operations remain compliant while aggressively pursuing growth opportunities.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">Meticulous Contract Drafting & Negotiation</h3>
            <p>A poorly drafted contract is the genesis of most commercial litigation. Our commercial experts draft, review, and negotiate critical business agreements—including joint ventures, franchise agreements, licensing, and vendor contracts—with microscopic attention to detail. We engineer legal frameworks designed to prevent disputes and protect your commercial interests unconditionally.</p>
        `,
        heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Civil Litigation",
        slug: "civil-litigation",
        description: "Skilled representation in civil disputes, breach of contract, injunctions, and declaratory reliefs. Our litigators are known for their strategic approach to complex cases.",
        detailedContent: `
            <p>Litigation is inherently disruptive. Our objective is to resolve conflicts efficiently while vigorously protecting your rights. Our Civil Litigation department is composed of seasoned trial lawyers with a reputation for formidable advocacy inside and outside the courtroom.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">Aggressive Representation, Strategic Resolution</h3>
            <p>Whether navigating multifaceted breach of contract claims, shareholder disputes, or tort actions, we build impregnable cases grounded in meticulous evidence gathering and innovative legal theories. We do not just litigate; we strategically maneuver to put you in the strongest possible negotiating position.</p>
            <p>We routinely appear before High Courts, Tribunals, and Appellate authorities, possessing the gravitas and experience required to manage high-stakes, headline-generating disputes.</p>
        `,
        heroImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop"
    },
    {
        title: "Criminal Defense",
        slug: "criminal-defense",
        description: "Vigorous defense strategies protecting your freedom and rights in all criminal proceedings. We bring tenacity and legal acumen to every courtroom.",
        detailedContent: `
            <p>Facing criminal charges is one of the most perilous moments in an individual's life. State and central prosecutorial agencies wield massive resources. To counterbalance this, you require a legal defense team defined by unmatched tenacity, discretion, and strategic brilliance.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">White-Collar & Economic Offenses</h3>
            <p>We possess specialized expertise in defending against complex white-collar crimes, including corporate fraud, embezzlement, insider trading, and regulatory violations. We intervene early—often during the investigative phases conducted by the ED, CBI, or SFIO—focusing on preventing charges from ever being filed.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">General Criminal Litigation</h3>
            <p>For individuals facing serious penal charges, our trial lawyers dismantle prosecution narratives piece by piece. We investigate independently, challenge evidentiary admissibility aggressively, and advocate with unparalleled passion before the Trial Courts up to the Supreme Court.</p>
        `,
        heroImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Family Law",
        slug: "family-law",
        description: "Compassionate and discreet counsel for divorce, child custody, maintenance, and matrimonial disputes.",
        detailedContent: `
            <p>Family law requires a delicate balance of aggressive legal defense and profound empathy. We guide high-net-worth individuals, executives, and families through their most emotionally catastrophic legal crises with absolute discretion and unwavering support.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">Complex Matrimonial Disputes</h3>
            <p>We handle highly contested divorces involving complex property division, hidden assets tracking, and international jurisdictional issues. Our priority is to shield our clients from public exposure while securing highly favorable settlements or trial verdicts.</p>
            <p>Beyond divorce, we provide expert counsel in child custody battles, seeking sole or joint conservatorship, and drafting airtight alimony and maintenance agreements.</p>
        `,
        heroImage: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Property & Real Estate",
        slug: "property-real-estate",
        description: "Comprehensive services for property transactions, title disputes, tenant law, and registration.",
        detailedContent: `
            <p>Real estate is often an individual's or corporation's most valuable asset. The legal landscape governing property in India is notoriously dense, governed by archaic laws interwoven with modern compliance regulations like RERA. We cut through the complexity to secure and maximize your property investments.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">Due Diligence & Title Verification</h3>
            <p>We conduct exhaustive, microscopic title verifications and multi-tier due diligence for major land acquisitions, commercial leasing, and real estate development projects, guaranteeing that your investments are entirely insulated from hidden encumbrances or future legal challenges.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">Real Estate Litigation</h3>
            <p>When property rights are threatened, we act swiftly through injunctions, specific performance suits, and eviction proceedings. Our attorneys successfully resolve multi-generational ancestral property disputes and fierce commercial tenancy battles.</p>
        `,
        heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
    },
    {
        title: "Employment Law",
        slug: "employment-law",
        description: "Protecting employee and employer rights in workplace disputes, termination, and contract matters.",
        detailedContent: `
            <p>The modern workplace is a minefield of regulatory requirements and potential liabilities. We provide sophisticated counsel to both corporations seeking to minimize risk, and high-level executives negotiating critical transitions.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-law-navy" style="font-family: var(--font-cormorant)">Employer Advisory & Defense</h3>
            <p>We assist HR departments in drafting bulletproof employment contracts, non-compete agreements, and anti-sexual harassment (POSH) policies. When corporations face wrongful termination suits, class actions, or labor union disputes, our litigators provide a formidable defense strategy designed to protect brand reputation and minimize financial exposure.</p>
            <p>For C-suite executives, we negotiate lucrative severance packages, defend against restrictive covenants, and litigate cases of systemic workplace discrimination.</p>
        `,
        heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
    }
];

// Items associated with the categories
const PRACTICE_ITEMS = {
    "corporate-commercial-law": [
        {
            title: "Mergers & Acquisitions",
            description: "End-to-end guidance on corporate restructuring, hostile takeovers, acquisitions, and joint ventures handled by expert negotiators.",
            imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
            tools: ["Corporate Governance", "Due Diligence", "Compliance"]
        },
        {
            title: "Commercial Contract Drafting",
            description: "Meticulous drafting and review of highly complex commercial contracts designed to minimize your business risk.",
            imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
            tools: ["Negotiation", "Licensing", "Vendor Agreements"]
        },
        {
            title: "Intellectual Property Rights (IPR)",
            description: "Defending and registering your patents, trademarks, and copyrights on a global scale.",
            imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
            tools: ["Trademarks", "Copyright Litigation", "Patents"]
        }
    ],
    "civil-litigation": [
        {
            title: "Commercial Disputes",
            description: "Aggressive representation in high-stakes commercial disputes, shareholder actions, and complex multidistrict litigation.",
            imageUrl: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=2070&auto=format&fit=crop",
            tools: ["Arbitration", "Court Advocacy", "Injunctions"]
        },
        {
            title: "Debt Recovery & Insolvency",
            description: "Strategic actions under the Insolvency and Bankruptcy Code (IBC) and debt recovery tribunals to secure your dues.",
            imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop",
            tools: ["IBC 2016", "NCLT Proceedings", "Execution Appeals"]
        }
    ],
    "criminal-defense": [
        {
            title: "White Collar Defense",
            description: "Defending executives and corporations against CBI, ED, and SFIO investigations involving fraud or money laundering.",
            imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
            tools: ["PMLA", "Anticipatory Bail", "Corporate Fraud"]
        },
        {
            title: "Trial advocacy",
            description: "Masterful trial representation for severe penal offenses, ensuring the presumption of innocence is fiercely guarded.",
            imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop",
            tools: ["Cross-Examination", "Bail Applications", "Appeals"]
        }
    ],
    "family-law": [
        {
            title: "Contested Divorces",
            description: "Handling high-conflict matrimonial breakdowns involving complex asset tracing and international jurisdictions.",
            imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1974&auto=format&fit=crop",
            tools: ["Asset Division", "Alimony", "Settlement"]
        },
        {
            title: "Child Custody & Maintenance",
            description: "Prioritizing the welfare of the child while fiercely advocating for your parental rights and financial fairness.",
            imageUrl: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop",
            tools: ["Visitation Rights", "Maintenance Petitions", "Guardianship"]
        }
    ],
    "property-real-estate": [
        {
            title: "Real Estate Due Diligence",
            description: "Comprehensive multi-tier title verifications and risk assessments before you commit millions to an acquisition.",
            imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
            tools: ["Title Search", "RERA Compliance", "Registration"]
        },
        {
            title: "Property Litigation",
            description: "Resolving ancestral disputes, illegal possession claims, and complex landlord-tenant eviction matters.",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            tools: ["Injunctions", "Eviction Suits", "Partition Suits"]
        }
    ],
    "employment-law": [
        {
            title: "Employer Compliance & POSH",
            description: "Auditing and drafting workplace policies, alongside serving on Internal Complaints Committees (ICC) for POSH compliance.",
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
            tools: ["Policy Drafting", "POSH Act", "HR Audits"]
        },
        {
            title: "Executive Severance",
            description: "Negotiating maximum value exit packages and defending C-suite executives against unfair non-compete clauses.",
            imageUrl: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop",
            tools: ["Severance Negotiation", "Non-Competes", "Wrongful Termination"]
        }
    ]
};

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected for seeding...");

        // Clear existing categories and items
        await ServiceCategory.deleteMany({});
        await ServiceItem.deleteMany({});
        console.log("Cleared existing services.");

        // Insert new practice areas
        const insertedCategories = await ServiceCategory.insertMany(PRACTICE_AREAS);
        console.log(`Inserted ${insertedCategories.length} practice areas.`);

        // Insert items
        let itemCounter = 0;
        for (const cat of insertedCategories) {
            const items = PRACTICE_ITEMS[cat.slug];
            if (items) {
                const itemsToInsert = items.map(item => ({
                    ...item,
                    categorySlug: cat.slug
                }));
                await ServiceItem.insertMany(itemsToInsert);
                itemCounter += itemsToInsert.length;
            }
        }
        console.log(`Inserted ${itemCounter} specific practice items.`);

        console.log("Seeding complete! You can press CTRL+C to exit.");
        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
