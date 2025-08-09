const HowItWorks = () => {
  const steps = [
    { title: "1. Sign Up", desc: "Create your free account to get started." },
    { title: "2. Add Food", desc: "List your surplus food for donation." },
    { title: "3. Request Food", desc: "See available food & request what you need." },
    { title: "4. Share & Support", desc: "Help the community by sharing with others." },
  ];

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">📢 How It Works</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl text-gray-900 font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
