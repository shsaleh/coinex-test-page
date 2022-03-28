import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { LineChart } from "../components/chart/line";
import { MainHeader } from "../components/main/header";
import { Breads } from "../components/main/breads";
import { MainFooter } from "../components/main/footer";
import Link from "next/link";
const Home: NextPage = () => {



  return (
    <div className="flex justify-center mt-10">
      <Link href={'/info/bnb'}>
        <a className="text-blue-600"> صفحه معرفی عرض باینیس</a>
      </Link>
    </div>
  );
};

export default Home;
