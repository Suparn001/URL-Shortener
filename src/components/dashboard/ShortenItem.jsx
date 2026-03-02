import dayjs from "dayjs";
import React, { useState } from "react";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";
import api from "../../api/api";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
    const { token } = useStoreContext();
    const navigate = useNavigate();

    const [isCopied, setIsCopied] = useState(false);
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [analyticsData, setAnalyticsData] = useState([]);

    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
    );

    const fullShortUrl =
        import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + shortUrl;

    // ✅ Modern Clipboard API
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullShortUrl);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    // ✅ Analytics Handler
    const analyticsHandler = async (shortUrl) => {
        setAnalyticToggle(!analyticToggle);

        if (analyticToggle) return; // prevent refetch on close

        try {
            setLoader(true);

            const { data } = await api.get(
                `/api/urls/analytics/${shortUrl}?startDate=2024-12-01T00:00:00&endDate=2026-12-31T23:59:59`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            setAnalyticsData(data);
        } catch (error) {
            console.error(error);
            navigate("/error");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 sm:py-1 py-3 rounded-md transition-all duration-100">
            <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-5">
                <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto">
                    <div className="text-slate-900 flex items-center gap-2">
                        <Link
                            target="_blank"
                            className="text-[17px] font-semibold text-linkColor"
                            to={fullShortUrl}
                        >
                            {subDomain + "/s/" + shortUrl}
                        </Link>
                        <FaExternalLinkAlt className="text-linkColor" />
                    </div>

                    <h3 className="text-slate-700 text-[17px]">
                        {originalUrl}
                    </h3>

                    <div className="flex items-center gap-8 pt-6">
                        <div className="flex gap-1 items-center font-semibold text-green-800">
                            <MdOutlineAdsClick className="text-[22px]" />
                            <span>{clickCount}</span>
                            <span>
                                {clickCount === 1 ? "Click" : "Clicks"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                            <FaRegCalendarAlt />
                            <span>
                                {dayjs(createdDate).format("MMM DD, YYYY")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex sm:justify-end items-center gap-4">
                    <div
                        onClick={handleCopy}
                        className="flex cursor-pointer gap-1 items-center bg-btnColor py-2 font-semibold shadow-md px-6 rounded-md text-white"
                    >
                        <span>{isCopied ? "Copied" : "Copy"}</span>
                        {isCopied ? (
                            <LiaCheckSolid className="text-md" />
                        ) : (
                            <IoCopy />
                        )}
                    </div>

                    <div
                        onClick={() => analyticsHandler(shortUrl)}
                        className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md px-6 rounded-md text-white"
                    >
                        <span>Analytics</span>
                        <MdAnalytics />
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div
                className={`${analyticToggle ? "flex" : "hidden"
                    } max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-full overflow-hidden`}
            >
                {loader ? (
                    <div className="flex justify-center items-center w-full">
                        <div className="flex flex-col items-center gap-1">
                            <Hourglass
                                visible={true}
                                height="50"
                                width="50"
                                ariaLabel="hourglass-loading"
                                colors={["#306cce", "#72a1ed"]}
                            />
                            <p className="text-slate-700">Please Wait...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {analyticsData.length === 0 && (
                            <div className="absolute flex flex-col justify-center items-center w-full h-full">
                                <h1 className="text-xl font-bold">
                                    No Data For This Time Period
                                </h1>
                            </div>
                        )}
                        <Graph graphData={analyticsData} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ShortenItem;