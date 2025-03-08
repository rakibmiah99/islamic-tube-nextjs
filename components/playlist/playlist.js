import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import SmallThumbnail from "../small-thumbnail";

const data = {
  title: "নিচে ময়লার টাংকি উপরে রুম নামাজ পড়লে হবে কিনা। Shaikh Ahmadullah",
  slug: "nice-mylar-tangki-upre-rum-namaj-prle-hbe-kina-shaikh-ahmadullah",
  thumbnail: "https://i.ytimg.com/vi/oYs6iZEcPKk/mqdefault.jpg",
  watch_count: 0,
  published_at: "2021-12-26 02:46:52",
};

export default function VideoPlaylist() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="max-w-lg mb-4 bg-white text-black rounded-lg shadow border overflow-hidden">
      <div className="relative">
        <div className="p-4 border-b border-gray-100 border-opacity-90 ">
          <h2 className="text-lg font-bold">নামাজ পড়লে হবে কিনা?</h2>
          <p className="text-sm text-gray-400">নামাজ পড়লে হবে কিনা - 1 / 100</p>
        </div>
        <button
          onClick={toggleDropdown}
          className="absolute text-black text-lg top-4 right-2"
        >
          <MdOutlineArrowDropDown className={`inline-block text-4xl transition-all duration-300 ease-in-out ${isDropdownOpen ? '-rotate-180' : 'rotate-0'}`} />
        </button>
      </div>

      <div
        className={` overflow-y-auto transition-all duration-500 ease-in-out ${
          isDropdownOpen ? "max-h-[70vh]" : "max-h-0"
        }`}
      >
        <div className="p-4">
          {Array(10)
            .fill()
            .map((item, i) => (
              <SmallThumbnail
                key={i}
                data={data}
                className="basis-4/12 mb-3 block"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
