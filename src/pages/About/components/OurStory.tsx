
export default function OurStory() {
  return (
      <section className="my-16">
      <div className="flex flex-col md:flex-row items-center gap-12 px-6 lg:px-12">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/3 lg:w-1/2">
          <img
            src="https://i.ibb.co.com/jksD8Fyc/person2.jpg"
            alt="Our Journey"
            className="w-full h-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-2/3 lg:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-mono">
            Our Story🚴‍♂️
          </h2>
                  <div className="text-lg leading-relaxed md:text-sm lg:text-lg">
                  <p className="">
                  <span className="font-bold">Bike Solution</span> was born in 2020 from a passion for adventure and a love for biking.
            What started as a small local shop has grown into a thriving community of biking enthusiasts.
            We believe in delivering top-quality bikes, accessories, and expert guidance to riders of all levels.
          </p>
          <p className="mt-4">
            Whether you're a professional biker or just starting your biking journey, we are here to support you every step of the way. Join us in our mission to make every ride an unforgettable experience! 🚵‍♀️
          </p>
          </div>
        </div>
      </div>
    </section>
  )
}
