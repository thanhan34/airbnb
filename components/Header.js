import Image from "next/image";
import { GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon, SearchIcon } from '@heroicons/react/solid'
import { useState } from "react"
import { DateRange, DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";
import { useMediaQuery } from "@react-hook/media-query";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function Header({ placeholder }) {
    // STATE FOR REACT
    const [searchInput, setSearchInput] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date()) //need to fix to tomorrow's date
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const router = useRouter()

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuests,
            }
        })
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
        minDate: new Date()
    }

    //listen to small screen change for date picker
    const isSmallScreen = useMediaQuery("(max-width: 36rem)");

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 px-5 py-5 bg-white shadow-md md:px-10">
            {/* Left */}
            <div onClick={() => router.push("/")} className='relative flex items-center h-10 my-auto cursor-pointer'>
                <Image
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle */}
            <div className="flex items-center py-2 rounded-full md:border-2 md:shadow-sm">
                <input
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    className="flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none"
                    type="text"
                    placeholder={placeholder || "Start your search"}
                />
                <SearchIcon
                    className="hidden h-8 p-2 text-white bg-red-400 rounded-full cursor-pointer md:inline-flex md:mx-2"
                    onClick={search}
                />
            </div>

            {/* Right */}
            <div className="flex items-center justify-end space-x-4 text-gray-500">
                <p className="hidden cursor-pointer md:inline">Become a host</p>
                <GlobeAltIcon className="h-6" />
                <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>

            {/* Date picker range */}
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-5">
                    {isSmallScreen ? (
                        <DateRange
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={["#FD5B61"]}
                            onChange={handleSelect}
                        />
                    ) : (
                        <DateRangePicker
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={["#FD5B61"]}
                            onChange={handleSelect}
                        />
                    )}
                    <div className="flex items-center mb-4 border-b">
                        <h2 className="flex-grow text-2xl font-semibold">
                            Number of Guests
                        </h2>
                        <UsersIcon className="h-5" />
                        <input
                            value={numberOfGuests}
                            onChange={event => setNumberOfGuests(event.target.value)}
                            className="w-12 pl-2 text-lg text-red-400 outline-none"
                            type="number"
                            min={1}
                        />
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={search} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            )}

        </header>
    )
}

export default Header