"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";

import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import pLimit from "p-limit";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MeetingCard from "./MeetingCard";
import { useToast } from "./ui/use-toast";
import { formatIndianTime } from "@/lib/utils";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();
  const [recordingsLoading, setRecordingsLoading] = useState(
    type === "recordings"
  );

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      setRecordingsLoading(true);
      try {
        const limit = pLimit(3); // Limit to 5 concurrent requests (adjust as needed)
        const callData = await Promise.all(
          callRecordings?.map((meeting) =>
            limit(() => meeting.queryRecordings())
          ) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (err) {
        toast({
          title: "Failed to load recordings, Please reload the page",
        });
      } finally {
        setRecordingsLoading(false);
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings, toast]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading || recordingsLoading)
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      {calls && calls.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {calls.map((meeting: Call | CallRecording) => (
            <MeetingCard
              key={(meeting as Call).id || (meeting as CallRecording).filename}
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom?.description ||
                (meeting as CallRecording)?.filename?.substring(0, 20) ||
                "Personal Meeting"
              }
              date={formatIndianTime(
                (meeting as Call).state?.startsAt ||
                  (meeting as CallRecording)?.start_time
              )}
              isPreviousMeeting={type === "ended"}
              link={
                type === "recordings"
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
              buttonIcon1={
                type === "recordings" ? "/icons/play.svg" : undefined
              }
              buttonText={type === "recordings" ? "Play" : "Start"}
              handleClick={
                type === "recordings"
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex h-[60vh] w-full items-center justify-center">
          <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
        </div>
      )}
    </>
  );
};

export default CallList;
