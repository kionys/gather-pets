import Image from "next/image";

export const Avatar = ({ isActive = false }: { isActive: boolean }) => {
  return (
    <div className={`shrink-0 w-20 h-20 scroll-snap-align-start`}>
      <div className={`relative w-full h-full rounded-full ${isActive ? "border-2 border-pink-500 p-0.5" : ""}`}>
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/SP1BIx2hzJaqDXYmZovXufHZO5H2%2F7db27399-5548-4b59-b406-10d3aeed164b?alt=media&token=898d2fb2-6938-45e4-a8e5-5c169dfe64c7"
            }
            alt="image"
            fill
            loading="lazy"
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,"
          />
        </div>
      </div>
    </div>
  );
};
