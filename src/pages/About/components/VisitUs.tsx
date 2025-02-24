import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function VisitUs() {

    const contactInfo = [
        {
          id: 1,
          icon: <FaMapMarkerAlt className="text-blue-500 text-2xl" />,
          label: "Address",
          value: "Mirpur 10, Mirpur, Dhaka",
        },
        {
          id: 2,
          icon: <FaPhone className="text-blue-500 text-2xl" />,
          label: "Phone",
          value: "+880 1000 000000",
        },
        {
          id: 3,
          icon: <FaEnvelope className="text-blue-500 text-2xl" />,
          label: "Email",
          value: "contact@bikestore.com",
        },
        {
          id: 4,
          icon: <FaClock className="text-blue-500 text-2xl" />,
          label: "Opening Hours",
          value: (
            <>
              Mon - Fri: 9:00 AM - 7:00 PM <br />
              Sat - Sun: 10:00 AM - 5:00 PM
            </>
          ),
        },
    ];
    
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Visit Us 📍</h2>
          <p className="text-gray-600 mt-3">Come and explore our store for the best biking experience!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-[300px] md:h-[400px]">
            <iframe
              title="Bike Store Location"
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14601.77046430682!2d90.36453464890553!3d23.802854858150777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d33532b3fb%3A0x2b27b0c01cb2bc0d!2sMirpur-10%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1740022653300!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                {item.icon}
                <div>
                  <p className="font-semibold text-gray-800">{item.label}</p>
                  <p className="text-lg text-gray-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
