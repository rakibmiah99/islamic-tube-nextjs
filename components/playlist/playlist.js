import SmallThumbnail from "../small-thumbnail";

const data = {
  title: "নিচে ময়লার টাংকি উপরে রুম নামাজ পড়লে হবে কিনা। Shaikh Ahmadullah",
  slug: "nice-mylar-tangki-upre-rum-namaj-prle-hbe-kina-shaikh-ahmadullah",
  thumbnail: "https://i.ytimg.com/vi/oYs6iZEcPKk/mqdefault.jpg",
  watch_count: 0,
  published_at: "2021-12-26 02:46:52",
};

export default function VideoPlaylist() {
  return (
    <div className="max-w-lg mb-4 bg-white text-black rounded-lg shadow border overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">নামাজ পড়লে হবে কিনা?</h2>
        <p className="text-sm text-gray-400">
          নামাজ পড়লে হবে কিনা - 1 / 100
        </p>
      </div>
      <div className="relative">
        {/*  <Image
          src={selected.thumbnail}
          alt={selected.title}
          className="w-full h-40 object-cover"
        /> */}
        <button className="absolute inset-0 flex items-center justify-center text-white text-4xl">
          {/* <FaPlay /> */}
        </button>
      </div>
      <div className="p-4 h-4/6 overflow-y-auto">
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
  );
}
