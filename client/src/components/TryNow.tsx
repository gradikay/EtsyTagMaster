import TagGenerator from "./TagGenerator";

const TryNow = () => {
  return (
    <section id="try-now" className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-secondary mb-4">Etsy Tag Generator</h2>
          <p className="text-neutral-dark max-w-2xl mx-auto">Enter your product description or title below and get optimized tags for your Etsy listings in seconds.</p>
        </div>

        <TagGenerator />
      </div>
    </section>
  );
};

export default TryNow;
