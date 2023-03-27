import { Inter } from "next/font/google";
import { trpc } from "../util/trpc";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log(trpc.status.useQuery().data);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}
