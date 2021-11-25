import Image from "next/image"

function SmallCard({ img, location, distance }) {
    return (
        <div className="flex items-center m-2 mt-5 space-x-4 transition-transform duration-200 ease-out cursor-pointer rounded-xl hover:bg-gray-100 hover:scale-105">
            {/* Left */}
            <div className="relative w-16 h-16">
                <Image
                    className="rounded-lg"
                    src={img}
                    layout="fill"
                />
            </div>
            {/* Right */}
            <div>
                <h2>{location}</h2>
                <h3 className="text-gray-500">{distance}</h3>
            </div>
        </div>
    )
}

export default SmallCard