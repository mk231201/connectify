import MeetingTypeList from "@/components/MeetingTypeList";
import { convertToDateFormat, formatIndianTimeOnly } from "@/lib/utils";

const Home = () => {
  const now = new Date();

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full px-5 py-8 flex-col justify-between lg:p-11">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {formatIndianTimeOnly(now)}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {convertToDateFormat(now)}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
