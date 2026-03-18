export default function SharedHero({
    label,
    title,
    description,
    bgImage = '/law-firm.webp',
    children
}) {
    return (
        <section className="relative py-32 px-4 overflow-hidden border-b border-law-gold/20 flex-shrink-0">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto text-center mt-12">
                <span className="section-label">{label}</span>
                <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    {title}
                </h1>
                <div className="divider-gold divider-gold-center" />
                {description && (
                    <p className="text-law-light text-sm leading-relaxed max-w-2xl mx-auto mt-6" style={{ fontFamily: 'var(--font-inter)' }}>
                        {description}
                    </p>
                )}
                {children}
            </div>
        </section>
    );
}
