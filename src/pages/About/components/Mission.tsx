import { FaGlobe, FaHandshake, FaLeaf, FaUsers } from "react-icons/fa";

export default function Mission() {

    const valuesData = [
        {
          icon: <FaGlobe />,
          title: "Sustainability",
          description: "We prioritize eco-friendly production and sustainable practices.",
        },
        {
          icon: <FaUsers />,
          title: "Community",
          description: "We build a community of passionate riders and enthusiasts.",
        },
        {
          icon: <FaHandshake />,
          title: "Integrity",
          description: "Honesty and transparency guide everything we do.",
        },
        {
          icon: <FaLeaf />,
          title: "Innovation",
          description: "We constantly push the boundaries of bike technology and design.",
        },
    ];
    
  return (
    <section className="my-16 py-10 bg-gradient-to-l from-blue-100 to-white">
      <div className=" px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Mission & Values 🌍</h2>
          <p className="text-gray-600 mt-3">Driven by passion, committed to excellence.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img
              src="https://i.ibb.co.com/hJ7qX7vv/mission.jpg"
              alt="Our Mission"
              className="rounded-lg shadow-lg w-[80%] md:w-full lg:w-[90%] h-[250px] mx-auto overflow-clip"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              At <strong>Bike Solution</strong>, our mission is to provide high-quality, affordable, 
              and eco-friendly bicycles to riders of all levels. We are dedicated to promoting 
              a sustainable and healthy lifestyle while delivering unmatched customer service.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {valuesData.map((value, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="text-blue-500 text-4xl mb-3 flex justify-center">{value.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>
  )
}
