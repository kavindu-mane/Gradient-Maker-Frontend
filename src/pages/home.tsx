import { RandomGradients } from "@/components";

export const Home = () => {
  return (
    <main className="flex w-full flex-col items-center gap-y-5">
      <section className="w-full max-w-7xl px-3">
        <h1 className="mb-6 text-xl font-medium md:text-2xl xl:text-3xl">
          Random Gradient Colors
        </h1>
        {/* random gradients */}
        <RandomGradients />
      </section>
    </main>
  );
};
