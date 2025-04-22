
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DATA = {
  title: "Tech Innovation in Rural Areas",
  description: "Marcus brought affordable internet solutions to underserved communities.",
  image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  impact: "Connected 1000+ households",
};

const MarcusCaseStudy = () => (
  <div className="min-h-screen bg-gray-50 pt-20 md:pt-28">
    <div className="container mx-auto px-4 py-8">
      <Link to="/success-stories" className="text-terracotta-500 hover:text-terracotta-700 flex items-center gap-2 mb-6 md:mb-8">
        <ArrowLeft size={16} /> Back to Success Stories
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
        <img
          src={DATA.image}
          alt={DATA.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-sage-500 mb-4">{DATA.title}</h1>
          <p className="text-gray-700 text-lg mb-6">{DATA.description}</p>
          <div className="bg-sage-50 p-4 rounded mb-4">
            <div className="font-semibold text-sage-700">Impact:</div>
            <div className="text-gray-600">{DATA.impact}</div>
          </div>
          <p className="text-gray-600">
            Marcus grew up in a sprawling rural region where internet was a luxury that few could afford. His childhood was marked by evenings doing homework in the dim light and long treks to the nearest town library just to access slow, unreliable computers. While studying technology at university—far from home—Marcus encountered endless opportunity online, and realized the stark digital divide he and his neighbors still faced back home. Determined to close this gap, Marcus returned to his roots after graduation, bringing with him not only his technical skills, but also a vision for connecting his entire community to the world.
          </p>
          <p className="text-gray-600 mt-2">
            The journey was anything but easy. Marcus faced skepticism from villagers—many had never used the internet, and most believed it was too expensive or complicated to ever be useful. There were a thousand technical challenges too: rough terrain for laying cable, frequent power outages, and near-zero infrastructure. Nevertheless, Marcus persisted. He spent months meeting with local leaders, holding community forums, and listening to people’s concerns. He partnered with international nonprofits and negotiated with hardware suppliers for affordable routers and satellite receivers. Marcus even trained a team of local youth, turning them into the first "digital ambassadors" for their villages, equipping them with much-needed skills and employment.
          </p>
          <p className="text-gray-600 mt-2">
            By creatively combining micro-loans, community fundraising, and support from government grants, Marcus and his growing team slowly began rolling out their affordable connectivity solution. They installed solar-powered relays and established internet hubs in schools, health clinics, and cooperative centers—places central to daily life. With each week, more households came online; soon, children could attend online classes, farmers checked weather patterns and market prices, and families communicated with loved ones far away for the first time. Stories spread: the first online small business in the area, a grandmother video-calling her daughter abroad, teenagers winning scholarships after online application prep provided by Marcus’s workshops.
          </p>
          <p className="text-gray-600 mt-2">
            Today, Marcus’s company has connected over a thousand rural households to affordable, high-speed internet—a transformation that is reshaping the community’s future. Beyond technology, Marcus has sparked a wave of new possibilities: online education, remote work, digital entrepreneurship, and grassroots social change. His greatest pride comes not from the technical achievements alone, but from seeing neighbors who once felt isolated now proudly teaching others, launching their own ventures, and building a brighter, more connected tomorrow. Marcus’s journey is a powerful testament to innovation guided by heart, and to one person’s ability to lift up entire communities through perseverance, empathy, and a vision for a better world.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default MarcusCaseStudy;
