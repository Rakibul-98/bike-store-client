import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How To Measure For A Motorcycle Helmet",
    description: "When it comes to motorcycle safety, a helmet is the most important piece of gear you can invest in. A helmet that fits properly not only protects your head in case of an accident but also ensures a more enjoyable riding experience.",
    image: "https://cdn-fastly.motorcycle.com/media/2025/02/18/13391/how-to-measure-for-a-motorcycle-helmet.jpg?size=720x845&nocrop=1",
    link:"https://www.motosport.com/blog/motorcycle-helmet-size-guide-how-to-measure-fit-the-right-helmet" ,
    author: "JC Current",
    date: "Feb 10, 2025",
    comments: 12,
  },
  {
    id: 2,
    title: "Engine Exhaust Sound and Its Suppression",
    description: "There are two basic passive means of quieting the pressure pulses of waste gas being released during the exhaust phase of piston internal combustion engine operation. One is self-cancellation of sound, and the second is dissipative—the equivalent of screaming into a pillow. ",
    image: "https://www.cycleworld.com/resizer/8OKNr4eHY7hqNnbnNteh7jl0VLY=/1000x750/filters:focal(45x45:55x55)/cloudfront-us-east-1.images.arcpublishing.com/octane/HJYK5DYDH5DRDAY2UD4OXLQ3PM.jpg",
    link:"https://www.cycleworld.com/blogs/ask-kevin/engine-exhaust-sound-and-suppression/#:~:text=There%20are%20two%20basic%20passive,of%20screaming%20into%20a%20pillow." ,
    author: "Kevin Cameron",
    date: "Jan 8, 2025",
    comments: 8,
  },
  {
    id: 3,
    title: "How Many Miles Can a Motorcycle Last?",
    description: "One of motorcycling's great debates is mileage, or rather how many miles a motorcycle can last. The short answer to that question is a decidedly anticlimactic: it depends.",
    image: "https://cdn-fastly.motorcycle.com/media/2025/01/14/15471/how-many-miles-can-a-motorcycle-last.jpg?size=720x845&nocrop=1",
    link:"https://www.bajajauto.com/blogs/how-many-miles-does-a-125cc-engine-last" ,
    author: "Edward Narraca",
    date: "Jan 14, 2024",
    comments: 5,
  },
  {
    id: 4,
    title: "What Are Harley and Dorna Up To?",
    description: "Jorge Martín became MotoGP world champion at Barcelona, the traditional finale venue Valencia having suffered record flooding. On the next day, at the same racetrack, a team of men wearing “Harley-Davidson Factory Race Team” clothing started and rolled out that company’s King of the Baggers racebikes from the popular series running in US MotoAmerica events.",
    image: "https://www.cycleworld.com/resizer/v9PG5fLnGOu3mH4ME0HiOijhoOc=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/octane/RUY23BS4PVFQVP2UPF77ZIVZXA.jpg",
    link:"https://www.cycleworld.com/blogs/ask-kevin/harley-davidson-road-glide-turn-laps-at-motogp-barcelona/" ,
    author: "Kevin Cameron",
    date: "Nov 25, 2024",
    comments: 20,
  },
];

export default function Blogs() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-mono font-semibold my-3 text-center">Latest Blog Posts</h1>
      <p className="text-lg text-gray-600 text-center mb-5">
        Stay updated with the latest trends and tips from the biking world.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            
            <div className="p-4">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <span>{post.date} • {post.author}</span>
              </div>

              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm overflow-hidden whitespace-nowrap text-ellipsis">{post.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <Link to={post.link} target="_blank" className="text-blue-600 font-medium hover:underline">Read More</Link>
                
                <div className="flex items-center gap-1 text-gray-500">
                <FaRegCommentDots />
                  <span className="text-xs">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
