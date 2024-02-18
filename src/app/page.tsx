"use client";
import { useUser } from "@clerk/nextjs";
import { Spin } from "antd";
import { Loader2 } from "lucide-react";
import "./globals.css";
import NavBar from "../components/nav";

export default function Home() {
  const { isLoaded } = useUser();
  document.title = `The Cude: Home`;

  if (!isLoaded) {
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <Spin
            indicator={
              <Loader2
                color="#000000"
                strokeWidth={2}
                style={{ fontSize: 50 }}
                className="animate-spin"
              />
            }
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="p-4 h-10">
        <div className="lg:w-2/3 mx-auto">
          <h1 className="flex flex-col text-center text-gray-900 font-bold text-5xl md:text-6xl xl:text-7xl">
            The Cube:
            <span className="text-primary">The News Word</span>
          </h1>
          <p className="mt-8 text-gray-700">
            Explorez un nouvel horizon d'informations grâce à notre tout nouveau
            site de news internationale! Notre plateforme vous permet de rester
            connecté avec les derniers événements du monde entier de manière
            simple et intuitive.
          </p>
          <p className="mt-2 text-gray-700">
            Grâce à notre vaste réseau de sources, comprenant plus de 37 226+
            médias de confiance à travers 196+ pays et disponibles dans 82+
            langues différentes, vous pouvez découvrir les actualités qui vous
            intéressent, où que vous soyez. Qu'il s'agisse de suivre les
            tendances actuelles, d'explorer des sujets spécifiques ou simplement
            de rester informé sur ce qui se passe dans le monde, notre site vous
            offre une fenêtre sur l'actualité mondiale.
          </p>
          <p className="mt-2 text-gray-700">
            Que vous soyez un passionné d'actualités ou que vous recherchiez des
            informations pour votre entreprise ou vos études, notre site de news
            internationale est l'outil idéal pour découvrir et comprendre le
            monde qui nous entoure, d'une manière accessible à tous.
          </p>
          <div className="mt-16 flex flex-wrap justify-end gap-y-4 gap-x-6 pb-4 ">
            <a
              href="/news"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-3xl before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white">
                Get started free
              </span>
            </a>
            <a
              href="#"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-3xl before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-primary">
                Learn more +
              </span>
            </a>
          </div>
          <div className="py-8 mt-16 border-y border-gray-300 bg-gray-100  flex justify-between flex-col md:flex-row gap-5 items-center px-5">
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700">
                37226+ Sources d'information
              </h6>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 ">
                196+ Pays
              </h6>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 ">
                82+ Langues
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
